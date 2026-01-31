
import React, { useState, useEffect, useCallback } from 'react';
import { Task, Habit, WeeklyGoal, ViewState, Category } from './types';
import { ICONS, CATEGORIES } from './constants';
import Dashboard from './components/Dashboard';
import TasksView from './components/TasksView';
import HabitsView from './components/HabitsView';
import GoalsView from './components/GoalsView';
import { getProductivityTip } from './services/geminiService';

const App: React.FC = () => {
  // Persistence initialization
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('produtiva_tasks');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Finalizar relatório mensal', category: 'Trabalho', completed: false, dueDate: '2023-12-31', routine: 'Manhã' },
      { id: '2', title: 'Treino de Pernas', category: 'Saúde', completed: true, dueDate: '2023-12-31', routine: 'Tarde' },
    ];
  });

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('produtiva_habits');
    return saved ? JSON.parse(saved) : [
      { id: 'h1', name: 'Beber 2L de água', streak: 5, completedToday: false, history: [] },
      { id: 'h2', name: 'Meditação 10min', streak: 12, completedToday: true, history: [] },
    ];
  });

  const [goals, setGoals] = useState<WeeklyGoal[]>(() => {
    const saved = localStorage.getItem('produtiva_goals');
    return saved ? JSON.parse(saved) : [
      { id: 'g1', title: 'Leitura Semanal', current: 150, target: 300, unit: 'páginas', progress: 50 },
    ];
  });

  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [aiTip, setAiTip] = useState<string>('Carregando insight da IA...');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('produtiva_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('produtiva_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('produtiva_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    const fetchTip = async () => {
      const tip = await getProductivityTip(tasks.filter(t => !t.completed));
      setAiTip(tip);
    };
    fetchTip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = (title: string, category: Category, routine?: 'Manhã' | 'Tarde' | 'Noite') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      category,
      completed: false,
      dueDate: new Date().toISOString().split('T')[0],
      routine
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const newState = !h.completedToday;
        return { 
          ...h, 
          completedToday: newState, 
          streak: newState ? h.streak + 1 : Math.max(0, h.streak - 1) 
        };
      }
      return h;
    }));
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard tasks={tasks} habits={habits} goals={goals} toggleTask={toggleTask} toggleHabit={toggleHabit} aiTip={aiTip} />;
      case 'tasks':
        return <TasksView tasks={tasks} toggleTask={toggleTask} addTask={addTask} />;
      case 'habits':
        return <HabitsView habits={habits} toggleHabit={toggleHabit} />;
      case 'goals':
        return <GoalsView goals={goals} />;
      default:
        return <Dashboard tasks={tasks} habits={habits} goals={goals} toggleTask={toggleTask} toggleHabit={toggleHabit} aiTip={aiTip} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out hidden md:flex flex-col`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
          {isSidebarOpen && <h1 className="font-bold text-xl tracking-tight">Produtiva AI</h1>}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavItem active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} icon={<ICONS.Dashboard />} label="Início" isOpen={isSidebarOpen} />
          <NavItem active={currentView === 'tasks'} onClick={() => setCurrentView('tasks')} icon={<ICONS.Tasks />} label="Tarefas" isOpen={isSidebarOpen} />
          <NavItem active={currentView === 'habits'} onClick={() => setCurrentView('habits')} icon={<ICONS.Habits />} label="Hábitos" isOpen={isSidebarOpen} />
          <NavItem active={currentView === 'goals'} onClick={() => setCurrentView('goals')} icon={<ICONS.Goals />} label="Metas" isOpen={isSidebarOpen} />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            {isSidebarOpen ? 'Recolher' : '→'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Header (Mobile Support) */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-700 capitalize">
            {currentView === 'dashboard' ? 'Bem-vindo de volta' : currentView}
          </h2>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <ICONS.Bell />
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
              <img src="https://picsum.photos/seed/user/200" alt="user" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="p-6 max-w-6xl mx-auto">
          {renderContent()}
        </div>

        {/* Mobile Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 md:hidden flex justify-around py-2 px-4 z-50">
          <MobileNavItem active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} icon={<ICONS.Dashboard />} />
          <MobileNavItem active={currentView === 'tasks'} onClick={() => setCurrentView('tasks')} icon={<ICONS.Tasks />} />
          <MobileNavItem active={currentView === 'habits'} onClick={() => setCurrentView('habits')} icon={<ICONS.Habits />} />
          <MobileNavItem active={currentView === 'goals'} onClick={() => setCurrentView('goals')} icon={<ICONS.Goals />} />
        </nav>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; isOpen: boolean }> = ({ active, onClick, icon, label, isOpen }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
      active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
    }`}
  >
    <span className={`${active ? 'text-indigo-600' : ''}`}>{icon}</span>
    {isOpen && <span className="font-medium">{label}</span>}
  </button>
);

const MobileNavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode }> = ({ active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-xl transition-all ${
      active ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400'
    }`}
  >
    {icon}
  </button>
);

export default App;
