import { useState } from "react";
import Joyride, { Step, CallBackProps, EVENTS, ACTIONS, STATUS } from "react-joyride";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserIcon } from "lucide-react";

interface TutorialOverlayProps {
  onClose: () => void;
}

const tutorialSteps: Step[] = [
  {
    target: "#player-profile-card",
    content: "This is your player profile! Here you can see your current $BRIKS balance, net worth, and player rank. Keep an eye on these stats as you build your empire!",
    placement: "right",
  },
  {
    target: "#briks-balance",
    content: "These are your $BRIKS tokens - the currency of Brick City! Use them to purchase properties and grow your portfolio.",
    placement: "bottom",
  },
  {
    target: "#nav-link-mls",
    content: "The MLS (Multiple Listing Service) is where you'll find all available properties for purchase. Think of it as your property marketplace!",
    placement: "right",
  },
  {
    target: "#get-briks-button",
    content: "Running low on $BRIKS? Click here to purchase more tokens and fuel your real estate investments!",
    placement: "bottom",
  },
];

export default function TutorialOverlay({ onClose }: TutorialOverlayProps) {
  const [showJoyride, setShowJoyride] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleStartTutorial = () => {
    setShowWelcome(false);
    setShowJoyride(true);
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action, type } = data;

    if (type === EVENTS.TOUR_END || status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      // Mark tutorial as completed
      const userId = localStorage.getItem('currentUserId');
      if (userId) {
        fetch('/api/auth/complete-tutorial', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        });
      }
      
      setShowJoyride(false);
      onClose();
    }
  };

  const handleSkipTutorial = () => {
    const userId = localStorage.getItem('currentUserId');
    if (userId) {
      fetch('/api/auth/complete-tutorial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
    }
    onClose();
  };

  return (
    <>
      {showWelcome && (
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
                  onClick={handleSkipTutorial}
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
      )}
      
      {showJoyride && (
        <Joyride
          steps={tutorialSteps}
          run={showJoyride}
          continuous={true}
          showSkipButton={true}
          showProgress={true}
          callback={handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: '#0B6623',
              textColor: '#333',
              backgroundColor: '#F7F5E6',
              arrowColor: '#F7F5E6',
            },
            tooltip: {
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
            },
            tooltipTitle: {
              fontFamily: 'Playfair Display, serif',
              fontSize: '18px',
              fontWeight: 'bold',
            },
          }}
          locale={{
            back: 'Previous',
            close: 'Close',
            last: 'Finish Tour',
            next: 'Next',
            skip: 'Skip Tour',
          }}
        />
      )}
    </>
  );
}
