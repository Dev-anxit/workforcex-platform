import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Search, Filter, Shield, BrainCircuit, ChevronRight } from 'lucide-react';
export default function WorkforceXRay() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmp, setSelectedEmp] = useState<any | null>(null);
  const [prediction, setPrediction] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSelectEmployee = (emp: any) => {
    setSelectedEmp(emp);
    setPrediction(null);
    api.getEmployeePrediction(emp.id).then(res => {
      setPrediction(res);
    }).catch(err => console.error("ML Error", err));
  };
  useEffect(() => {
    api.getEmployees().then(data => {
      setEmployees(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);
  if (loading) return <div className="text-white flex items-center justify-center h-full"><div className="animate-pulse">Loading Workforce Data...</div></div>;
  if (!employees.length) return <div className="text-white">No workforce data available</div>;
  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6 flex gap-6">
      <div className={`flex-1 ${selectedEmp ? 'hidden lg:block lg:w-2/3' : 'w-full'}`}>
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Workforce X-Ray</h1>
          <p className="text-slate-400">Analyze current workforce composition and AI readiness.</p>
        </header>
        <div className="glass-panel overflow-hidden flex flex-col h-[700px]">
          <div className="p-4 border-b border-slate-700/50 flex gap-4 shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search employees by name, role, or department..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white flex items-center hover:bg-slate-700 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
          <div className="overflow-y-auto flex-1">
            <table className="w-full text-left text-sm relative">
              <thead className="bg-slate-800/80 text-slate-400 uppercase text-xs font-semibold sticky top-0 backdrop-blur-md z-10">
                <tr>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Current Role</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">AI Readiness</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-slate-300">
                {filteredEmployees.map(emp => (
                  <tr 
                    key={emp.id} 
                    className={`hover:bg-slate-800/50 transition-colors cursor-pointer ${selectedEmp?.id === emp.id ? 'bg-slate-800/80' : ''}`}
                    onClick={() => handleSelectEmployee(emp)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{emp.name}</div>
                      <div className="text-xs text-slate-500">{emp.id}</div>
                    </td>
                    <td className="px-6 py-4">{emp.role}</td>
                    <td className="px-6 py-4">{emp.department}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-700 rounded-full h-1.5 max-w-[80px]">
                          <div className={`h-1.5 rounded-full ${emp.aiReadiness >= 70 ? 'bg-secondary' : emp.aiReadiness >= 40 ? 'bg-warning' : 'bg-danger'}`} style={{ width: `${emp.aiReadiness}%` }}></div>
                        </div>
                        <span className="text-xs">{emp.aiReadiness}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight className="w-5 h-5 text-slate-500" />
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No employees found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedEmp && (
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="glass-panel p-6 h-[700px] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedEmp.name}</h2>
                <p className="text-sm text-slate-400">{selectedEmp.role} • {selectedEmp.department}</p>
              </div>
              <button onClick={() => setSelectedEmp(null)} className="text-slate-400 hover:text-white lg:hidden">
                Close
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase mb-3 flex items-center">
                  <Shield className="w-4 h-4 mr-2" /> Current Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEmp.skills.map((s: any) => (
                    <span key={s.name} className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-full flex items-center gap-2">
                      {s.name} <span className="text-primary font-bold">{s.level}/5</span>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase mb-3 flex items-center">
                  <BrainCircuit className="w-4 h-4 mr-2" /> AI Exposure & Readiness
                </h3>
                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Transition Readiness</span>
                    <span className="text-white font-bold">{selectedEmp.aiReadiness}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                    <div className={`h-2 rounded-full ${selectedEmp.aiReadiness >= 70 ? 'bg-secondary' : selectedEmp.aiReadiness >= 40 ? 'bg-warning' : 'bg-danger'}`} style={{ width: `${selectedEmp.aiReadiness}%` }}></div>
                  </div>
                  <p className="text-xs text-slate-400">
                    {selectedEmp.aiReadiness >= 70 
                      ? 'Strong foundational skills. High potential for immediate reskilling into AI-augmented roles.'
                      : selectedEmp.aiReadiness >= 40
                      ? 'Moderate transition candidate. Requires targeted upskilling.'
                      : 'Significant skill gap. Long term learning path required.'}
                  </p>
                </div>
              </div>
              {prediction && (
                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase mb-3 flex items-center">
                    <BrainCircuit className="w-4 h-4 mr-2" /> ML Career Predictions
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-primary">Predicted Market Salary</span>
                        <span className="text-lg font-bold text-white">{prediction.predicted_salary ? `${prediction.predicted_salary}L` : 'N/A'}</span>
                      </div>
                      <p className="text-xs text-slate-400">Based on industry standard roles in Data Science Jobs.</p>
                    </div>
                    <div className={`p-4 rounded-lg border ${prediction.jds_prediction === 1 ? 'bg-secondary/10 border-secondary/30' : 'bg-warning/10 border-warning/30'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-bold ${prediction.jds_prediction === 1 ? 'text-secondary' : 'text-warning'}`}>Salary Hike Probability</span>
                        <span className="text-white font-bold">{prediction.jds_prediction === 1 ? 'High' : 'Low'}</span>
                      </div>
                      <p className="text-xs text-slate-300 italic mb-1">"Why?" Explainability:</p>
                      <p className="text-xs text-slate-400">{prediction.jds_explanation}</p>
                    </div>
                    <div className={`p-4 rounded-lg border ${prediction.sds_prediction === 1 ? 'bg-secondary/10 border-secondary/30' : 'bg-slate-800/50 border-slate-700/50'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-bold ${prediction.sds_prediction === 1 ? 'text-secondary' : 'text-slate-300'}`}>Success Probability (SDS)</span>
                        <span className="text-white font-bold">{prediction.sds_prediction === 1 ? 'High' : 'Average'}</span>
                      </div>
                      <p className="text-xs text-slate-300 italic mb-1">"Why?" Explainability:</p>
                      <p className="text-xs text-slate-400">{prediction.sds_explanation}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-[10px] text-slate-500 text-center">
                    *Predictions do not guarantee employee success or career outcomes.
                  </div>
                </div>
              )}
              <div>
                 <button 
                   onClick={() => navigate('/transition', { state: { empId: selectedEmp.id } })}
                   className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/20 flex items-center justify-center">
                    Analyze Transition Pathways <ChevronRight className="w-4 h-4 ml-2" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
