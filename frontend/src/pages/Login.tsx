import React, { useState, useEffect } from 'react';
import { Lock, Mail, ArrowRight, UserPlus, ArrowLeft, Building2, BadgeCheck, ShieldCheck, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
export default function Login({ onLogin }: { onLogin: (role: 'ADMIN' | 'EMPLOYEE', email: string) => void }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialMode = queryParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'login') {
      if (email === 'admin@workforcex.com' && password === 'admin123') {
        onLogin('ADMIN', email);
      } else if (email === 'employee@workforcex.com' && password === 'employee123') {
        onLogin('EMPLOYEE', email);
      } else {
        setError('Invalid email or password. Use test credentials below.');
      }
    } else {
      if (email.length > 5 && password.length > 3) {
        onLogin('EMPLOYEE', email);
      } else {
        setError('Please enter a valid email and password to sign up.');
      }
    }
  };
  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans"
      style={{
        backgroundImage: 'url(/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-0"></div>
      {}
      <div className="absolute top-0 right-0 p-8 w-full pointer-events-none z-0">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute left-1/4 bottom-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]"></div>
      </div>
      <div className="relative z-10 w-full max-w-md animate-in slide-in-from-bottom-8 fade-in duration-500">
        <Link to="/" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-white transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-2">
            WorkforceX
          </h1>
          <p className="text-slate-400 font-medium">AI Workforce Transformation</p>
        </div>
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-slate-400 text-center mb-6 text-sm">
            {mode === 'login' ? 'Sign in to access your dashboard' : 'Join WorkforceX to future-proof your career'}
          </p>
          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm rounded-xl text-center font-medium animate-in shake">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      required
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Company</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Employee ID</label>
                    <div className="relative">
                      <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                        placeholder="EMP-8492"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                  placeholder="name@company.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>
            {mode === 'signup' && (
              <div className="flex items-start mt-4 mb-2">
                <div className="flex items-center h-5">
                  <input id="terms" type="checkbox" required className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" />
                </div>
                <div className="ml-3 text-xs text-slate-400 leading-tight">
                  <label htmlFor="terms">I agree to the <a href="#" className="text-blue-400 hover:underline">Terms of Service</a> and explicitly consent to the <a href="#" className="text-blue-400 hover:underline">Data Privacy Policy</a> for processing my workforce analytics data.</label>
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center hover:-translate-y-0.5 mt-2"
            >
              {mode === 'login' ? (
                <>Sign In <ArrowRight className="w-5 h-5 ml-2" /></>
              ) : (
                <>Create Secure Account <UserPlus className="w-5 h-5 ml-2" /></>
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
          {mode === 'login' && (
            <div className="mt-8 text-center border-t border-slate-800 pt-6">
              <p className="text-xs text-slate-500 mb-3 font-bold tracking-wider uppercase">Demo Credentials</p>
              <div className="text-xs text-slate-400 flex justify-center gap-3">
                <div className="text-left bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <span className="text-blue-400 font-bold mb-1 block">Admin User</span>
                  admin@workforcex.com<br/>admin123
                </div>
                <div className="text-left bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <span className="text-purple-400 font-bold mb-1 block">Employee User</span>
                  employee@workforcex.com<br/>employee123
                </div>
              </div>
            </div>
          )}
          {}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> SOC-2 Compliant
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Lock className="w-4 h-4 text-blue-500" /> End-to-End Encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
