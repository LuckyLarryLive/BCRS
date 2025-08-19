import { BuildingIcon } from "lucide-react";
import GetBriksModal from "./get-briks-modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Header() {
  const [showBriksModal, setShowBriksModal] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BuildingIcon className="w-8 h-8 text-monopoly-green mr-3" />
              <h1 className="font-display text-2xl font-bold text-monopoly-green">Brick City</h1>
            </div>
            <Button 
              id="get-briks-button"
              onClick={() => setShowBriksModal(true)}
              className="bg-monopoly-gold hover:bg-yellow-500 text-monopoly-dark font-bold px-6 py-2 rounded-lg transition-colors duration-200 flex items-center"
            >
              <span className="mr-2">💰</span>
              Get $BRIKS
            </Button>
          </div>
        </div>
      </header>

      <GetBriksModal 
        isOpen={showBriksModal}
        onClose={() => setShowBriksModal(false)}
      />
    </>
  );
}
