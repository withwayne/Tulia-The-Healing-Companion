import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatBot = ({ isOpen, onToggle }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello, beautiful soul. I'm Imani, your gentle companion here at Tulia. I'm here to listen, support, and walk alongside you on your healing journey. How are you feeling today🌸?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Placeholder for n8n webhook - replace with actual endpoint later
      const webhookUrl = 'https://your-n8n-webhook-url.com/webhook/chat';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Simulate typing delay for better UX
        setTimeout(() => {
          setIsTyping(false);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response || "I'm here for you. Could you tell me more about how you're feeling?",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        }, 1500);
      } else {
        // Fallback response if webhook fails
        setTimeout(() => {
          setIsTyping(false);
        const fallbackMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm here for you. Could you tell me more about how you're feeling? (Note: Chat connection will be available soon)",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, fallbackMessage]);
        }, 1500);
      }
    } catch (error) {
      // Fallback response for network errors
      setTimeout(() => {
        setIsTyping(false);
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm here for you. Could you tell me more about how you're feeling? (Note: Chat connection will be available soon)",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full shadow-floating hover:shadow-lg transform hover:scale-110 transition-all duration-300 group ${
          isOpen ? 'rotate-45' : 'animate-float'
        }`}
      >
        {/* Pulse effect when not open */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
        )}
        
        <svg
          className="w-8 h-8 mx-auto relative z-10 group-hover:scale-110 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          )}
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 md:w-96 h-96 bg-card border border-border rounded-2xl shadow-floating flex flex-col overflow-hidden animate-scale-in backdrop-blur-sm">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 flex items-center space-x-3 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse" />
            
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center relative z-10 animate-pulse">
              <span className="text-sm font-semibold">I</span>
            </div>
            <div className="relative z-10">
              <h3 className="font-semibold">Imani</h3>
              <p className="text-xs opacity-90 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Your healing companion
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in-slow`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground rounded-br-md shadow-md'
                      : 'bg-muted text-foreground rounded-bl-md shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 opacity-70`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {(isLoading || isTyping) && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-2 rounded-2xl rounded-bl-md animate-pulse">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-background/50 backdrop-blur-sm">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                className="flex-1 px-4 py-2 bg-input border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 hover:border-primary/30"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/80 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <svg
                  className="w-4 h-4 transform hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
