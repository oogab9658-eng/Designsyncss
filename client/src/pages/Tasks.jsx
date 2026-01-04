import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { Plus, CheckCircle2, Clock } from 'lucide-react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', client: '', status: 'To Do' });

  const fetchData = async () => {
    const [tRes, cRes] = await Promise.all([API.get('/tasks'), API.get('/clients')]);
    setTasks(tRes.data);
    setClients(cRes.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/tasks', formData);
    setShowModal(false);
    fetchData();
  };

  const updateStatus = async (id, status) => {
    await API.patch(`/tasks/${id}`, { status });
    fetchData();
  };

  return (
    <div className="p-4 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Board</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
        >
          <Plus size={20} /> New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['To Do', 'In Progress', 'Completed'].map(col => (
          <div key={col} className="bg-gray-100 p-4 rounded-xl min-h-[500px]">
            <h3 className="font-bold mb-4 flex items-center justify-between">
              {col}
              <span className="bg-gray-200 px-2 rounded text-xs">{tasks.filter(t => t.status === col).length}</span>
            </h3>
            <div className="space-y-3">
              {tasks.filter(t => t.status === col).map(task => (
                <div key={task._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{task.client?.name || 'No Client'}</span>
                    <div className="flex gap-2">
                      {col !== 'Completed' && (
                        <button onClick={() => updateStatus(task._id, col === 'To Do' ? 'In Progress' : 'Completed')} className="text-gray-400 hover:text-green-500">
                          <CheckCircle2 size={16}/>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Title" className="w-full border p-2 rounded" required onChange={e => setFormData({...formData, title: e.target.value})} />
              <textarea placeholder="Description" className="w-full border p-2 rounded" onChange={e => setFormData({...formData, description: e.target.value})} />
              <select className="w-full border p-2 rounded" required onChange={e => setFormData({...formData, client: e.target.value})}>
                <option value="">Link to Client</option>
                {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 p-2 rounded">Cancel</button>
                <button type="submit" className="flex-1 bg-primary text-white p-2 rounded">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
