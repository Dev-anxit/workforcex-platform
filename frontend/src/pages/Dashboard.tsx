import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, TrendingUp, AlertCircle, ShieldAlert, ArrowUpRight, Activity, Calendar, Download } from 'lucide-react';
const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
export default function Dashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('This Month');
  useEffect(() => {
    api.getSummary().then(data => {
      setSummary(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);
  const readinessData = summary?.readinessData || [];
  const skillGaps = summary?.skillGaps || [];
  const signals = summary?.signals || [];
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Loading Executive Insights...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8 pb-10">
      {}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800/60 shadow-lg backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold tracking-wider text-sm uppercase">Executive Overview</span>
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-2">
            Workforce Dashboard
          </h1>
          <p className="text-slate-400">Monitor key metrics, skill gaps, and transition readiness in real-time.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all duration-300 border border-slate-700 hover:border-slate-500 shadow-sm">
            <Calendar className="w-4 h-4" />
            <select 
              className="bg-transparent outline-none cursor-pointer text-sm font-medium"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export Report</span>
          </button>
        </div>
      </header>
      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Employees', value: summary?.totalEmployees || 0, icon: Users, color: 'from-blue-500/20 to-blue-600/5', textColor: 'text-blue-400', trend: '+2.4%' },
          { title: 'Emerging Roles', value: summary?.emergingRoles || 0, icon: TrendingUp, color: 'from-emerald-500/20 to-emerald-600/5', textColor: 'text-emerald-400', trend: '+12%' },
          { title: 'Critical Skill Gaps', value: summary?.criticalSkillGaps || 0, icon: AlertCircle, color: 'from-amber-500/20 to-amber-600/5', textColor: 'text-amber-400', trend: '-4.1%' },
          { title: 'Reskilling Candidates', value: summary?.reskillingCandidates || 0, icon: ShieldAlert, color: 'from-purple-500/20 to-purple-600/5', textColor: 'text-purple-400', trend: '+18%' },
        ].map((stat, i) => (
          <div key={i} className="group relative glass-panel p-6 overflow-hidden rounded-2xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-800 hover:border-slate-600 bg-slate-900/40">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 -mr-10 -mt-10`} />
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm font-semibold tracking-wide uppercase">{stat.title}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full bg-slate-800 ${stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 ${stat.textColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {}
        <div className="glass-panel p-6 border border-slate-800 hover:border-slate-700 transition-colors duration-300 rounded-2xl bg-slate-900/50 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-xl font-bold text-white mb-2 relative z-10 flex items-center gap-2">
            Workforce Transition Readiness
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </h3>
          <p className="text-sm text-slate-400 mb-6 relative z-10">Distribution of employees across readiness stages</p>
          <div className="h-72 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={readinessData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {readinessData.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '12px', backdropFilter: 'blur(8px)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2 relative z-10">
            {readinessData.map((entry: any, index: number) => (
              <div key={entry.name} className="flex items-center text-sm bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50 hover:bg-slate-700/50 transition-colors cursor-pointer">
                <span className="w-3 h-3 rounded-full mr-2 shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span className="text-slate-200 font-medium">{entry.name} <span className="text-slate-400 ml-1">({entry.value}%)</span></span>
              </div>
            ))}
          </div>
        </div>
        {}
        <div className="glass-panel p-6 border border-slate-800 hover:border-slate-700 transition-colors duration-300 rounded-2xl bg-slate-900/50 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-xl font-bold text-white mb-2 relative z-10 flex items-center gap-2">
            Emerging Skill Gaps
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
          </h3>
          <p className="text-sm text-slate-400 mb-6 relative z-10">Severity of skill shortages across the organization</p>
          <div className="h-72 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillGaps} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.3)" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" width={100} tick={{ fill: '#cbd5e1', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(51, 65, 85, 0.2)' }}
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '12px', backdropFilter: 'blur(8px)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
                <Bar dataKey="gap" fill="url(#colorGap)" radius={[0, 6, 6, 0]}>
                  {skillGaps.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} className="hover:brightness-110 cursor-pointer transition-all duration-300" />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="colorGap" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {}
      <div className="glass-panel p-6 mt-8 border border-slate-800 rounded-2xl bg-slate-900/50">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Recent Workforce Signals
              <span className="flex h-3 w-3 relative ml-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            </h3>
            <p className="text-sm text-slate-400 mt-1">Real-time market insights and internal shifts</p>
          </div>
          <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-1">
            View All Signals <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {signals.map((signal: any, idx: number) => (
            <div 
              key={idx} 
              className="group flex flex-col p-5 bg-slate-800/40 hover:bg-slate-800/80 rounded-xl border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-1 h-full ${signal.type === 'Emerging' ? 'bg-emerald-500' : 'bg-amber-500'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg backdrop-blur-md ${signal.type === 'Emerging' ? 'bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-amber-500/10 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]'}`}>
                  <TrendingUp className={`w-5 h-5 ${signal.type === 'Declining' ? 'rotate-180' : ''}`} />
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full border ${signal.type === 'Emerging' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
                  {signal.type}
                </span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1.5 group-hover:text-blue-400 transition-colors">{signal.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{signal.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
