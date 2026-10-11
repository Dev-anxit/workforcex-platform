import { useEffect, useState } from 'react';
import { User, BookOpen, Target, Compass, Briefcase, Award, BrainCircuit, Activity, ChevronRight, Zap, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
const LoadingState = () => (
  <div className="text-white flex flex-col items-center justify-center h-[60vh] space-y-4">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      <User className="w-6 h-6 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
    </div>
    <div className="animate-pulse text-slate-400 font-medium">Syncing Profile Data...</div>
  </div>
);
export const EmployeeDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [prediction, setPrediction] = useState<any>(null);
  useEffect(() => {
    api.getEmployee('EMP001').then(res => setData(res));
    api.getEmployeePrediction('EMP001').then(res => setPrediction(res));
  }, []);
  if (!data) return <LoadingState />;
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-slate-900/40 p-8 rounded-3xl border border-slate-800/80 shadow-lg backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
            <User className="w-4 h-4" /> Personal Hub
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-2">
            Welcome back, {data.name.split(' ')[0]}!
          </h1>
          <p className="text-slate-400 text-lg">{data.role} • {data.department}</p>
        </div>
        <div className="relative z-10 flex items-center gap-4 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
          <div className="w-16 h-16 relative flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-800" />
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={175} strokeDashoffset={175 - (175 * 78) / 100} className="text-blue-500 transition-all duration-1000 ease-out" />
            </svg>
            <span className="absolute text-sm font-bold text-white">78%</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Readiness Score</p>
            <p className="text-sm text-blue-400 mt-1">Top 15% in Dept</p>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {}
        <div className="glass-panel p-6 col-span-1 border border-slate-800 bg-slate-900/50 rounded-3xl relative group overflow-hidden hover:border-slate-700 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors" />
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-blue-500/20">
            <User className="w-10 h-10 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{data.name}</h2>
          <p className="text-sm text-slate-400 mb-8">{data.experience} Years Experience</p>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold mb-3 tracking-widest flex items-center gap-2"><Award className="w-4 h-4 text-amber-400" /> Top Skills</p>
            <div className="flex flex-wrap gap-2">
              {data.skills.slice(0, 4).map((s: any) => (
                <span key={s.name} className="px-3 py-1.5 bg-slate-800/80 border border-slate-700/80 text-slate-200 text-sm font-medium rounded-lg shadow-sm hover:border-slate-500 transition-colors cursor-default">
                  {s.name} <span className="text-blue-400 ml-1">({s.level}/5)</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        {}
        <div className="glass-panel p-8 col-span-1 xl:col-span-2 border border-slate-800 bg-slate-900/50 rounded-3xl group">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-purple-400" /> AI Career Intelligence
            </h3>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
          </div>
          {!prediction ? (
            <div className="animate-pulse space-y-4">
              <div className="h-24 bg-slate-800/50 rounded-xl w-full"></div>
              <div className="h-24 bg-slate-800/50 rounded-xl w-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all hover:shadow-lg">
                <div className="text-slate-400 text-sm mb-2 font-medium">Estimated Market Value</div>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 mb-2">
                  {prediction.predicted_salary ? `${prediction.predicted_salary}L` : 'N/A'}
                </div>
                <p className="text-xs text-slate-500">Based on real-time industry analytics.</p>
              </div>
              <div className={`p-6 rounded-2xl border transition-all hover:shadow-lg ${prediction.jds_prediction === 1 ? 'bg-gradient-to-br from-blue-900/20 to-slate-900 border-blue-500/30' : 'bg-gradient-to-br from-amber-900/20 to-slate-900 border-amber-500/30'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-sm font-bold text-white">Promotion Trajectory</div>
                  <div className={`px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase ${prediction.jds_prediction === 1 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                    {prediction.jds_prediction === 1 ? 'HIGH PROBABILITY' : 'REVIEW'}
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{prediction.jds_explanation}</p>
              </div>
              <div className={`p-6 rounded-2xl border col-span-1 md:col-span-2 transition-all hover:shadow-lg ${prediction.sds_prediction === 1 ? 'bg-gradient-to-r from-purple-900/20 via-slate-900 to-slate-900 border-purple-500/30' : 'bg-slate-800/50 border-slate-700/50'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-sm font-bold text-white flex items-center gap-2"><Activity className="w-4 h-4 text-purple-400"/> Long-term Success Indicator</div>
                  <div className={`px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase ${prediction.sds_prediction === 1 ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-slate-700 text-slate-300'}`}>
                    {prediction.sds_prediction === 1 ? 'EXCEPTIONAL' : 'AVERAGE'}
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{prediction.sds_explanation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export const PersonalSkills = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    api.getEmployee('EMP001').then(res => setData(res));
  }, []);
  if (!data) return <LoadingState />;
  const skillData = data.skills.map((s: any) => ({ name: s.name, level: s.level }));
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <header className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/80 shadow-lg backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-3 flex items-center">
          <Award className="w-8 h-8 mr-4 text-emerald-400" /> Skill Inventory
        </h1>
        <p className="text-slate-400 text-lg">Your verified competencies benchmarked against organizational standards.</p>
      </header>
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-slate-900/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" /> Proficiency Distribution
        </h3>
        <div className="h-[450px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.2)" horizontal={false} />
              <XAxis type="number" domain={[0, 5]} stroke="#64748b" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="#64748b" width={120} tick={{ fill: '#cbd5e1', fontWeight: 500 }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(51, 65, 85, 0.1)' }}
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(51, 65, 85, 0.5)', borderRadius: '12px' }}
                itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                formatter={(val) => [`${val}/5 Level`, 'Proficiency']}
              />
              <Bar dataKey="level" radius={[0, 6, 6, 0]} animationDuration={1500}>
                {skillData.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill="url(#colorEmerald)" className="hover:brightness-125 cursor-pointer transition-all duration-300" />
                ))}
              </Bar>
              <defs>
                <linearGradient id="colorEmerald" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#059669" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export const CareerPaths = () => {
  const [roles, setRoles] = useState<any[]>([]);
  useEffect(() => {
    api.getRoles().then(data => setRoles(data));
  }, []);
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <header className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/80 shadow-lg backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-3 flex items-center">
          <Compass className="w-8 h-8 mr-4 text-blue-400" /> Career Pathways
        </h1>
        <p className="text-slate-400 text-lg">AI-generated transition trajectories optimized for your skill adjacencies.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.slice(0, 4).map((role, idx) => {
          const matchScore = Math.floor(Math.random() * 40 + 50);
          return (
            <div key={idx} className="group relative glass-panel p-6 border border-slate-800 hover:border-blue-500/50 bg-slate-900/50 rounded-2xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] cursor-pointer overflow-hidden hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] group-hover:bg-blue-500/20 transition-all duration-500" />
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{role.name}</h3>
                  <p className="text-sm font-medium text-slate-500 tracking-wider truncate max-w-[200px] sm:max-w-[300px]">{role.description}</p>
                </div>
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
                </div>
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Zap className="w-3 h-3 text-blue-400" /> Match Score
                  </span>
                  <span className="text-xl font-black text-white">{matchScore}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden shadow-inner border border-slate-700/50">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full relative" style={{ width: `${matchScore}%` }}>
                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export const EmployeeSkillGaps = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <header className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/80 shadow-lg backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-3 flex items-center">
          <Target className="w-8 h-8 mr-4 text-rose-400" /> Target Gap Analysis
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-lg">Goal Trajectory:</span>
          <span className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 font-bold tracking-wide">AI Engineer</span>
        </div>
      </header>
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-slate-900/50">
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-rose-400" /> Competency Delta
        </h3>
        <div className="space-y-8">
          {[
            { name: 'Machine Learning', current: 1, target: 5, color: 'text-rose-400', bg: 'bg-rose-500', shadow: 'shadow-[0_0_10px_rgba(244,63,94,0.5)]' },
            { name: 'Python', current: 2, target: 5, color: 'text-amber-400', bg: 'bg-amber-500', shadow: 'shadow-[0_0_10px_rgba(245,158,11,0.5)]' },
            { name: 'Cloud Architecture', current: 3, target: 5, color: 'text-blue-400', bg: 'bg-blue-500', shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.5)]' },
            { name: 'System Design', current: 2, target: 5, color: 'text-purple-400', bg: 'bg-purple-500', shadow: 'shadow-[0_0_10px_rgba(168,85,247,0.5)]' }
          ].map((skill, idx) => {
            const widthPct = mounted ? (skill.current / skill.target) * 100 : 0;
            return (
              <div key={idx} className="group cursor-default">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-white font-medium text-base group-hover:text-blue-400 transition-colors">{skill.name}</span>
                  <div className="text-sm font-bold bg-slate-800 px-3 py-1 rounded-md border border-slate-700 text-slate-300">
                    <span className={`${skill.color} mr-1`}>{skill.current}</span>
                    <span className="text-slate-500">/ {skill.target}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-3 border border-slate-700 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full ${skill.bg} ${skill.shadow} transition-all duration-1000 ease-out`}
                    style={{ width: `${widthPct}%` }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export const LearningPath = () => (
  <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
    <header className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/80 shadow-lg backdrop-blur-md">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-3 flex items-center">
        <BookOpen className="w-8 h-8 mr-4 text-purple-400" /> Prescriptive Learning
      </h1>
      <p className="text-slate-400 text-lg">Curated micro-credentials and bootcamps to bridge your identified gaps.</p>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { title: 'Advanced Machine Learning', provider: 'Coursera', time: '4 Weeks', level: 'Advanced', glow: 'bg-purple-500/5 group-hover:bg-purple-500/20', iconBg: 'bg-purple-500/10', iconText: 'text-purple-400', iconBorder: 'border-purple-500/20', tagBg: 'bg-purple-500/10', tagBorder: 'border-purple-500/20', tagText: 'text-purple-400' },
        { title: 'Cloud Architecture Fundamentals', provider: 'AWS Training', time: '2 Weeks', level: 'Intermediate', glow: 'bg-blue-500/5 group-hover:bg-blue-500/20', iconBg: 'bg-blue-500/10', iconText: 'text-blue-400', iconBorder: 'border-blue-500/20', tagBg: 'bg-blue-500/10', tagBorder: 'border-blue-500/20', tagText: 'text-blue-400' },
        { title: 'System Design Interview Prep', provider: 'Educative', time: '3 Weeks', level: 'Advanced', glow: 'bg-emerald-500/5 group-hover:bg-emerald-500/20', iconBg: 'bg-emerald-500/10', iconText: 'text-emerald-400', iconBorder: 'border-emerald-500/20', tagBg: 'bg-emerald-500/10', tagBorder: 'border-emerald-500/20', tagText: 'text-emerald-400' },
      ].map((course, idx) => (
        <div key={idx} className="group flex flex-col glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 hover:border-slate-600 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl overflow-hidden relative">
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[30px] transition-colors ${course.glow}`} />
          <div className={`p-3.5 w-max rounded-xl mb-6 shadow-sm group-hover:scale-110 transition-transform ${course.iconBg} ${course.iconText} border ${course.iconBorder}`}>
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-tight">{course.title}</h3>
          <p className="text-sm text-slate-400 mb-6 font-medium">{course.provider}</p>
          <div className="mt-auto pt-4 border-t border-slate-700/50 flex justify-between items-center text-xs font-bold uppercase tracking-wider">
            <span className="text-slate-300 bg-slate-800 px-3 py-1.5 rounded-md">{course.time}</span>
            <span className={`px-3 py-1.5 rounded-md border ${course.tagBg} ${course.tagText} ${course.tagBorder}`}>{course.level}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
function ArrowRight(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}
