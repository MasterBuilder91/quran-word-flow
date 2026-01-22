// Desert Runner Game Types

export interface GameWord {
  id: string;
  arabic: string;
  english: string;
  transliteration: string;
}

export interface CollectibleWord extends GameWord {
  x: number;
  y: number;
  isCorrect: boolean;
  collected: boolean;
}

export interface Obstacle {
  id: string;
  x: number;
  y: number;
  type: 'rock' | 'cactus' | 'pit';
  width: number;
  height: number;
}

export interface PowerUp {
  id: string;
  x: number;
  y: number;
  type: 'shield' | 'magnet' | 'slowmo' | 'doublePoints';
  collected: boolean;
}

export interface PlayerState {
  y: number;
  isJumping: boolean;
  isSliding: boolean;
  lane: 0 | 1 | 2;
  hasShield: boolean;
  hasMagnet: boolean;
}

export interface GameState {
  score: number;
  distance: number;
  lives: number;
  streak: number;
  correctWords: number;
  totalWords: number;
  speed: number;
  initialSpeed: number;
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  currentQuestion: GameWord | null;
  highScore: number;
}

export interface ParallaxLayer {
  id: string;
  speed: number;
  elements: React.ReactNode;
}

export const LANE_POSITIONS = {
  0: 25,  // Top lane (percentage from top)
  1: 50,  // Middle lane
  2: 75,  // Bottom lane
};

export const GAME_CONFIG = {
  initialSpeed: 5,
  maxSpeed: 15,
  speedIncrement: 0.5,
  playerWidth: 60,
  playerHeight: 80,
  collectibleSize: 50,
  obstacleSpawnRate: 0.02,
  wordSpawnRate: 0.015,
  powerUpSpawnRate: 0.005,
  jumpDuration: 600,
  slideDuration: 500,
  shieldDuration: 5000,
  magnetDuration: 8000,
  pointsPerCorrect: 100,
  pointsPerDistance: 1,
  streakMultiplier: 0.5,
};
