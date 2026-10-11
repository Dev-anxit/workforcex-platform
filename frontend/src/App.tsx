import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, BrainCircuit, UserCog, Globe, Briefcase, Target, Compass, BookOpen, Award, ShieldCheck, User, LogOut, Zap } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import WorkforceXRay from './pages/WorkforceXRay';
import SkillTransformation from './pages/SkillTransformation';
import TransitionGraph from './pages/TransitionGraph';
import Simulator from './pages/Simulator';
import RoleIntelligence from './pages/RoleIntelligence';
import MarketIntelligence from './pages/MarketIntelligence';
import CareerTwinDashboard from './pages/CareerTwinDashboard';
import { EmployeeDashboard, PersonalSkills, CareerPaths, EmployeeSkillGaps, LearningPath } from './pages/EmployeeViews';
import CareerWhatIfSimulator from './pages/CareerWhatIfSimulator';
import FloatingAssistant from './components/FloatingAssistant';
import Login from './pages/Login';
const Sidebar = ({ mode, email, onLogout }: { mode: 'ADMIN' | 'EMPLOYEE', email: string, onLogout: () => void }) => {
  const location = useLocation();
  const adminNav = [
    { name: 'Executive Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Workforce Analytics', path: '/admin/analytics', icon: Globe },
    { name: 'Skill Gaps', path: '/admin/skills', icon: Target },
    { name: 'Role Intelligence', path: '/admin/roles', icon: UserCog },
    { name: 'Simulator', path: '/admin/simulator', icon: BrainCircuit },
    { name: 'Reskilling', path: '/admin/reskilling', icon: Activity },
    { name: 'Hiring Decisions', path: '/admin/hiring', icon: Users },
  ];
  const employeeNav = [
    { name: 'AI Career Twin', path: '/employee/twin', icon: Zap },
    { name: 'My Dashboard', path: '/employee', icon: LayoutDashboard },
    { name: 'Personal Skills', path: '/employee/skills', icon: Award },
    { name: 'Career Paths', path: '/employee/career', icon: Compass },
    { name: 'Skill Gaps', path: '/employee/gaps', icon: Target },
    { name: 'Learning Path', path: '/employee/learning', icon: BookOpen },
    { name: 'Future Roles', path: '/employee/roles', icon: Briefcase },
  ];
  const navItems = mode === 'ADMIN' ? adminNav : employeeNav;
  return (
    <div className="w-64 bg-surface border-r border-slate-700/50 flex flex-col h-screen fixed z-20 shadow-2xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          WorkforceX
        </h1>
        <p className="text-xs text-muted mt-1 font-medium">AI Workforce Transformation</p>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto pb-6 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === (mode === 'ADMIN' ? '/admin' : '/employee'));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                isActive 
                  ? 'text-white font-semibold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isActive && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/5 rounded-xl border border-blue-500/20" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                </>
              )}
              {!isActive && (
                <div className="absolute inset-0 bg-slate-800/0 group-hover:bg-slate-800/50 rounded-xl transition-colors duration-300" />
              )}
              <Icon className={`w-5 h-5 mr-3 relative z-10 transition-transform duration-300 ${isActive ? 'text-blue-400 scale-110' : 'group-hover:text-blue-400 group-hover:scale-110'}`} />
              <span className="text-sm relative z-10 tracking-wide">{item.name}</span>
              {item.name === 'AI Career Twin' && (
                <span className="ml-auto flex h-2 w-2 relative z-10">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,1)]"></span>
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mr-3">
              {mode === 'ADMIN' ? <ShieldCheck className="w-4 h-4 text-primary" /> : <User className="w-4 h-4 text-secondary" />}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{mode === 'ADMIN' ? 'Admin User' : 'Employee'}</p>
              <p className="text-xs text-slate-500 truncate">{email}</p>
            </div>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </button>
      </div>
    </div>
  );
};
import LandingPage from './pages/LandingPage';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mode, setMode] = useState<'ADMIN' | 'EMPLOYEE'>('ADMIN');
  const [email, setEmail] = useState('');
  const handleLogin = (role: 'ADMIN' | 'EMPLOYEE', userEmail: string) => {
    setMode(role);
    setEmail(userEmail);
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
  };
  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <div 
          className="flex min-h-screen relative overflow-hidden bg-slate-950"
          style={{
            backgroundImage: 'url(/bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {}
          <div className="absolute inset-0 bg-slate-950/70 z-0 pointer-events-none backdrop-blur-[2px]"></div>
          {}
          <div className="absolute top-0 left-1/4 w-full h-full pointer-events-none z-0 overflow-hidden mix-blend-screen">
            <div className="absolute -right-1/4 -top-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute left-1/4 bottom-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px]"></div>
          </div>
          <Sidebar mode={mode} email={email} onLogout={handleLogout} />
          <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen relative z-10 custom-scrollbar">
            <div className="relative z-10">
              <Routes>
                {}
                <Route path="/" element={<Navigate to={mode === 'ADMIN' ? '/admin' : '/employee/twin'} replace />} />
              {}
              <Route path="/admin" element={mode === 'ADMIN' ? <Dashboard /> : <Navigate to="/employee/twin" />} />
              <Route path="/admin/analytics" element={mode === 'ADMIN' ? <MarketIntelligence /> : <Navigate to="/employee/twin" />} />
              <Route path="/admin/skills" element={mode === 'ADMIN' ? <SkillTransformation /> : <Navigate to="/employee/twin" />} />
              <Route path="/admin/roles" element={mode === 'ADMIN' ? <RoleIntelligence /> : <Navigate to="/employee/twin" />} />
              <Route path="/admin/simulator" element={mode === 'ADMIN' ? <Simulator /> : <Navigate to="/employee/twin" />} />
              <Route path="/admin/reskilling" element={mode === 'ADMIN' ? <TransitionGraph /> : <Navigate to="/employee/twin" />} />
              <Route path="/admin/hiring" element={mode === 'ADMIN' ? <WorkforceXRay /> : <Navigate to="/employee/twin" />} />
              {}
              <Route path="/employee" element={mode === 'EMPLOYEE' ? <EmployeeDashboard /> : <Navigate to="/admin" />} />
              <Route path="/employee/twin" element={mode === 'EMPLOYEE' ? <CareerTwinDashboard /> : <Navigate to="/admin" />} />
              <Route path="/employee/skills" element={mode === 'EMPLOYEE' ? <PersonalSkills /> : <Navigate to="/admin" />} />
              <Route path="/employee/career" element={mode === 'EMPLOYEE' ? <CareerPaths /> : <Navigate to="/admin" />} />
              <Route path="/employee/gaps" element={mode === 'EMPLOYEE' ? <EmployeeSkillGaps /> : <Navigate to="/admin" />} />
              <Route path="/employee/learning" element={mode === 'EMPLOYEE' ? <LearningPath /> : <Navigate to="/admin" />} />
              <Route path="/employee/roles" element={mode === 'EMPLOYEE' ? <CareerWhatIfSimulator /> : <Navigate to="/admin" />} />
              {}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
        {}
        {mode === 'EMPLOYEE' && <FloatingAssistant />}
      </div>
      )}
    </Router>
  );
}
export default App;
