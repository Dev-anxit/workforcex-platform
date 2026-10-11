import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ArrowRight, ArrowDownRight, ArrowUpRight, ShieldCheck, Cpu } from 'lucide-react';
export default function SkillTransformation() {
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.getRoles().then(data => {
      setRoles(data);
      if (data.length > 0) setSelectedRole(data[0]);
      setLoading(false);
    });
  }, []);
  if (loading) return <div className="text-white flex items-center justify-center h-full"><div className="animate-pulse">Loading Transformation Map...</div></div>;
  if (!roles.length) return <div className="text-white">No role data available</div>;
  const targetRole = selectedRole?.possibleTransitionRoles?.[0] ? roles.find(r => r.id === selectedRole.possibleTransitionRoles[0]) : null;
  return (
    <div className="space-y-6 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Skill Transformation Map</h1>
        <p className="text-slate-400">Visualize how work, tasks, and required skills are evolving.</p>
      </header>
      <div className="mb-6 flex items-center gap-4">
        <label className="text-sm font-medium text-slate-300">Select Current Role:</label>
        <select 
          className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-primary"
          value={selectedRole?.id || ''}
          onChange={e => setSelectedRole(roles.find(r => r.id === e.target.value))}
        >
          {roles.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>
      <div className="glass-panel p-8">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          <div className="flex-1 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase text-center mb-6">Current State</h3>
            <div className="p-5 bg-slate-800/80 rounded-xl border border-slate-700 h-full">
              <h4 className="font-bold text-white text-lg mb-2">{selectedRole.name}</h4>
              <ul className="space-y-3 mt-4">
                {selectedRole.tasks.map((task: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 mr-2 shrink-0"></span>
                    <span className="text-sm text-slate-300">{task}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <h5 className="text-xs font-bold text-slate-400 mb-2">CORE SKILLS</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedRole.requiredSkills.map((skill: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 py-8">
            <div className="text-center w-full max-w-[200px] p-3 bg-primary/10 border border-primary/30 rounded-lg">
              <ArrowDownRight className="w-5 h-5 text-danger mx-auto mb-1" />
              <p className="text-xs text-danger font-medium">Routine Tasks (Auto)</p>
            </div>
            <ArrowRight className="w-8 h-8 text-slate-500 my-2" />
            <div className="text-center w-full max-w-[200px] p-3 bg-secondary/10 border border-secondary/30 rounded-lg">
              <ArrowUpRight className="w-5 h-5 text-secondary mx-auto mb-1" />
              <p className="text-xs text-secondary font-medium">AI-Assisted Capabilities</p>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase text-center mb-6">Future Capability</h3>
            {targetRole ? (
              <div className="p-5 bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-xl border border-primary/30 h-full shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <h4 className="font-bold text-white text-lg mb-2 flex items-center">
                  {targetRole.name} <Cpu className="w-4 h-4 ml-2 text-primary" />
                </h4>
                <ul className="space-y-3 mt-4">
                  {targetRole.tasks.map((task: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 shrink-0"></span>
                      <span className="text-sm text-white font-medium">{task}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-slate-700/50">
                  <h5 className="text-xs font-bold text-primary mb-2 flex items-center">
                    <ShieldCheck className="w-3 h-3 mr-1" /> EMERGING SKILLS
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {targetRole.requiredSkills.filter((s: string) => selectedRole.emergingSkills.includes(s) || !selectedRole.requiredSkills.includes(s)).map((skill: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded border border-primary/30 font-medium">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 bg-slate-800/50 rounded-xl border border-slate-700 h-full flex items-center justify-center text-center">
                <p className="text-slate-400 text-sm">No direct future role mapped for this occupation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
