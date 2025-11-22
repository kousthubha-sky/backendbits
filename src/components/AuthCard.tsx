import React from 'react';
import { Shield, CreditCard } from 'lucide-react';

interface AuthCardProps {
  title?: string;
  description?: string;
  category?: string;
  onCheckDocs?: () => void;
  onOpen?: () => void;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title = "Auth Template 01",
  description = "Backend starter that marries Better Auth with MongoDB so you can launch secure apps without hand-rol.. Read our Cookie Policy.",
  category = "auth",
  onCheckDocs,
  onOpen,
}) => {
  const getCategoryIcon = () => {
    switch (category) {
      case 'auth':
        return <Shield className="w-6 h-6 text-gray-600" />;
      case 'payment':
        return <CreditCard className="w-6 h-6 text-gray-600" />;
      default:
        return <Shield className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="font-sans flex items-center justify-center p-10 bg-gray-50">
      {/* Outer Container */}
      <div className="w-[340px] bg-white rounded-2xl border border-gray-100 p-3 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">

        {/* Top Icon */}
        <div className="px-1 py-3 flex justify-center">
          {getCategoryIcon()}
        </div>

        {/* Inner Card */}
        <div className="border border-gray-100 rounded-xl p-4 bg-white shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-2">
            {title}
          </h3>

          <p className="text-[13px] leading-relaxed text-gray-500 mb-5">
            {description}
          </p>

          {/* Button Group */}
          <div className="flex gap-3">
            <button
              onClick={onCheckDocs}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2.5 rounded-lg transition-colors duration-200"
            >
              Check Docs
            </button>
            <button
              onClick={onOpen}
              className="flex-1 bg-black hover:bg-gray-800 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors duration-200"
            >
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;