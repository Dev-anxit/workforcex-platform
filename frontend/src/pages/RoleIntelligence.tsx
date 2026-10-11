import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Briefcase, ArrowUpRight, ArrowDownRight, Bot } from 'lucide-react';
export default function RoleIntelligence() {
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  useEffect(() => {
    api.getRoles().then(data => {
      setRoles(data);
      if (data.length > 0) setSelectedRole(data[0]);
    });
  }, []);
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Role Intelligence</h1>
        <p className="text-slate-400">Deep dive into occupational changes and AI exposure.</p>
      </header>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          <div className="glass-panel overflow-hidden">
            <div className="p-4 border-b border-slate-700/50 bg-slate-800/50">
              <h3 className="font-bold text-white">Occupations</h3>
            </div>
            <div className="divide-y divide-slate-700/50 max-h-[600px] overflow-y-auto">
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`w-full text-left p-4 hover:bg-slate-800 transition-colors ${selectedRole?.id === role.id ? 'bg-slate-800 border-l-4 border-primary' : 'border-l-4 border-transparent'}`}
                >
                  <div className="font-medium text-white mb-1">{role.name}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      role.aiExposure === 'High' ? 'bg-danger/20 text-danger' :
                      role.aiExposure === 'Medium' ? 'bg-warning/20 text-warning' :
                      'bg-secondary/20 text-secondary'
                    }`}>
                      {role.aiExposure} AI Exposure
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        {selectedRole && (
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="glass-panel p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedRole.name}</h2>
                  <p className="text-slate-400 text-sm">{selectedRole.description}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 uppercase mb-4 flex items-center">
                    <ArrowDownRight className="w-4 h-4 mr-2 text-danger" /> Highly Automatable Tasks
                  </h3>
                  <ul className="space-y-3">
                    {selectedRole.tasks.slice(0, 2).map((t: string, i: number) => (
                      <li key={i} className="text-sm text-slate-400 flex items-start bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                        <Bot className="w-4 h-4 mr-2 text-slate-500 shrink-0 mt-0.5" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 uppercase mb-4 flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-2 text-secondary" /> Human-Intensive Tasks
                  </h3>
                  <ul className="space-y-3">
                    {selectedRole.tasks.slice(-2).map((t: string, i: number) => (
                      <li key={i} className="text-sm text-slate-400 flex items-start bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                        <Briefcase className="w-4 h-4 mr-2 text-primary shrink-0 mt-0.5" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="glass-panel p-6">
              <h3 className="text-lg font-bold text-white mb-6">Skill Evolution</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 mb-3">CURRENT REQUIRED SKILLS</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRole.requiredSkills.map((s: string) => (
                      <span key={s} className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary mb-3">EMERGING SKILLS REQUIRED</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRole.emergingSkills.map((s: string) => (
                      <span key={s} className="px-3 py-1 bg-primary/20 border border-primary/30 text-primary font-medium text-sm rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-panel p-6 bg-slate-800/30 border-dashed border-slate-700">
               <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Potential Transition Pathways</h3>
               <div className="flex flex-wrap gap-3">
                 {selectedRole.possibleTransitionRoles.map((id: string) => {
                   const r = roles.find(ro => ro.id === id);
                   return r ? (
                     <div key={id} className="px-4 py-2 bg-slate-800 rounded-lg text-sm text-white font-medium flex items-center border border-slate-700">
                       {r.name}
                       <ArrowUpRight className="w-4 h-4 ml-2 text-slate-500" />
                     </div>
                   ) : null;
                 })}
                 {selectedRole.possibleTransitionRoles.length === 0 && (
                   <span className="text-slate-500 text-sm">No direct transition pathways defined in prototype data.</span>
                 )}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
