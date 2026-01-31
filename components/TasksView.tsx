
import React, { useState } from 'react';
import { Task, Category } from '../types';
import { ICONS, CATEGORIES } from '../constants';

interface TasksViewProps {
  tasks: Task[];
  toggleTask: (id: string) => void;
  addTask: (title: string, category: Category, routine?: 'Manhã' | 'Tarde' | 'Noite') => void;
}

const TasksView: React.FC<TasksViewProps> = ({ tasks, toggleTask, addTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Trabalho');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask(newTaskTitle, selectedCategory);
    setNewTaskTitle('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      {/* Quick Add */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="O que você precisa fazer?"
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-600 min-w-[140px]"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
            >
              <ICONS.Plus /> Adicionar
            </button>
          </div>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {['all', 'pending', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendentes' : 'Concluídas'}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div key={task.id} className="group flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all">
              <button 
                onClick={() => toggleTask(task.id)}
                className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                  task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-indigo-500'
                }`}
              >
                {task.completed && <ICONS.Check />}
              </button>
              
              <div className="flex-1">
                <h4 className={`font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                    {task.category}
                  </span>
                  {task.routine && (
                    <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-1">
                      <ICONS.Calendar /> {task.routine}
                    </span>
                  )}
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-slate-300 hover:text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-300 mb-4">
              <ICONS.Tasks />
            </div>
            <p className="text-slate-500">Nenhuma tarefa encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksView;
