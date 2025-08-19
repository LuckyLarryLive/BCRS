import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserIcon } from "lucide-react";

interface TutorialOverlayProps {
  onClose: () => void;
}

export default function TutorialOverlay({ onClose }: TutorialOverlayProps) {
  const handleStartTutorial = () => {
    // In a real implementation, this would integrate with react-joyride
    // For now, we'll just close the overlay
    onClose();
  };

  return (
    <div id="tutorial-overlay" className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <Card className="bg-white p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-monopoly-green rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon className="w-12 h-12 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-monopoly-dark mb-4">Welcome to Brick City!</h2>
          <p className="text-gray-600 mb-6">
            I'm your personal real estate advisor. Let me show you around the most exciting virtual property market!
          </p>
          
          <div className="flex gap-3">
            <Button 
              id="skip-tutorial"
              onClick={onClose}
              variant="outline" 
              className="flex-1"
            >
              Skip Tour
            </Button>
            <Button 
              id="start-tutorial"
              onClick={handleStartTutorial}
              className="flex-1 bg-monopoly-green hover:bg-green-700 text-white"
            >
              Start Tour
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
