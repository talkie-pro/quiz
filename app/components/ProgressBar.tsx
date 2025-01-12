import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, onBack }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Voltar"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex-1">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#6E56CF] to-[#9B7EFF] transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <span className="text-sm text-gray-600 min-w-[4rem] text-right">
            {currentStep}/{totalSteps}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar; 