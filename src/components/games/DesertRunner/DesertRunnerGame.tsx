import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ParallaxBackground } from './ParallaxBackground';
import { Player } from './Player';
import { WordCollectible } from './WordCollectible';
import { ObstacleSprite } from './ObstacleSprite';
import { GameHUD } from './GameHUD';
import { GameOverScreen } from './GameOverScreen';
import { StartScreen } from './StartScreen';
import { MobileControls } from './MobileControls';
import { AudioControls } from './AudioControls';
import { useTouchControls } from './useTouchControls';
import { useGameWords } from './useGameWords';
import { useGameAudio } from './useGameAudio';
import { 
  GameState, 
  PlayerState, 
  CollectibleWord, 
  Obstacle,
  LANE_POSITIONS,
  GAME_CONFIG,
} from './types';

const generateId = () => Math.random().toString(36).substring(2, 9);

const getStoredHighScore = (): number => {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('desertRunnerHighScore') || '0', 10);
};

const setStoredHighScore = (score: number) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('desertRunnerHighScore', score.toString());
  }
};

export const DesertRunnerGame = () => {
  const { getRandomWord, getWordOptions } = useGameWords();
  const { playSfx, startMusic, stopMusic, toggleMusic, toggleSfx, musicEnabled, sfxEnabled, initAudio } = useGameAudio();
  const gameLoopRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(0);
  const prevStreakRef = useRef<number>(0);

  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    distance: 0,
    lives: 3,
    streak: 0,
    correctWords: 0,
    totalWords: 0,
    speed: GAME_CONFIG.initialSpeed,
    initialSpeed: GAME_CONFIG.initialSpeed,
    isPlaying: false,
    isPaused: false,
    isGameOver: false,
    currentQuestion: null,
    highScore: getStoredHighScore(),
  });

  const [player, setPlayer] = useState<PlayerState>({
    y: 50,
    isJumping: false,
    isSliding: false,
    lane: 1,
    hasShield: false,
    hasMagnet: false,
  });

  const [collectibles, setCollectibles] = useState<CollectibleWord[]>([]);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  // Mobile control handlers
  const handleMoveUp = useCallback(() => {
    if (!gameState.isPlaying || gameState.isPaused) return;
    setPlayer(prev => ({
      ...prev,
      lane: Math.max(0, prev.lane - 1) as 0 | 1 | 2,
    }));
  }, [gameState.isPlaying, gameState.isPaused]);

  const handleMoveDown = useCallback(() => {
    if (!gameState.isPlaying || gameState.isPaused) return;
    setPlayer(prev => ({
      ...prev,
      lane: Math.min(2, prev.lane + 1) as 0 | 1 | 2,
    }));
  }, [gameState.isPlaying, gameState.isPaused]);

  const handleJump = useCallback(() => {
    if (!gameState.isPlaying || gameState.isPaused || player.isJumping) return;
    setPlayer(prev => ({ ...prev, isJumping: true }));
    playSfx('jump');
    setTimeout(() => {
      setPlayer(prev => ({ ...prev, isJumping: false }));
    }, GAME_CONFIG.jumpDuration);
  }, [gameState.isPlaying, gameState.isPaused, player.isJumping, playSfx]);

  // Touch controls hook
  useTouchControls({
    onSwipeUp: handleMoveUp,
    onSwipeDown: handleMoveDown,
    onTap: handleJump,
    enabled: gameState.isPlaying && !gameState.isPaused,
  });

  // Generate new question
  const generateNewQuestion = useCallback(() => {
    const word = getRandomWord();
    const options = getWordOptions(word, 4);
    
    // Create collectibles for the options
    const newCollectibles: CollectibleWord[] = options.map((opt, index) => ({
      ...opt,
      x: 100 + (index * 15),
      y: LANE_POSITIONS[index % 3 as 0 | 1 | 2],
      isCorrect: opt.id === word.id,
      collected: false,
    }));

    setCollectibles(prev => [...prev, ...newCollectibles]);
    setGameState(prev => ({ ...prev, currentQuestion: word }));
  }, [getRandomWord, getWordOptions]);

  // Handle word collection
  const handleCollectWord = useCallback((word: CollectibleWord) => {
    if (!gameState.isPlaying || gameState.isPaused) return;

    const isCorrect = word.english === gameState.currentQuestion?.english;

    setCollectibles(prev => prev.map(c => 
      c.id === word.id ? { ...c, collected: true } : c
    ));

    if (isCorrect) {
      // Correct answer
      const streakBonus = Math.floor(gameState.streak * GAME_CONFIG.streakMultiplier);
      const points = GAME_CONFIG.pointsPerCorrect + (streakBonus * 10);
      
      // Play collect sound, and streak sound for milestones
      playSfx('collect');
      if ((gameState.streak + 1) % 5 === 0) {
        setTimeout(() => playSfx('streak'), 150);
      }
      
      setGameState(prev => ({
        ...prev,
        score: prev.score + points,
        streak: prev.streak + 1,
        correctWords: prev.correctWords + 1,
        totalWords: prev.totalWords + 1,
      }));

      // Generate next question after a short delay
      setTimeout(generateNewQuestion, 500);
    } else {
      // Wrong answer
      playSfx('wrong');
      setGameState(prev => ({
        ...prev,
        streak: 0,
        lives: prev.lives - 1,
        totalWords: prev.totalWords + 1,
        isGameOver: prev.lives <= 1,
      }));
    }
  }, [gameState.isPlaying, gameState.isPaused, gameState.currentQuestion, gameState.streak, generateNewQuestion, playSfx]);

  // Game loop
  const gameLoop = useCallback((timestamp: number) => {
    if (!gameState.isPlaying || gameState.isPaused || gameState.isGameOver) {
      return;
    }

    const deltaTime = timestamp - lastFrameRef.current;
    lastFrameRef.current = timestamp;

    // Update distance and score
    setGameState(prev => ({
      ...prev,
      distance: prev.distance + (prev.speed * deltaTime * 0.01),
      score: prev.score + Math.floor(prev.speed * deltaTime * 0.001),
      speed: Math.min(GAME_CONFIG.maxSpeed, prev.speed + (GAME_CONFIG.speedIncrement * deltaTime * 0.0001)),
    }));

    // Move collectibles
    setCollectibles(prev => prev
      .map(c => ({ ...c, x: c.x - (gameState.speed * deltaTime * 0.02) }))
      .filter(c => c.x > -10 && !c.collected)
    );

    // Move obstacles
    setObstacles(prev => prev
      .map(o => ({ ...o, x: o.x - (gameState.speed * deltaTime * 0.02) }))
      .filter(o => o.x > -10)
    );

    // Spawn new collectibles if needed
    if (collectibles.length < 4 && Math.random() < GAME_CONFIG.wordSpawnRate) {
      generateNewQuestion();
    }

    // Spawn obstacles
    if (Math.random() < GAME_CONFIG.obstacleSpawnRate) {
      const newObstacle: Obstacle = {
        id: generateId(),
        x: 105,
        y: LANE_POSITIONS[Math.floor(Math.random() * 3) as 0 | 1 | 2],
        type: ['rock', 'cactus', 'pit'][Math.floor(Math.random() * 3)] as 'rock' | 'cactus' | 'pit',
        width: 40,
        height: 40,
      };
      setObstacles(prev => [...prev, newObstacle]);
    }

    // Check collision with obstacles
    obstacles.forEach(obstacle => {
      const playerLaneY = LANE_POSITIONS[player.lane];
      if (
        obstacle.x < 20 && 
        obstacle.x > 10 && 
        Math.abs(obstacle.y - playerLaneY) < 15 &&
        !player.isJumping &&
        !player.hasShield
      ) {
        setGameState(prev => ({
          ...prev,
          lives: prev.lives - 1,
          streak: 0,
          isGameOver: prev.lives <= 1,
        }));
        setObstacles(prev => prev.filter(o => o.id !== obstacle.id));
      }
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, player, collectibles, obstacles, generateNewQuestion]);

  // Start/stop game loop
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isPaused && !gameState.isGameOver) {
      lastFrameRef.current = performance.now();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.isPlaying, gameState.isPaused, gameState.isGameOver, gameLoop]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameState.isPlaying || gameState.isPaused) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          handleMoveUp();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          handleMoveDown();
          break;
        case ' ':
          e.preventDefault();
          handleJump();
          break;
        case 'Escape':
          setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.isPlaying, gameState.isPaused, handleMoveUp, handleMoveDown, handleJump]);

  // Start game with custom speed
  const startGame = useCallback((initialSpeed: number) => {
    initAudio(); // Initialize audio context on user interaction
    setGameState({
      score: 0,
      distance: 0,
      lives: 3,
      streak: 0,
      correctWords: 0,
      totalWords: 0,
      speed: initialSpeed,
      initialSpeed: initialSpeed,
      isPlaying: true,
      isPaused: false,
      isGameOver: false,
      currentQuestion: null,
      highScore: getStoredHighScore(),
    });
    setPlayer({
      y: 50,
      isJumping: false,
      isSliding: false,
      lane: 1,
      hasShield: false,
      hasMagnet: false,
    });
    setCollectibles([]);
    setObstacles([]);
    generateNewQuestion();
    startMusic();
  }, [generateNewQuestion, startMusic, initAudio]);

  // Handle game over
  useEffect(() => {
    if (gameState.isGameOver) {
      stopMusic();
      playSfx('gameOver');
      if (gameState.score > gameState.highScore) {
        setStoredHighScore(gameState.score);
        setGameState(prev => ({ ...prev, highScore: gameState.score }));
      }
    }
  }, [gameState.isGameOver, gameState.score, gameState.highScore, stopMusic, playSfx]);

  // Go home
  const handleHome = useCallback(() => {
    stopMusic();
    setGameState(prev => ({ ...prev, isPlaying: false, isGameOver: false }));
  }, [stopMusic]);

  return (
    <div 
      data-game-container
      className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-stone-900 shadow-2xl touch-none"
    >
      {/* Background */}
      <ParallaxBackground 
        speed={gameState.speed} 
        isPaused={!gameState.isPlaying || gameState.isPaused} 
      />

      {/* Game entities */}
      {gameState.isPlaying && !gameState.isGameOver && (
        <>
          <Player player={player} isRunning={!gameState.isPaused} />
          
          <AnimatePresence>
            {collectibles.map(word => (
              <WordCollectible
                key={word.id}
                word={word}
                targetWord={gameState.currentQuestion?.english || ''}
                onCollect={handleCollectWord}
              />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {obstacles.map(obstacle => (
              <ObstacleSprite key={obstacle.id} obstacle={obstacle} />
            ))}
          </AnimatePresence>

          <GameHUD 
            gameState={gameState} 
            currentQuestion={gameState.currentQuestion} 
          />

          {/* Mobile controls */}
          <MobileControls
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onJump={handleJump}
            isJumping={player.isJumping}
          />

          {/* Audio controls */}
          <AudioControls
            musicEnabled={musicEnabled}
            sfxEnabled={sfxEnabled}
            onToggleMusic={toggleMusic}
            onToggleSfx={toggleSfx}
          />
        </>
      )}

      {/* Start screen */}
      {!gameState.isPlaying && !gameState.isGameOver && (
        <StartScreen 
          highScore={gameState.highScore} 
          onStart={startGame} 
        />
      )}

      {/* Game over screen */}
      {gameState.isGameOver && (
        <GameOverScreen
          gameState={gameState}
          onRestart={() => startGame(gameState.initialSpeed)}
          onHome={handleHome}
        />
      )}

      {/* Pause overlay */}
      {gameState.isPaused && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Paused</h2>
            <p className="text-white/60 text-sm sm:text-base">Press ESC or tap to continue</p>
          </div>
        </div>
      )}
    </div>
  );
};
