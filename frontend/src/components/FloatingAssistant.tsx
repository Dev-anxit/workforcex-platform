import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, BrainCircuit, Activity, ChevronRight, CheckCircle2 } from 'lucide-react';
const SUGGESTED_PROMPTS = [
  { text: "What skills should I learn next?", icon: <BrainCircuit className="w-3.5 h-3.5" /> },
  { text: "How to become an AI Engineer?", icon: <Activity className="w-3.5 h-3.5" /> },
  { text: "Analyze my skill gaps", icon: <Sparkles className="w-3.5 h-3.5" /> }
];
export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState<{role: string, content: string, actions: string[]}[]>([
    { 
      role: 'assistant', 
      content: 'Hi there! I am your AI Career Guide. Want to explore new roles or discuss your skill gaps?',
      actions: []
    }
  ]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping, isOpen]);
  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const newHistory = [...chatHistory, { role: 'user', content: text, actions: [] }];
    setChatHistory(newHistory);
    setMessage('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChatHistory([
        ...newHistory,
        { 
          role: 'assistant', 
          content: 'Based on your recent activity, I recommend focusing on **Cloud Architecture** before moving to Data Science. Would you like me to adjust your roadmap?',
          actions: ['Adjust Roadmap', 'View Cloud Courses']
        }
      ]);
    }, 1800);
  };
  const handleAction = (action: string) => {
    handleSend(`Yes, let's ${action.toLowerCase()}`);
  }
  return (
    <>
      {}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_40px_rgba(79,70,229,0.8)] hover:-translate-y-1 hover:scale-110 transition-all duration-300 z-50 group flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Bot className="w-6 h-6 group-hover:animate-bounce" />
        <span className="absolute -top-2 -right-2 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-slate-900 shadow-[0_0_10px_rgba(59,130,246,1)]"></span>
        </span>
      </button>
      {}
      <div 
        className={`fixed bottom-8 right-8 w-[400px] bg-slate-900/80 backdrop-blur-3xl border border-slate-700/50 shadow-[0_10px_50px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden z-50 transition-all duration-500 origin-bottom-right flex flex-col ${isOpen ? 'scale-100 opacity-100 h-[600px]' : 'scale-0 opacity-0 h-[600px] pointer-events-none'}`}
      >
        {}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]"></div>
        </div>
        {}
        <div className="p-5 border-b border-slate-700/50 flex justify-between items-center relative z-10 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            </div>
            <div>
              <h3 className="text-white font-extrabold text-sm tracking-wide">AI Mentor</h3>
              <p className="text-xs text-blue-400 font-medium tracking-wider uppercase flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" /> Processing Live
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white hover:bg-slate-800 hover:rotate-90 transition-all duration-300 p-2 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>
        {}
        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-6 custom-scrollbar relative z-10 scroll-smooth">
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {}
              <div className="flex-shrink-0">
                {msg.role === 'user' ? (
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shadow-sm">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.15)]">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                )}
              </div>
              {}
              <div className={`flex flex-col gap-2 max-w-[75%]`}>
                <div className={`p-4 text-sm leading-relaxed shadow-md ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-slate-800/80 backdrop-blur-md text-slate-200 rounded-2xl rounded-tl-sm border border-slate-700/50'
                }`}>
                  {}
                  {msg.content.split('**').map((part, index) => 
                    index % 2 === 1 ? <strong key={index} className="text-white font-bold">{part}</strong> : part
                  )}
                </div>
                {}
                {msg.role === 'assistant' && msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {msg.actions.map((action: string, aIdx: number) => (
                      <button 
                        key={aIdx} 
                        onClick={() => handleAction(action)}
                        className="text-xs bg-slate-800/60 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 border border-slate-700 hover:border-blue-500/50 px-3 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 shadow-sm"
                      >
                        <CheckCircle2 className="w-3 h-3" /> {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {}
          {isTyping && (
            <div className="flex gap-3 animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.15)]">
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              </div>
              <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl rounded-tl-sm border border-slate-700/50 flex items-center gap-1.5 shadow-md h-[44px]">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {}
        {chatHistory.length === 1 && !isTyping && (
          <div className="px-5 pb-3 flex flex-col gap-2 relative z-10 animate-in slide-in-from-bottom-4 fade-in duration-500 delay-150 fill-mode-both">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1 ml-1">Suggested for you</p>
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button 
                key={idx}
                onClick={() => handleSend(prompt.text)}
                className="text-left text-sm text-slate-300 bg-slate-800/40 hover:bg-slate-800 hover:shadow-lg border border-slate-700/50 hover:border-slate-600 px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group backdrop-blur-sm"
              >
                <span className="flex items-center gap-3">
                  <span className="p-1.5 bg-slate-700/50 rounded-lg text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors">
                    {prompt.icon}
                  </span>
                  {prompt.text}
                </span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-slate-500" />
              </button>
            ))}
          </div>
        )}
        {}
        <div className="p-4 border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-md relative z-10">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(message); }} 
            className="relative flex items-center"
          >
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything about your career..."
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-2xl py-3.5 pl-5 pr-14 focus:outline-none focus:border-blue-500 focus:bg-slate-800 text-sm placeholder:text-slate-500 transition-all shadow-inner"
            />
            <button 
              type="submit" 
              disabled={!message.trim() || isTyping}
              className="absolute right-2 p-2 bg-blue-600 text-white hover:bg-blue-500 rounded-xl transition-all disabled:opacity-0 disabled:scale-75 shadow-lg shadow-blue-600/20 scale-100"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
