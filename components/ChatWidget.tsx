import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, MessageCircle, Loader2, Package, Sparkles, Mic, MicOff } from 'lucide-react';
import { GeminiAssistant } from '../services/geminiService';
import { ChatMessage, Product } from '../types';
import ProductCard from './ProductCard';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gemini] = useState(() => new GeminiAssistant());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice Input State
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
        // Initial greeting
        setMessages([
            {
                id: 'welcome',
                role: 'model',
                text: "Hello! I'm the EMRN AI Assistant. I can help you find emergency supplies, track orders, or help you integrate this chat with your Odoo system. How can I help?",
                timestamp: new Date()
            }
        ]);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      setInput(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    // Stop listening if we send
    if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let foundProducts: Product[] = [];
      const productHandler = (products: Product[]) => {
          foundProducts = products;
      };

      const responseText = await gemini.sendMessage(userMsg.text, productHandler);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
        relatedProducts: foundProducts.length > 0 ? foundProducts : undefined
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm sorry, I'm having trouble connecting to the network right now.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'bg-red-600 rotate-90' : 'bg-blue-700'
        } text-white`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-40 flex flex-col transition-all duration-300 origin-bottom-right border border-gray-100 ${
          isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ height: '600px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">EMRN Support</h3>
              <div className="flex items-center gap-1.5">
                 <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                 <p className="text-blue-100 text-xs">Online | Powered by Gemini</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                }`}
              >
                 {msg.role === 'model' && <Sparkles className="w-3 h-3 text-blue-400 mb-1 inline-block mr-1" />}
                 {msg.text}
              </div>
              
              {/* Product Suggestions in Chat */}
              {msg.relatedProducts && msg.relatedProducts.length > 0 && (
                <div className="mt-3 w-full pl-2">
                    <p className="text-xs text-gray-500 mb-2 font-medium">Found Items:</p>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -ml-2 px-2">
                        {msg.relatedProducts.map(product => (
                            <div key={product.id} className="min-w-[200px]">
                                <ProductCard product={product} compact={true} />
                            </div>
                        ))}
                    </div>
                </div>
              )}
              
              <span className="text-[10px] text-gray-400 mt-1 px-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start">
               <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                 <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                 <span className="text-xs text-gray-500">Thinking...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 rounded-b-2xl">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Ask about products or orders..."}
              className={`flex-1 bg-gray-100 text-gray-800 placeholder-gray-400 border-0 rounded-full px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm ${isListening ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
              disabled={isLoading}
            />
            
            <button
              type="button"
              onClick={handleVoiceInput}
              disabled={isLoading}
              className={`p-3 rounded-full transition-all duration-200 flex-shrink-0 shadow-sm ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
              }`}
              title="Speak"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-2">
             <p className="text-[10px] text-gray-400">AI can make mistakes. Verify important info.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;