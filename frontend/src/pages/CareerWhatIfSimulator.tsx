import { useState } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Sparkles, BrainCircuit, BookOpen, Download, HelpCircle, MapPin, Target, Zap, Clock } from 'lucide-react';
const ROLES = [
  { id: 'data-scientist', name: 'Data Scientist', match: 85, timeline: '6 months', overlap: ['Python', 'SQL'] },
  { id: 'cloud-architect', name: 'Cloud Architect', match: 60, timeline: '12 months', overlap: ['Linux'] },
  { id: 'ai-engineer', name: 'AI Engineer', match: 75, timeline: '9 months', overlap: ['Python', 'Machine Learning'] },
];
const ROADMAP_DATA = {
  'data-scientist': [
    { month: 'Month 1', skill: 'Advanced Pandas', status: 'completed' },
    { month: 'Month 3', skill: 'Scikit-Learn Mastery', status: 'in-progress' },
    { month: 'Month 6', skill: 'Deep Learning Basics', status: 'locked' },
  ],
  'cloud-architect': [
    { month: 'Month 2', skill: 'AWS Practitioner', status: 'in-progress' },
    { month: 'Month 6', skill: 'Docker & Kubernetes', status: 'locked' },
    { month: 'Month 12', skill: 'System Design', status: 'locked' },
  ],
  'ai-engineer': [
    { month: 'Month 3', skill: 'PyTorch Fundamentals', status: 'in-progress' },
    { month: 'Month 6', skill: 'LLM Fine-Tuning', status: 'locked' },
    { month: 'Month 9', skill: 'MLOps & Deployment', status: 'locked' },
  ]
};
const SALARY_PROJECTION = [
  { month: 'Now', current: 90000, projected: 90000 },
  { month: 'M3', current: 90000, projected: 95000 },
  { month: 'M6', current: 95000, projected: 110000 },
  { month: 'M9', current: 95000, projected: 130000 },
  { month: 'M12', current: 100000, projected: 155000 },
];
export default function CareerWhatIfSimulator() {
  const [selectedRole, setSelectedRole] = useState(ROLES[0].id);
  const [isSimulating, setIsSimulating] = useState(false);
  const roadmap = ROADMAP_DATA[selectedRole as keyof typeof ROADMAP_DATA];
  const handleSimulate = (roleId: string) => {
    setIsSimulating(true);
    setTimeout(() => {
      setSelectedRole(roleId);
      setIsSimulating(false);
    }, 800);
  };
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/50 p-8 rounded-3xl border border-slate-800/80 shadow-lg backdrop-blur-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Zap className="w-4 h-4" /> AI Future Simulator
          </div>
          <h1 className="text-4xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2">
            Career "What-If" Engine
          </h1>
          <p className="text-slate-400 text-base max-w-2xl">
            Simulate alternative career trajectories. Instantly generate AI-powered reskilling roadmaps and visualize your future potential.
          </p>
        </div>
        <button className="relative z-10 flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all duration-300 border border-slate-700 shadow-sm group">
          <Download className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span className="font-medium">Export AI Report</span>
        </button>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 px-2">
            <Target className="w-5 h-5 text-blue-400" /> Target Roles
          </h3>
          {ROLES.map((role) => (
            <div 
              key={role.id}
              onClick={() => handleSimulate(role.id)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                selectedRole === role.id 
                  ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-600 hover:bg-slate-800/60'
              }`}
            >
              {selectedRole === role.id && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 blur-2xl rounded-full" />
              )}
              <div className="flex justify-between items-start mb-2 relative z-10">
                <h4 className="text-white font-bold text-lg">{role.name}</h4>
                <div className={`px-2 py-1 rounded text-xs font-bold ${role.match >= 80 ? 'bg-emerald-500/20 text-emerald-400' : role.match >= 70 ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {role.match}% Match
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-4 relative z-10">Est. Transition: {role.timeline}</p>
              {}
              <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/50 relative z-10">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1">
                  <BrainCircuit className="w-3.5 h-3.5 text-purple-400" /> AI Rationale
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Strong overlap in <span className="text-slate-200">{role.overlap.join(', ')}</span>.
                </p>
              </div>
            </div>
          ))}
        </div>
        {}
        <div className="lg:col-span-2 space-y-6">
          {isSimulating ? (
            <div className="glass-panel h-full min-h-[500px] flex flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/50">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <BrainCircuit className="w-6 h-6 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <p className="mt-6 text-slate-300 font-medium animate-pulse">Running AI Career Simulation...</p>
              <p className="text-slate-500 text-sm mt-2">Computing skill overlaps and market demand</p>
            </div>
          ) : (
            <>
              {}
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-900/50">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" /> Personalized Reskilling Roadmap
                </h3>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-700" />
                  <div className="space-y-6">
                    {roadmap.map((step, idx) => (
                      <div key={idx} className="relative flex items-center gap-6 group">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300 ${
                          step.status === 'completed' ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400' :
                          step.status === 'in-progress' ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' :
                          'bg-slate-800 border border-slate-700 text-slate-500'
                        }`}>
                          {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : 
                           step.status === 'in-progress' ? <BookOpen className="w-5 h-5" /> : 
                           <Clock className="w-5 h-5" />}
                        </div>
                        <div className={`flex-1 p-4 rounded-xl border transition-all duration-300 ${
                          step.status === 'in-progress' ? 'bg-slate-800/80 border-blue-500/30 shadow-lg' : 'bg-slate-900/40 border-slate-800'
                        }`}>
                          <div className="flex justify-between items-center mb-1">
                            <span className={`text-xs font-bold uppercase tracking-wider ${
                              step.status === 'completed' ? 'text-emerald-500' :
                              step.status === 'in-progress' ? 'text-blue-400' : 'text-slate-500'
                            }`}>{step.month}</span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              {step.status === 'locked' && <HelpCircle className="w-3 h-3" />}
                            </span>
                          </div>
                          <h4 className="text-white font-medium">{step.skill}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {}
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-900/50 group hover:border-slate-700 transition-colors">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" /> Projected Market Value
                </h3>
                <p className="text-sm text-slate-400 mb-6">Estimated compensation trajectory based on real-time market intelligence.</p>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={SALARY_PROJECTION} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.3)" vertical={false} />
                      <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <YAxis stroke="#64748b" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(51, 65, 85, 0.5)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Projected Value']}
                      />
                      <Area type="monotone" dataKey="projected" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorProjected)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
function CheckCircle2(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
