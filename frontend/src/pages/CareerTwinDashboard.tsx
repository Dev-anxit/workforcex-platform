import { useState, useEffect } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts';
import { Sparkles, BrainCircuit, Target, Zap, Activity, ShieldAlert, CheckCircle2, UserCog } from 'lucide-react';
const SKILL_DATA = [
  { skill: 'Python', current: 85, required: 95 },
  { skill: 'Machine Learning', current: 60, required: 90 },
  { skill: 'Data Viz', current: 75, required: 80 },
  { skill: 'Cloud Architecture', current: 40, required: 85 },
  { skill: 'LLMs', current: 30, required: 85 },
];
const GAP_DATA = [
  { name: 'LLM Fine-tuning', gap: 55, impact: 'High' },
  { name: 'Cloud Deployments', gap: 45, impact: 'Medium' },
  { name: 'Advanced ML', gap: 30, impact: 'High' },
  { name: 'System Design', gap: 20, impact: 'Medium' },
];
export default function CareerTwinDashboard() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [twinProgress, setTwinProgress] = useState(0);
  useEffect(() => {
    let interval: any;
    if (isSimulating && twinProgress < 100) {
      interval = setInterval(() => {
        setTwinProgress(p => Math.min(p + 5, 100));
      }, 100);
    } else if (twinProgress >= 100) {
      setIsSimulating(false);
    }
    return () => clearInterval(interval);
  }, [isSimulating, twinProgress]);
  const triggerSimulation = () => {
    setTwinProgress(0);
    setIsSimulating(true);
  };
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/40 p-8 rounded-3xl border border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4" /> AI Powered
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-400 mb-3 tracking-tight">
            Your Digital Career Twin
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Meet your AI counterpart. Visualize your skills, identify future gaps, and simulate your career trajectory in real-time.
          </p>
        </div>
        <button 
          onClick={triggerSimulation}
          disabled={isSimulating}
          className="relative z-10 group overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative flex items-center gap-2">
            {isSimulating ? <Activity className="w-5 h-5 animate-pulse" /> : <BrainCircuit className="w-5 h-5" />}
            {isSimulating ? 'Syncing Twin...' : 'Sync AI Twin'}
          </span>
          {isSimulating && (
            <div className="absolute bottom-0 left-0 h-1 bg-white transition-all duration-100 ease-linear" style={{ width: `${twinProgress}%` }} />
          )}
        </button>
      </header>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {}
        <div className="xl:col-span-1 glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-900/50 flex flex-col group hover:border-slate-700 transition-colors">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <UserCog className="w-5 h-5 text-purple-400" /> Current vs Future Self
          </h3>
          <p className="text-sm text-slate-400 mb-8">Your current skill proficiencies overlaid against the requirements for a Senior AI Engineer.</p>
          <div className="flex-1 min-h-[350px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
                <PolarGrid stroke="rgba(51, 65, 85, 0.5)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Current Skills" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="Target (AI Engineer)" dataKey="required" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeDasharray="3 3" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(51, 65, 85, 0.5)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center text-sm"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span><span className="text-slate-300">Current You</span></div>
            <div className="flex items-center text-sm"><span className="w-3 h-3 bg-purple-500 rounded-full mr-2 border border-purple-400 border-dashed bg-opacity-30"></span><span className="text-slate-300">Target Twin</span></div>
          </div>
        </div>
        {}
        <div className="xl:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-900/50 flex flex-col group hover:border-slate-700 transition-colors relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-rose-400" /> Animated Skill Gap Analysis
            </h3>
            <p className="text-sm text-slate-400 mb-8">Priority areas requiring immediate upskilling based on your Career Twin's trajectory.</p>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={GAP_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.2)" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(51, 65, 85, 0.1)' }}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(51, 65, 85, 0.5)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="gap" radius={[6, 6, 0, 0]} animationDuration={2000}>
                    {GAP_DATA.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.impact === 'High' ? 'url(#colorHigh)' : 'url(#colorMedium)'} 
                        className="hover:brightness-125 transition-all duration-300 cursor-pointer"
                      />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#fb923c" stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {/* Actionable Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Urgent Gap Identified', desc: 'Your LLM architecture skills are 55% behind the target role. Recommend enrolling in the Generative AI bootcamp.', icon: ShieldAlert, color: 'rose' },
          { title: 'Hidden Strength', desc: 'Your Python skills exceed expectations (85%). Consider mentoring junior peers to boost leadership score.', icon: Zap, color: 'amber' },
          { title: 'Next Milestone', desc: 'Complete the AWS Cloud Certification. It bridges your 45% gap in Cloud Deployments.', icon: CheckCircle2, color: 'emerald' }
        ].map((item, i) => (
          <div key={i} className={`p-6 rounded-3xl border border-${item.color}-500/20 bg-slate-900/50 hover:bg-slate-800/80 transition-all duration-300 group cursor-pointer hover:-translate-y-1 hover:shadow-xl`}>
            <div className={`w-12 h-12 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-${item.color}-500/20 shadow-[0_0_15px_rgba(0,0,0,0.1)] group-hover:shadow-[0_0_20px_rgba(var(--tw-color-${item.color}-500),0.3)]`}>
              <item.icon className={`w-6 h-6 text-${item.color}-400`} />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
