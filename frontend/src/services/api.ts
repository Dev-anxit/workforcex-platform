import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5001/api' : '/api');
export const api = {
  getEmployees: () => axios.get(`${API_URL}/employees`).then(res => res.data),
  getEmployee: (id: string) => axios.get(`${API_URL}/employees/${id}`).then(res => res.data),
  getEmployeePrediction: (id: string) => axios.get(`${API_URL}/employees/${id}/predict`).then(res => res.data),
  getRoles: () => axios.get(`${API_URL}/roles`).then(res => res.data),
  getRole: (id: string) => axios.get(`${API_URL}/roles/${id}`).then(res => res.data),
  getSkills: () => axios.get(`${API_URL}/skills`).then(res => res.data),
  analyzeTransition: (employeeId: string, targetRole: string) => 
    axios.post(`${API_URL}/transition/analyze`, { employeeId, targetRole }).then(res => res.data),
  runSimulator: (requiredRoles: number, strategy: string) => 
    axios.post(`${API_URL}/simulator/run`, { requiredRoles, strategy }).then(res => res.data),
  getSummary: () => axios.get(`${API_URL}/dashboard/summary`).then(res => res.data),
  getMarketIntelligence: () => axios.get(`${API_URL}/market-intelligence`).then(res => res.data),
};
