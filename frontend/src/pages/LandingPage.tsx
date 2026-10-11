import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Activity, Target, Zap, ShieldCheck, Globe, Users, User } from 'lucide-react';
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 font-sans overflow-x-hidden">
      {}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/landing-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.8
        }}
      />
      <div className="fixed inset-0 bg-slate-950/80 z-0 pointer-events-none backdrop-blur-sm" />
      <div className="fixed top-0 left-1/4 w-full h-full pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-50">
        <div className="absolute -right-1/4 -top-1/4 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute left-1/4 bottom-0 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px]"></div>
      </div>
      {}
      <nav className="relative z-50 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            WorkforceX
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to="/login"
            className="text-sm font-bold text-slate-300 hover:text-white transition-colors px-4 py-2"
          >
            Sign In
          </Link>
          <Link 
            to="/login?mode=signup"
            className="text-sm font-bold bg-white text-slate-900 hover:bg-slate-200 px-6 py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Sign Up
          </Link>
        </div>
      </nav>
      {}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            AI-Powered Workforce Transformation
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
            Future-Proof Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Enterprise Talent
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            WorkforceX combines predictive AI, skill adjacency mapping, and strategic simulation to transition your workforce into the age of Automation and AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link 
              to="/login?role=admin"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center group"
            >
              <ShieldCheck className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" /> 
              Admin Portal Demo
            </Link>
            <Link 
              to="/login?role=employee"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center group backdrop-blur-sm"
            >
              <User className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" /> 
              Employee Portal Demo
            </Link>
          </div>
        </div>
        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-300 fill-mode-both">
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Market Intelligence</h3>
            <p className="text-slate-400 leading-relaxed">Real-time analysis of declining and emerging tech roles to inform your strategic workforce planning.</p>
          </div>
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px]" />
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">Strategic Simulator</h3>
            <p className="text-slate-400 leading-relaxed relative z-10">Compare Build, Buy, Redeploy, and Automate strategies with AI-driven cost and time forecasting.</p>
          </div>
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 transition-colors">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Career Twin</h3>
            <p className="text-slate-400 leading-relaxed">Give every employee a personalized, AI-driven digital twin that maps their skills to future-proof careers.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
