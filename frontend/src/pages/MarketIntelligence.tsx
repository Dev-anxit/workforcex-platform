import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Globe, Briefcase, TrendingUp, DollarSign } from 'lucide-react';
const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#6366f1', '#f43f5e', '#84cc16'];
export default function MarketIntelligence() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    api.getMarketIntelligence()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load market intelligence data.");
        setLoading(false);
      });
  }, []);
  if (loading) return <div className="flex justify-center items-center h-full text-white"><div className="animate-pulse flex flex-col items-center"><Globe className="w-12 h-12 mb-4 text-primary opacity-50" />Loading Market Intelligence...</div></div>;
  if (error) return <div className="text-danger flex items-center p-4 bg-danger/10 border border-danger/30 rounded-lg">{error}</div>;
  if (!data) return <div className="text-slate-400">No data available.</div>;
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center"><Globe className="w-8 h-8 mr-3 text-primary" /> Market Intelligence</h1>
        <p className="text-slate-400">Industry-wide trends on job demand, skills, and salaries based on global datasets.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center"><Briefcase className="w-5 h-5 mr-2 text-primary" /> Top Roles by Demand</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topRoles} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="title" type="category" stroke="#94a3b8" width={150} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} itemStyle={{ color: '#3b82f6' }} />
                <Bar dataKey="demand" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                  {data.topRoles.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-secondary" /> Top Emerging Skills</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topSkills} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} itemStyle={{ color: '#10b981' }} />
                <Bar dataKey="demand" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center"><DollarSign className="w-5 h-5 mr-2 text-warning" /> Salary Insights by Experience</h3>
          <div className="space-y-4">
            {data.salaryInsights.map((insight: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-warning/10 rounded-lg text-warning font-bold">
                    {insight.experience}
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Average Salary</p>
                    <p className="text-white font-bold text-xl">{insight.avgSalary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-lg font-bold text-white mb-4">About this Data</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            This intelligence is derived directly from the official hackathon datasets: <strong>DataScience Jobs.csv</strong> and <strong>Analytics Jobs.csv</strong>. It aggregates thousands of real job postings across the industry to identify shifting skill demands and salary benchmarks.
          </p>
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <h4 className="text-primary font-bold text-sm mb-2">How WorkforceX Uses This</h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              These global trends feed into our Transition Engine. When we score an employee's readiness to transition to an emerging role, we weight the missing skills based on their market demand identified here, ensuring reskilling pathways are aligned with actual industry needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
