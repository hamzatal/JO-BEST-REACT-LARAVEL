import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LegalPopup = ({ type, isDarkMode, onClose }) => {
  const content = {
    privacyPolicy: {
      title: 'Privacy Policy',
      text: `
        At Jo Best, we are committed to protecting your privacy. Here's how we handle your personal information:

        1. Information Collection
        We collect essential information directly provided by you during account creation, interactions, or services use.

        2. Data Usage
        Your data is used solely to provide, improve, and personalize our services. We do not sell or share personal information with third parties without consent.

        3. Data Protection
        We implement robust security measures to protect your personal information from unauthorized access, modification, or disclosure.

        4. User Rights
        You have the right to:
        • Access your personal information
        • Request correction of inaccurate data
        • Request deletion of your data
        • Opt-out of certain data processing

        5. Cookies and Tracking
        We use cookies and similar technologies to enhance user experience and analyze site traffic. You can manage cookie preferences in your browser settings.

        Last Updated: December 2024
      `
    },
    termsOfService: {
      title: 'Terms of Service',
      text: `
        Welcome to Jo Best. By using our services, you agree to the following terms:

        1. Acceptance of Terms
        By accessing or using our platform, you acknowledge and agree to be bound by these Terms of Service. If you do not agree, please do not use our services.

        2. User Accounts
        • You are responsible for maintaining the confidentiality of your account
        • You agree to accept responsibility for all activities under your account
        • You must provide accurate and current information

        3. Intellectual Property
        • All content on this platform is the property of Jo Best
        • Content is protected by copyright and other intellectual property laws
        • You may not reproduce, distribute, or create derivative works without explicit permission

        4. Limitation of Liability
        Jo Best is not liable for:
        • Direct or indirect damages
        • Loss of profits
        • Interruption of service
        • Any damages arising from use of our platform

        5. Service Modifications
        We reserve the right to:
        • Modify or discontinue services at any time
        • Change pricing, features, or availability
        • Terminate accounts for violation of terms

        6. Governing Law
        These terms are governed by the laws of our jurisdiction.

        Last Updated: December 2024
      `
    }
  };

  const { title, text } = content[type];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative w-full max-w-2xl mx-auto rounded-lg shadow-2xl ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
              : 'bg-gradient-to-br from-white to-gray-100'
          }`}
        >
          {/* Header with Title and Close Button */}
          <div className={`flex justify-between items-center p-5 border-b ${
            isDarkMode 
              ? 'border-gray-700 text-white' 
              : 'border-gray-200 text-gray-900'
          }`}>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <button 
              onClick={onClose} 
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-white' 
                  : 'hover:bg-gray-200 text-black'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content Container */}
          <div className="p-6  max-h-[500px] overflow-y-auto">
            <div className={`text-base ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <pre className="whitespace-pre-wrap font-sans leading-relaxed">
                {text}
              </pre>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Footer = ({ isDarkMode }) => {
  const [activePopup, setActivePopup] = useState(null);

  return (
    <>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`py-6 mt-12 text-center ${
          isDarkMode
            ? 'bg-gray-800 text-gray-300'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        <p>© 2024 Jo Best. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <button 
            onClick={() => setActivePopup('privacyPolicy')} 
            className="hover:text-blue-500"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => setActivePopup('termsOfService')} 
            className="hover:text-blue-500"
          >
            Terms of Service
          </button>
          <a href="about-us" className="hover:text-blue-500">Contact</a>
        </div>
      </motion.footer>

      {activePopup && (
        <LegalPopup 
          type={activePopup} 
          isDarkMode={isDarkMode} 
          onClose={() => setActivePopup(null)} 
        />
      )}
    </>
  );
};

export default Footer;