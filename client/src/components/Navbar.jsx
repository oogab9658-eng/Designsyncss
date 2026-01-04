import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Users, CheckSquare, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link to="/" className="text-xl font-bold flex items-center gap-2 text-primary">
              <span className="bg-primary text-white p-1 rounded">DS</span>
              Designsyncs CRM
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-primary">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/clients" className="flex items-center gap-1 text-gray-600 hover:text-primary">
              <Users size={18} /> Clients
            </Link>
            <Link to="/tasks" className="flex items-center gap-1 text-gray-600 hover:text-primary">
              <CheckSquare size={18} /> Tasks
            </Link>
            <button 
              onClick={() => { logout(); navigate('/login'); }}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
