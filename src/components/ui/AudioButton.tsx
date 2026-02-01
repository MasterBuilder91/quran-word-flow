import { Volume2, Loader2, VolumeX } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useElevenLabsTTS } from '@/hooks/useElevenLabsTTS';
import { cn } from '@/lib/utils';

interface AudioButtonProps extends Omit<ButtonProps, 'onClick'> {
  text: string;
  showLabel?: boolean;
  label?: string;
  iconOnly?: boolean;
  autoPlay?: boolean;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
}

export const AudioButton = ({ 
  text, 
  showLabel = false, 
  label = "Listen",
  iconOnly = false,
  autoPlay = false,
  onPlayStart,
  onPlayEnd,
  className,
  variant = "outline",
  size = "sm",
  ...props 
}: AudioButtonProps) => {
  const { speak, stop, isPlaying, isLoading, currentText, usingFallback } = useElevenLabsTTS();
  
  const isCurrentlyPlaying = isPlaying && currentText === text;
  
  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isCurrentlyPlaying) {
      stop();
      onPlayEnd?.();
      return;
    }
    
    try {
      onPlayStart?.();
      await speak(text);
      onPlayEnd?.();
    } catch (error) {
      console.error('Failed to play pronunciation:', error);
      onPlayEnd?.();
    }
  };

  if (iconOnly) {
    return (
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={cn(
          "p-2 rounded-full transition-all hover:bg-primary/10",
          isCurrentlyPlaying && "bg-primary/20 text-primary",
          className
        )}
        title={usingFallback ? "Playing with browser voice" : "Listen to pronunciation"}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        ) : isCurrentlyPlaying ? (
          <VolumeX className="w-5 h-5 text-primary animate-pulse" />
        ) : (
          <Volume2 className={cn(
            "w-5 h-5 transition-colors",
            usingFallback ? "text-yellow-500" : "text-muted-foreground hover:text-primary"
          )} />
        )}
      </button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "gap-2",
        isCurrentlyPlaying && "border-primary text-primary",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isCurrentlyPlaying ? (
        <VolumeX className="w-4 h-4 animate-pulse" />
      ) : (
        <Volume2 className={cn(
          "w-4 h-4",
          usingFallback && "text-yellow-500"
        )} />
      )}
      {showLabel && <span>{isCurrentlyPlaying ? "Stop" : label}</span>}
    </Button>
  );
};

// Inline audio icon for use within text/cards
export const InlineAudioIcon = ({ 
  text, 
  className 
}: { 
  text: string; 
  className?: string;
}) => {
  const { speak, stop, isPlaying, isLoading, currentText } = useElevenLabsTTS();
  const isCurrentlyPlaying = isPlaying && currentText === text;

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentlyPlaying) {
      stop();
    } else {
      try {
        await speak(text);
      } catch (error) {
        console.error('Audio playback failed:', error);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "inline-flex items-center justify-center w-6 h-6 rounded-full transition-all",
        "hover:bg-primary/20 active:scale-95",
        isCurrentlyPlaying && "bg-primary/20",
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      ) : (
        <Volume2 className={cn(
          "w-4 h-4",
          isCurrentlyPlaying ? "text-primary animate-pulse" : "text-muted-foreground"
        )} />
      )}
    </button>
  );
};
