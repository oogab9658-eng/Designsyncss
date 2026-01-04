import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { Users, CheckSquare, Clock, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({ clients: 0, tasks: 0, pending: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cRes, tRes] = await Promise.all([
          API.get('/clients'),
          API.get('/tasks')
        ]);
        setStats({
          clients: cRes.data.length,
          tasks: tRes.data.length,
          pending: tRes.data.filter(t => t.status !== 'Completed').length
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const cards = [
    { title: 'Total Clients', val: stats.clients, icon: <Users />, color: 'bg-blue-500' },
    { title: 'Active Tasks', val: stats.pending, icon: <Clock />, color: 'bg-yellow-500' },
    { title: 'Completed Tasks', val: stats.tasks - stats.pending, icon: <CheckSquare />, color: 'bg-green-500' },
    { title: 'Conversion Rate', val: '12%', icon: <TrendingUp />, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-4 pt-20">
      <h1 className="text-2xl font-bold mb-6">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                <p className="text-2xl font-bold">{card.val}</p>
              </div>
              <div className={`${card.color} text-white p-3 rounded-lg`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
