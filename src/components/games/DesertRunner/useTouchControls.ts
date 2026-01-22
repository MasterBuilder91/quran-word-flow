import { useEffect, useRef, useCallback } from 'react';

interface TouchControlsOptions {
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  onTap: () => void;
  enabled: boolean;
  threshold?: number;
}

export const useTouchControls = ({
  onSwipeUp,
  onSwipeDown,
  onTap,
  enabled,
  threshold = 50,
}: TouchControlsOptions) => {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enabled) return;
    
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  }, [enabled]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!enabled || !touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaX = touch.clientX - touchStartRef.current.x;
    const duration = Date.now() - touchStartRef.current.time;

    // Check if it's a swipe (fast movement in one direction)
    if (duration < 300) {
      // Vertical swipe takes priority
      if (Math.abs(deltaY) > threshold && Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY < 0) {
          onSwipeUp();
        } else {
          onSwipeDown();
        }
      } 
      // Quick tap (small movement, short duration)
      else if (Math.abs(deltaY) < 20 && Math.abs(deltaX) < 20 && duration < 150) {
        // Only trigger tap on right side of screen (for jump)
        const screenWidth = window.innerWidth;
        if (touch.clientX > screenWidth / 2) {
          onTap();
        }
      }
    }

    touchStartRef.current = null;
  }, [enabled, onSwipeUp, onSwipeDown, onTap, threshold]);

  useEffect(() => {
    if (!enabled) return;

    const gameContainer = document.querySelector('[data-game-container]');
    if (!gameContainer) return;

    gameContainer.addEventListener('touchstart', handleTouchStart as EventListener, { passive: true });
    gameContainer.addEventListener('touchend', handleTouchEnd as EventListener, { passive: true });

    return () => {
      gameContainer.removeEventListener('touchstart', handleTouchStart as EventListener);
      gameContainer.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [enabled, handleTouchStart, handleTouchEnd]);
};
