"use client"

import { useState, useEffect } from 'react';
import { Zap, ChevronDown, MessageSquare, Shield, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-white font-bold text-xl">SavageBot</div>
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <button 
                    onClick={() => scrollToSection('home')} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('features')} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('cta')} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Get Started
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - First Page */}
      <div id="home" className="h-screen snap-start relative bg-black flex flex-col items-center justify-center text-white px-4">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text">
            The Most Savage
            <br />
            Discord Bot Ever
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12">
            Brutally honest. Hilariously savage. No filter.
          </p>
          <a 
            href="https://discord.com/oauth2/authorize?client_id=1316295727374139392&permissions=199744&integration_type=0&scope=applications.commands+bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
          >
            <Zap className="w-5 h-5 mr-2" />
            Add to Discord
          </a>
        </div>
        
        <button 
          onClick={() => scrollToSection('features')}
          className="absolute bottom-8 animate-bounce cursor-pointer text-gray-400 hover:text-white transition-colors"
          aria-label="Scroll to features"
        >
          <ChevronDown className="w-10 h-10" />
        </button>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black -z-10" />
      </div>

      {/* Features Section - Second Page */}
      <div id="features" className="h-screen snap-start bg-black flex items-center justify-center px-4">
        <div className="max-w-7xl w-full">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Savage Responses",
                description: "Brutally honest and hilariously savage replies to keep your server entertained."
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "AI-Powered",
                description: "Powered by advanced AI to deliver the most creative and witty comebacks."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Server Safe",
                description: "Keeps it savage but clean. No inappropriate content, just pure savage wit."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`p-8 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-500 transform hover:-translate-y-1 hover:bg-gray-900/50 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-gradient-to-r from-white to-gray-500 p-3 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => scrollToSection('cta')}
            className="mt-16 block mx-auto animate-bounce cursor-pointer text-gray-400 hover:text-white transition-colors"
            aria-label="Scroll to call to action"
          >
            <ChevronDown className="w-10 h-10" />
          </button>
        </div>
      </div>

      {/* CTA Section - Third Page */}
      <div id="cta" className="h-screen snap-start bg-black flex items-center justify-center px-4 relative overflow-hidden">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text">
              Ready to Unleash the Savagery?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join servers experiencing the most brutally honest and hilariously savage bot on Discord.
              Your server will never be the same again.
            </p>
            <div className="space-y-4">
              <a 
                href="https://discord.com/oauth2/authorize?client_id=1316295727374139392&permissions=199744&integration_type=0&scope=applications.commands+bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
              >
                <Zap className="w-6 h-6 mr-2" />
                Add Bot to Your Server
              </a>
            </div>
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black" />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
