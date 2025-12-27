import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Download, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareProgressCardProps {
  wordsLearned: number;
  streak: number;
  modulesCompleted: number;
}

export const ShareProgressCard = ({ wordsLearned, streak, modulesCompleted }: ShareProgressCardProps) => {
  const [generating, setGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const percentage = Math.round((wordsLearned / 125) * 100);

  const generateImage = async () => {
    setGenerating(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Set canvas size for social media (1080x1080)
    canvas.width = 1080;
    canvas.height = 1080;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
    gradient.addColorStop(0, '#0c1220');
    gradient.addColorStop(1, '#1a1f35');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // Add decorative pattern
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.arc(540, 540, 50 + i * 30, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Title
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 36px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('🌙 Quranic Arabic Lab', 540, 120);

    // Main stat
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 180px system-ui';
    ctx.fillText(`${percentage}%`, 540, 480);

    // Subtitle
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '32px system-ui';
    ctx.fillText("of the Qur'an's vocabulary mastered!", 540, 560);

    // Stats row
    ctx.font = 'bold 48px system-ui';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`${wordsLearned}`, 270, 720);
    ctx.fillText(`${streak}`, 540, 720);
    ctx.fillText(`${modulesCompleted}`, 810, 720);

    ctx.font = '24px system-ui';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Words Learned', 270, 770);
    ctx.fillText('Day Streak', 540, 770);
    ctx.fillText('Modules', 810, 770);

    // Footer
    ctx.fillStyle = '#64748b';
    ctx.font = '24px system-ui';
    ctx.fillText('Start your journey at quranicarabiclab.com', 540, 980);

    setGenerating(false);
    return canvas.toDataURL('image/png');
  };

  const handleShare = async () => {
    const imageUrl = await generateImage();
    if (!imageUrl) return;

    // Convert to blob for sharing
    const blob = await (await fetch(imageUrl)).blob();
    const file = new File([blob], 'quranic-progress.png', { type: 'image/png' });

    if (navigator.share && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'My Quranic Arabic Progress',
          text: `I've mastered ${percentage}% of the Qur'an's vocabulary! Join me at Quranic Arabic Lab 🌙`,
        });
        toast.success('Shared successfully!');
      } catch (err) {
        // User cancelled or error
        handleDownload(imageUrl);
      }
    } else {
      handleDownload(imageUrl);
    }
  };

  const handleDownload = (imageUrl?: string) => {
    if (!imageUrl) {
      generateImage().then((url) => {
        if (url) downloadImage(url);
      });
    } else {
      downloadImage(imageUrl);
    }
  };

  const downloadImage = (url: string) => {
    const link = document.createElement('a');
    link.download = 'quranic-progress.png';
    link.href = url;
    link.click();
    toast.success('Image downloaded! Share it on social media 🎉');
  };

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="p-6 rounded-2xl bg-gradient-to-br from-cosmic to-cosmic-light border border-border overflow-hidden relative">
        {/* Preview card */}
        <div className="text-center space-y-4">
          <p className="text-gold text-sm">🌙 Quranic Arabic Lab</p>
          <p className="text-5xl font-bold text-primary">{percentage}%</p>
          <p className="text-muted-foreground">of the Qur'an's vocabulary mastered!</p>
          
          <div className="flex justify-center gap-8 pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gold">{wordsLearned}</p>
              <p className="text-xs text-muted-foreground">Words</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gold">{streak}</p>
              <p className="text-xs text-muted-foreground">Streak</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gold">{modulesCompleted}</p>
              <p className="text-xs text-muted-foreground">Modules</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button onClick={handleShare} className="flex-1" disabled={generating}>
          <Share2 className="w-4 h-4 mr-2" />
          {generating ? 'Generating...' : 'Share Progress'}
        </Button>
        <Button variant="outline" onClick={() => handleDownload()} disabled={generating}>
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
