import React, { useState } from 'react';
import { Key, Copy, Check, Shield, Server } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [generatedKey, setGeneratedKey] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    // Generate a random-looking mock key
    const prefix = "emrn_live_";
    const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setGeneratedKey(`${prefix}${random.toUpperCase()}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <Server className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Odoo Integration Settings
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Generate an API key to connect the EMRN AI Assistant directly to your Odoo backend. This will allow the AI to access real-time inventory and customer data.
                  </p>
                </div>

                {!generatedKey ? (
                   <div className="mt-6 flex justify-center">
                     <button
                        onClick={handleGenerate}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm font-medium"
                     >
                        <Key className="w-4 h-4" />
                        Generate New API Key
                     </button>
                   </div>
                ) : (
                    <div className="mt-6">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Your API Secret</label>
                        <div className="flex items-center gap-2">
                            <code className="flex-1 block w-full p-3 bg-gray-50 border border-gray-200 rounded-md text-xs font-mono text-blue-800 break-all">
                                {generatedKey}
                            </code>
                            <button 
                                onClick={handleCopy}
                                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-600"
                                title="Copy to clipboard"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-3 flex gap-3">
                            <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                            <p className="text-xs text-yellow-800">
                                <strong>Security Warning:</strong> This key is only shown once. Copy it immediately and paste it into your Odoo Settings &gt; Technical &gt; System Parameters.
                            </p>
                        </div>
                    </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
                type="button" 
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;