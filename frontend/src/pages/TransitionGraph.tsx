import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
export default function TransitionGraph() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedEmp, setSelectedEmp] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    Promise.all([api.getEmployees(), api.getRoles()]).then(([empData, roleData]) => {
      setEmployees(empData);
      setRoles(roleData);
      const passedEmpId = location.state?.empId;
      if (passedEmpId) {
        setSelectedEmp(passedEmpId);
      } else if (empData.length > 0) {
        setSelectedEmp(empData[0].id);
      }
      if (roleData.length > 0) setSelectedRole(roleData[1].name); 
    });
  }, [location.state]);
  const analyze = async () => {
    if (!selectedEmp || !selectedRole) return;
    setLoading(true);
    try {
      const data = await api.analyzeTransition(selectedEmp, selectedRole);
      setResult(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  return (
    <div className="space-y-6 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Transition Graph</h1>
        <p className="text-slate-400">Model individual employee transitions to target roles.</p>
      </header>
      <div className="glass-panel p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium text-slate-300">Select Employee</label>
            <select 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
              value={selectedEmp}
              onChange={e => setSelectedEmp(e.target.value)}
            >
              {employees.map(e => (
                <option key={e.id} value={e.id}>{e.name} ({e.role})</option>
              ))}
            </select>
          </div>
          <div className="col-span-1 flex justify-center pb-3">
            <ArrowRight className="w-6 h-6 text-slate-500" />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium text-slate-300">Target Role</label>
            <select 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
            >
              {roles.map(r => (
                <option key={r.id} value={r.name}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={analyze}
            disabled={loading}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze Transition'}
          </button>
        </div>
      </div>
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="col-span-1 space-y-6">
            <div className="glass-panel p-6 text-center">
              <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4">Transition Score</h3>
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-700" />
                  <circle 
                    cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    strokeDasharray={351.858} 
                    strokeDashoffset={351.858 - (351.858 * result.transitionScore) / 100}
                    className={`${result.transitionScore >= 70 ? 'text-secondary' : result.transitionScore >= 40 ? 'text-warning' : 'text-danger'} transition-all duration-1000`} 
                  />
                </svg>
                <span className="absolute text-3xl font-bold text-white">{result.transitionScore}%</span>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-300">
                Difficulty: <span className={`${result.difficulty === 'Low' ? 'text-secondary' : result.difficulty === 'Medium' ? 'text-warning' : 'text-danger'}`}>{result.difficulty}</span>
              </p>
              <p className="mt-2 text-xs text-slate-500 text-left bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                Prototype transition score based on skill overlap and skill-gap analysis.
              </p>
            </div>
            <div className="glass-panel p-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4">Recommended Pathway</h3>
              <div className="space-y-3">
                {result.recommendedPath.map((step: string, index: number) => (
                  <div key={index} className="flex flex-col">
                    <div className={`p-3 rounded-lg text-sm font-medium border ${index === 0 ? 'bg-slate-800 border-slate-600 text-white' : index === result.recommendedPath.length - 1 ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-slate-800/50 border-slate-700 text-slate-300'}`}>
                      {step}
                    </div>
                    {index < result.recommendedPath.length - 1 && (
                      <div className="h-6 flex justify-center">
                        <div className="w-0.5 h-full bg-slate-700"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-2 space-y-6">
            <div className="glass-panel p-6">
              <h3 className="text-lg font-bold text-white mb-4">Skill Analysis</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-secondary flex items-center mb-3">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Matched Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedSkills.length > 0 ? result.matchedSkills.map((s: string) => (
                      <span key={s} className="px-3 py-1 bg-secondary/10 border border-secondary/30 text-secondary text-sm rounded-full">
                        {s}
                      </span>
                    )) : <span className="text-slate-500 text-sm">No exact skill matches.</span>}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-danger flex items-center mb-3">
                    <XCircle className="w-4 h-4 mr-2" /> Missing Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.length > 0 ? result.missingSkills.map((s: string) => (
                      <span key={s} className="px-3 py-1 bg-danger/10 border border-danger/30 text-danger text-sm rounded-full">
                        {s}
                      </span>
                    )) : <span className="text-slate-500 text-sm">No missing skills. Ready for transition!</span>}
                  </div>
                </div>
                {result.adjacentSkills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-warning flex items-center mb-3">
                      <AlertTriangle className="w-4 h-4 mr-2" /> Adjacent Skill Opportunities
                    </h4>
                    <div className="space-y-2">
                      {result.adjacentSkills.map((adj: any, idx: number) => (
                        <div key={idx} className="text-sm p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300">
                          Leverage existing <span className="text-white font-medium">{adj.from}</span> to learn <span className="text-white font-medium">{adj.target}</span>.
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="glass-panel p-6 bg-gradient-to-br from-surface to-slate-800/80 border-primary/30">
               <h3 className="text-lg font-bold text-white mb-2">Transition Recommendation</h3>
               {result.transitionScore >= 70 ? (
                 <p className="text-secondary font-medium">Strong transition candidate — immediate readiness with minor upskilling.</p>
               ) : result.transitionScore >= 40 ? (
                 <p className="text-warning font-medium">Potential transition candidate — requires targeted upskilling path.</p>
               ) : (
                 <p className="text-danger font-medium">Significant skill gap — long-term reskilling required.</p>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
