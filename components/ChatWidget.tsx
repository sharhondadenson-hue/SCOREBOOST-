
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { generateResponse } from '../services/geminiService';

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      content: 'Hello! I am Aria, your Elite Credit Consultant. Our process is designed for precision: we perform a forensic audit of your credit reports to identify inaccuracies, then execute aggressive, multi-level challenges with all three major bureaus to remove negative accounts like collections, charge-offs, and late payments. Most clients begin seeing tangible deletions and score movement within 35 to 45 days. Shall we start with a quick evaluation of your current credit situation?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start recognition:", err);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    try {
      const history = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));
      history.push({ role: 'user', parts: [{ text: input }] });

      const response = await generateResponse(history);
      const text = response.text || "I'm sorry, I'm having trouble processing that right now. How else can I help with your credit?";
      
      const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: text };
      setMessages(prev => [...prev, assistantMessage]);

      if (response.functionCalls && response.functionCalls.length > 0) {
        const fc = response.functionCalls[0];
        if (fc.name === 'scheduleAppointment') {
          setMessages(prev => [...prev, {
            id: 'fc-sys',
            role: 'system',
            content: `📅 Appointment Request: Success. Our team will call you shortly.`
          }]);
        }
      }

    } catch (err) {
      setMessages(prev => [...prev, { id: 'err', role: 'assistant', content: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
      <div className="bg-slate-900 p-4 flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">A</div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">Aria | ScoreBoost Advisor</h3>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Expert Consultant</span>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none shadow-md' 
                : m.role === 'system'
                ? 'bg-amber-50 text-amber-800 border border-amber-200 text-xs text-center mx-auto rounded-lg px-6'
                : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-tl-none'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-300"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2 items-center">
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? "Listening..." : "Type your question..."}
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${isListening ? 'ring-2 ring-red-500/20 border-red-200' : ''}`}
            />
            <button
              onClick={toggleListening}
              className={`absolute right-2 p-1.5 rounded-lg transition-all ${
                isListening 
                  ? 'text-red-600 bg-red-50 animate-pulse' 
                  : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
              }`}
              title="Voice Input"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={isLoading || (!input.trim() && !isListening)}
            className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-md disabled:opacity-30 active:scale-95 shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between items-center mt-2 px-1">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Secured Consultant Chat</p>
          {isListening && <span className="text-[10px] text-red-500 font-bold animate-pulse">REC ON</span>}
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
