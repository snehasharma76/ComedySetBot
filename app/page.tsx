'use client'
import React, { useState } from 'react';
import { Mic, MessageCircle, Star, ArrowRight, Send } from 'lucide-react';

const ComedyClubPage = () => {
  const [messages, setMessages] = useState([]);
  const [isPerforming, setIsPerforming] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCommand = async (command) => {
    let botResponse;
    switch(command) {
      case 'startset':
        if (isPerforming) {
          botResponse = "There's already someone bombing on stage. Wait your turn!";
        } else {
          setIsPerforming(true);
          botResponse = "🎤 *Welcome to the stage!* Let's see what you've got... but remember, I don't hold back!";
        }
        break;
      case 'endset':
        if (!isPerforming) {
          botResponse = "You can't end a set you never started!";
        } else {
          setIsPerforming(false);
          botResponse = "Well, well... that was certainly... something. Don't quit your day job! 😈";
        }
        break;
      default:
        botResponse = "Invalid command";
    }

    setMessages(prev => [...prev, 
      { type: 'user', content: `/${command}` },
      { type: 'bot', content: botResponse }
    ]);
  };

  const handleJoke = async (joke) => {
    if (!isPerforming) {
      setMessages(prev => [...prev, 
        { type: 'user', content: joke },
        { type: 'bot', content: "Hold up! You need to start your set first with /startset!" }
      ]);
      return;
    }

    // Here you would typically call your AI endpoint
    const mockBotResponse = "That's what you call comedy? My neural networks are cringing! 🤖";
    
    setMessages(prev => [...prev, 
      { type: 'user', content: joke },
      { type: 'bot', content: mockBotResponse }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (inputValue.startsWith('/')) {
      const command = inputValue.slice(1);
      handleCommand(command);
    } else {
      handleJoke(inputValue);
    }
    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-gray-900 to-black text-white relative">
      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 space-y-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-75 animate-pulse"/>
              <Mic className="w-12 h-12 relative" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-violet-400 text-transparent bg-clip-text">
            Savage Comedy Club
          </h1>
          <p className="text-lg text-purple-200">Where AI meets comedy, and no ego survives 💀</p>
        </div>

        {/* Commands Section */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4 mb-8">
          {[
            { cmd: 'startset', desc: 'Take the stage', icon: <Mic className="w-6 h-6" /> },
            { cmd: 'joke', desc: 'Drop your punchline', icon: <MessageCircle className="w-6 h-6" /> },
            { cmd: 'endset', desc: 'Exit stage left', icon: <ArrowRight className="w-6 h-6" /> }
          ].map((item) => (
            <button
              key={item.cmd}
              onClick={() => handleCommand(item.cmd)}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-black rounded-lg p-4 flex flex-col items-center space-y-2 hover:transform hover:scale-[1.02] transition">
                {item.icon}
                <p className="text-base font-mono text-violet-400">/{item.cmd}</p>
                <span className="text-sm text-gray-400">{item.desc}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Performance Area */}
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg blur opacity-75"></div>
          <div className="relative bg-black/80 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-semibold">Stage</h2>
              {isPerforming && (
                <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">LIVE</span>
              )}
            </div>
            
            {/* Chat/Performance Display */}
            <div className="bg-black/50 rounded-lg mb-4 h-96 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.type === 'user' 
                        ? 'bg-violet-600/30 text-white' 
                        : 'bg-gray-800/50 text-gray-200'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isPerforming ? "Tell your joke..." : "Use /startset to begin..."}
                className="w-full bg-gray-900/50 rounded-lg py-3 px-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                disabled={!isPerforming && !inputValue.startsWith('/')}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <Send className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComedyClubPage;