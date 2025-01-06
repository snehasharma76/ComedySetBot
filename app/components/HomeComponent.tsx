'use client'
import React, { useState } from 'react';
import { Mic, MessageCircle, Star, ArrowRight } from 'lucide-react';

const ComedyClubPage = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [isPerforming, setIsPerforming] = useState(false);
  const [showJokeOptions, setShowJokeOptions] = useState(false);
  
  const [messages, setMessages] = useState([
    { type: 'bot', content: "👋 Welcome to Savage Bot - Your AI Comedy Roast Master!" },
    { type: 'guide', content: "Click /startset to begin your comedy journey!" }
  ]);

  const jokes = [
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why don't scientists trust atoms? Because they make up everything!"
  ];

  const addMessage = (messages) => {
    setMessages(prev => [...prev, ...messages]);
  };

  const handleCommand = async (command) => {
    switch(command) {
      case 'startset':
        setIsPerforming(true);
        addMessage([
          { type: 'user', content: "/startset" },
          { type: 'bot', content: "🎤 *Welcome to the stage!* Let's see what you've got... but remember, I don't hold back!" },
          { type: 'guide', content: "Select one of these jokes to tell:" }
        ]);
        setShowJokeOptions(true);
        setCurrentStep('joke');
        break;

      case 'endset':
        setIsPerforming(false);
        addMessage([
          { type: 'user', content: "/endset" },
          { type: 'bot', content: "Well, that was... something. Your comedy career is like a JSON file - full of nested objects but no real purpose! 😈" },
          { type: 'guide', content: "Want more savage roasts? Add me to your Discord server!" }
        ]);
        setCurrentStep('end');
        break;
    }
  };

  const handleJokeSelect = (joke) => {
    addMessage([
      { type: 'user', content: joke },
      { type: 'bot', content: "That joke was so bad, even the crickets left the chat! Is this your first time attempting comedy, or do you practice being this unfunny? 🎭" },
      { type: 'guide', content: "Click /endset to finish your performance!" }
    ]);
    setShowJokeOptions(false);
    setCurrentStep('end');
  };

  const addBotToDiscord = () => {
    window.open('https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands', '_blank');
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
            Savage Comedy Bot
          </h1>
          <p className="text-lg text-purple-200">Experience the roast before adding to Discord!</p>
        </div>

        {/* Commands Section */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4 mb-8">
          {[
            { cmd: 'startset', desc: 'Take the stage', icon: <Mic className="w-6 h-6" />, disabled: currentStep !== 'welcome' },
            { cmd: 'joke', desc: 'Tell your joke', icon: <MessageCircle className="w-6 h-6" />, disabled: true },
            { cmd: 'endset', desc: 'End your set', icon: <ArrowRight className="w-6 h-6" />, disabled: currentStep !== 'end' }
          ].map((item) => (
            <button
              key={item.cmd}
              onClick={() => handleCommand(item.cmd)}
              disabled={item.disabled}
              className={`group relative ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-semibold">Stage</h2>
                {isPerforming && (
                  <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">LIVE</span>
                )}
              </div>
              
              <button
                onClick={addBotToDiscord}
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium flex items-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
                Add to Discord
              </button>
            </div>
            
            {/* Chat/Performance Display */}
            <div className="bg-black/50 rounded-lg mb-4 h-96 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.type === 'user' 
                        ? 'bg-violet-600/30 text-white' 
                        : msg.type === 'guide'
                        ? 'bg-indigo-600/30 text-indigo-200'
                        : 'bg-gray-800/50 text-gray-200'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Joke Options */}
            {showJokeOptions && (
              <div className="grid gap-2">
                {jokes.map((joke, index) => (
                  <button
                    key={index}
                    onClick={() => handleJokeSelect(joke)}
                    className="w-full text-left p-3 bg-violet-600/20 hover:bg-violet-600/30 rounded-lg transition-colors"
                  >
                    {joke}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComedyClubPage;