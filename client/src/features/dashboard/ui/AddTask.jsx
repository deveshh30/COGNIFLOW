import React, { useState } from 'react';
import { X, Plus, Calendar, Tag } from 'lucide-react';
import API from '../../../services/api';

const AddTaskModal = ({ isOpen, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({ title: '', category: 'Work', priority: 'Medium' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks/create', formData);
      onRefresh(); 
      onClose();  
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 rounded-2xl z-100 flex items-center justify-center p-4">

      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[5px] transition-opacity" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-md transform-gpu animate-in fade-in zoom-in duration-200">
        <div className="backdrop-blur-[5px] bg-white/[0.05] border border-white/10 rounded-[2.5rem] p-8 shadow-[0_22px_70px_rgba(0,0,0,0.9)]">
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">New Task</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Task Title</label>
              <input
                type="text"
                required
                className="w-full mt-2 bg-white/5 border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                placeholder="What needs to be done?"
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Category</label>
                <select 
                  className="w-full mt-2 bg-white/5 border border-white/5 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-blue-500/50 appearance-none"
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Health">Health</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Priority</label>
                <select 
                  className="w-full mt-2 bg-white/5 border border-white/5 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-blue-500/50 appearance-none"
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              <Plus size={18} />
              <span>Create Task</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;