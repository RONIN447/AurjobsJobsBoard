
import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Brain, Cpu, Zap, Code, Check, ThumbsUp } from 'lucide-react';

const AIMatchingLoader = ({ isOpen, onClose, score, isLoading }) => {
  const [animationStage, setAnimationStage] = useState(0);
  
  useEffect(() => {
    if (isLoading) {
      // Reset state when loading begins
      setAnimationStage(0);

      const stages = [1, 2, 3, 4];
      let currentIndex = 0;
      let timeoutIds = [];

      // Create animation sequence with timeouts
      const runAnimationSequence = () => {
        if (currentIndex < stages.length) {
          setAnimationStage(stages[currentIndex]);
          currentIndex++;

          // Schedule next stage
          const nextTimeout = setTimeout(runAnimationSequence, 1200);
          timeoutIds.push(nextTimeout);
        } else {
          // Show final result stage (5 for success, 6 for failure) based on score
          const finalStage = score >= 60  ? 5 : 6;
          setAnimationStage(finalStage);
        }
      };

      // Start animation sequence
      const initialTimeout = setTimeout(runAnimationSequence, 300);
      timeoutIds.push(initialTimeout);

      return () => {
        // Clean up all timeouts on unmount
        timeoutIds.forEach(id => clearTimeout(id));
      };
    } else if (score !== null) {
      // Force show result when not loading and score is available
      setAnimationStage(score >= 60 ? 5 : 6);
    }
  }, [isLoading, score]);

  if (!isOpen) return null;

  const getStageContent = () => {
    switch (animationStage) {
      case 1:
        return (
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <Cpu className="w-16 h-16 text-blue-500" />
              </div>
              <div className="absolute top-0 right-0">
                <div className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-blue-400 opacity-75"></div>
                <div className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></div>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Processing Profile Data
            </h2>
            <p className="text-gray-600">
              Extracting skills and experience information...
            </p>
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-indigo-100 rounded-full"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <Brain className="w-16 h-16 text-indigo-500" />
              </div>
              <div className="absolute inset-0 border-4 border-indigo-200 border-dashed rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Matching with Job Requirements
            </h2>
            <div className="flex justify-center space-x-2 mb-4">
              <div className="h-2 w-6 bg-indigo-300 rounded-full animate-pulse"></div>
              <div className="h-2 w-6 bg-indigo-400 rounded-full animate-pulse"></div>
              <div className="h-2 w-6 bg-indigo-500 rounded-full animate-pulse"></div>
              <div className="h-2 w-6 bg-indigo-600 rounded-full animate-pulse"></div>
            </div>
            <p className="text-gray-600">
              Comparing qualifications with job requirements...
            </p>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-purple-100 rounded-full"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <Code className="w-16 h-16 text-purple-500" />
              </div>
              <span className="absolute top-1 right-2 h-3 w-3 bg-purple-400 rounded-full animate-ping"></span>
              <span className="absolute top-2 left-2 h-3 w-3 bg-purple-400 rounded-full animate-ping"></span>
              <span className="absolute bottom-2 right-2 h-3 w-3 bg-purple-400 rounded-full animate-ping"></span>
              <span className="absolute bottom-1 left-2 h-3 w-3 bg-purple-400 rounded-full animate-ping"></span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Analyzing Match Potential
            </h2>
            <p className="text-gray-600">
              Calculating compatibility scores...
            </p>
          </div>
        );
      case 4:
        return (
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-teal-100 rounded-full"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <Zap className="w-16 h-16 text-teal-500" />
              </div>
              <div className="absolute top-0 left-1/2 w-1 h-8 bg-teal-400 rounded animate-bounce"></div>
              <div className="absolute bottom-0 left-1/2 w-1 h-8 bg-teal-400 rounded animate-bounce"></div>
              <div className="absolute top-1/2 left-0 w-8 h-1 bg-teal-400 rounded animate-bounce"></div>
              <div className="absolute top-1/2 right-0 w-8 h-1 bg-teal-400 rounded animate-bounce"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Finalizing Assessment
            </h2>
            <p className="text-gray-600">
              Preparing your personalized match report...
            </p>
          </div>
        );
      case 5: // Success case
        return (
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-green-100 rounded-full"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-green-400 opacity-75"></div>
                <div className="relative rounded-full h-6 w-6 bg-green-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-2 border-green-300 rounded-full animate-[ping_1.5s_ease-in-out_infinite]"></div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Perfect Match!
              <br />
               Application Submitted Successfully!
            </h2>
            
            <div className="mb-6 px-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Match Score</span>
                <span className="font-semibold text-green-600">{score}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-1000 bg-green-500"
                  style={{ width: `${score}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>0%</span>
                <span className="bg-yellow-100 px-2 py-1 rounded text-yellow-700">70% Required</span>
                <span>100%</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 px-4">
              Congratulations! Your skills and experience align well with this position. Your application has been submitted successfully.
            </p>
            
            <div
              onClick={onClose}
              className="inline-flex cursor-pointer items-center px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow-sm hover:bg-green-600 transition-colors"
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
             <span>Continue</span>
            </div>
          </div>
        );
      case 6: // Failure case
        return (
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-red-100 rounded-full"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <AlertCircle className="w-16 h-16 text-red-500" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Not Quite a Match
            </h2>

            <div className="mb-6 px-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Match Score</span>
                <span className="font-semibold text-red-600">{score}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-1000 bg-red-500"
                  style={{ width: `${score}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>0%</span>
                <span className="bg-yellow-100 px-2 py-1 rounded text-yellow-700">70% Required</span>
                <span>100%</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6 px-4">
              This position requires a stronger match with your profile. Consider enhancing your skills or exploring roles that better align with your expertise.
            </p>

            <button
              onClick={onClose}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Close
            </button>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-sm"></div>
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-100 relative transform transition-all duration-300 opacity-100 scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {getStageContent()}
      </div>
    </div>
  );
};

export default AIMatchingLoader;