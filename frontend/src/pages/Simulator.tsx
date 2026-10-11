import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, AreaChart, Area } from 'recharts';
import { Settings, Play, Info, BrainCircuit, Activity, BarChart3, TrendingUp, Zap, Clock, Users, DollarSign, Sparkles } from 'lucide-react';
export default function Simulator() {
  const [requiredRoles, setRequiredRoles] = useState(100);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const runSimulation = async () => {
    setLoading(true);
    setIsSimulating(true);
    await new Promise(r => setTimeout(r, 1500));
    try {
      const strategies = ['BUILD', 'BUY', 'REDEPLOY', 'AUTOMATE'];
      const data = await Promise.all(
        strategies.map(async (strategy) => {
          const res = await api.runSimulator(requiredRoles, strategy);
          return { name: strategy, ...res };
        })
      );
      setResults(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    setIsSimulating(false);
  };
  const chartData = results ? results.map((r: any) => ({
    name: r.name,
    'Coverage (%)': r.capabilityCoverage,
    'Skill Gaps (%)': r.skillGapsRemaining
  })) : [];
  const getStrategyColor = (name: string) => {
    switch (name) {
      case 'BUILD': return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', hex: '#10b981' };
      case 'BUY': return { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', hex: '#f43f5e' };
      case 'REDEPLOY': return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', hex: '#3b82f6' };
      case 'AUTOMATE': return { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', hex: '#a855f7' };
      default: return { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400', hex: '#94a3b8' };
    }
  };
  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-7xl mx-auto">
      <header className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/80 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-3 flex items-center relative z-10">
          <BrainCircuit className="w-8 h-8 mr-4 text-blue-500" /> Strategic Simulator
        </h1>
        <p className="text-slate-400 text-lg relative z-10">AI-driven predictive modeling for future capability readiness.</p>
      </header>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {}
        <div className="col-span-1 space-y-6">
          <div className="glass-panel p-8 border border-slate-800 bg-slate-900/60 rounded-3xl shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
              <Settings className="w-6 h-6 text-blue-400" /> Engine Parameters
            </h3>
            <div className="space-y-8 relative z-10">
              <div>
                <label className="text-sm font-bold text-slate-300 block mb-4 uppercase tracking-wider">
                  Target Headcount Gap
                </label>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-6">
                    <div className="relative flex-1 group/slider">
                      <div className="absolute inset-y-0 left-0 w-full h-2 bg-slate-800 rounded-full" />
                      <div className="absolute inset-y-0 left-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${(requiredRoles / 1000) * 100}%` }} />
                      <input 
                        type="range" 
                        min="10" max="1000" step="10"
                        value={requiredRoles}
                        onChange={(e) => setRequiredRoles(parseInt(e.target.value))}
                        className="absolute inset-y-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                      />
                      {}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] border-2 border-blue-500 pointer-events-none transition-transform group-hover/slider:scale-125"
                        style={{ left: `calc(${(requiredRoles / 1000) * 100}% - 10px)` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 font-medium text-sm">Selected Gap:</span>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                      {requiredRoles} <span className="text-sm text-slate-500">FTEs</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-800">
                <button 
                  onClick={runSimulation}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center disabled:opacity-50 disabled:grayscale hover:-translate-y-1"
                >
                  {loading ? (
                    <><Activity className="w-5 h-5 mr-3 animate-spin" /> Simulating Engine...</>
                  ) : (
                    <><Play className="w-5 h-5 mr-3 fill-current" /> Execute Neural Simulation</>
                  )}
                </button>
              </div>
            </div>
            <div className="mt-8 p-4 bg-slate-950/50 rounded-2xl border border-slate-800/80 flex gap-4 text-sm text-slate-400 shadow-inner">
              <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">Forecasts are dynamically generated using our proprietary heuristic scoring and real-time market data models.</p>
            </div>
          </div>
        </div>
        {}
        <div className="col-span-1 xl:col-span-2 space-y-8">
          {results ? (
            <div className="animate-in slide-in-from-bottom-8 fade-in duration-1000 space-y-8">
              {}
              <div className="glass-panel p-8 border border-slate-800 bg-slate-900/60 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-emerald-400" /> Strategy Efficacy Comparison
                </h3>
                <div className="h-80 w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.3)" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontWeight: 600, fontSize: 12 }} dy={10} />
                      <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <Tooltip 
                        cursor={{ fill: 'rgba(51, 65, 85, 0.1)' }}
                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(51, 65, 85, 0.5)', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                        itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Bar dataKey="Coverage (%)" radius={[6, 6, 0, 0]} animationDuration={2000}>
                        {chartData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill="url(#colorCoverage)" />
                        ))}
                      </Bar>
                      <Bar dataKey="Skill Gaps (%)" fill="#f43f5e" radius={[6, 6, 0, 0]} animationDuration={2000} />
                      <defs>
                        <linearGradient id="colorCoverage" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {}
              <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <BrainCircuit className="w-32 h-32" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" /> AI Strategic Insights
                </h4>
                <div className="text-slate-300 leading-relaxed space-y-2 relative z-10">
                  {requiredRoles <= 200 ? (
                    <p>
                      <strong className="text-emerald-400">Recommendation: BUILD (Upskill).</strong> At this smaller scale ({requiredRoles} roles), upskilling your existing workforce is highly effective. Coverage remains high, and it avoids the massive upfront capital cost required to build custom Automation software.
                    </p>
                  ) : requiredRoles > 200 && requiredRoles <= 600 ? (
                    <p>
                      <strong className="text-rose-400">Recommendation: Hybrid BUILD + BUY.</strong> Upskilling {requiredRoles} employees simultaneously will strain internal training resources (notice the coverage dropping). You should supplement by hiring externally, though external capital costs will scale up quickly.
                    </p>
                  ) : (
                    <p>
                      <strong className="text-purple-400">Recommendation: AUTOMATE.</strong> At this massive scale ({requiredRoles} roles), human-centric strategies break down. Hiring this many people exhausts the talent market, and mass-redeployments create massive skill gaps. Automation software scales infinitely without quality degradation, making it the most cost-effective long-term solution.
                    </p>
                  )}
                </div>
              </div>
              {}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.map((r: any, idx: number) => {
                  const colors = getStrategyColor(r.name);
                  return (
                    <div 
                      key={r.name} 
                      className={`glass-panel p-6 rounded-2xl border bg-slate-900/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group ${colors.border}`}
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      <div className={`absolute inset-0 ${colors.bg} opacity-50 group-hover:opacity-100 transition-opacity`} />
                      <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                          <h4 className={`text-lg font-black tracking-wider ${colors.text}`}>{r.name}</h4>
                          <Activity className={`w-5 h-5 ${colors.text} opacity-50 group-hover:opacity-100`} />
                        </div>
                        <div className="space-y-4">
                          <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800">
                            <span className="text-xs text-slate-500 uppercase font-bold flex items-center gap-1.5 mb-1"><Clock className="w-3 h-3"/> Time to Value</span>
                            <span className="text-lg font-bold text-white">{r.trainingTimeWeeks} <span className="text-sm font-normal text-slate-400">Weeks</span></span>
                          </div>
                          <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800">
                            <span className="text-xs text-slate-500 uppercase font-bold flex items-center gap-1.5 mb-1"><Users className="w-3 h-3"/> Ext. Hires</span>
                            <span className="text-lg font-bold text-white">{r.externalHiringRequirement} <span className="text-sm font-normal text-slate-400">FTEs</span></span>
                          </div>
                          <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800 group-hover:border-slate-700 transition-colors">
                            <span className="text-xs text-slate-500 uppercase font-bold flex items-center gap-1.5 mb-1"><DollarSign className="w-3 h-3"/> Est. Capital</span>
                            <span className="text-lg font-bold text-white">${(r.budgetRequired / 1000).toFixed(1)}k</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 h-full flex flex-col items-center justify-center border border-slate-800 bg-slate-900/40 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
              <div className="relative w-32 h-32 mb-8">
                {isSimulating ? (
                  <>
                    <div className="absolute inset-0 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-4 border-4 border-purple-500/20 border-b-purple-500 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
                    <BrainCircuit className="absolute inset-0 m-auto w-10 h-10 text-blue-400 animate-pulse" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-slate-800 rounded-full border border-slate-700 shadow-inner group-hover:scale-110 transition-transform duration-700" />
                    <BrainCircuit className="absolute inset-0 m-auto w-12 h-12 text-slate-600 group-hover:text-blue-500 transition-colors duration-700" />
                  </>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 text-center">
                {isSimulating ? 'Processing Neural Simulation...' : 'Awaiting Parameters'}
              </h2>
              <p className="text-slate-400 text-center max-w-md leading-relaxed">
                {isSimulating 
                  ? 'Our proprietary heuristic engines are evaluating transition pathways and market dynamics.'
                  : 'Adjust the target headcount gap on the left and execute the engine to generate comparative strategy metrics.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
