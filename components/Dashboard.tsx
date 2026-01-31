
import React from 'react';
import { Task, Habit, WeeklyGoal } from '../types';
import { ICONS } from '../constants';

interface DashboardProps {
  tasks: Task[];
  habits: Habit[];
  goals: WeeklyGoal[];
  toggleTask: (id: string) => void;
  toggleHabit: (id: string) => void;
  aiTip: string;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, habits, goals, toggleTask, toggleHabit, aiTip }) => {
  const completedTasksCount = tasks.filter(t => t.completed).length;
  const totalTasksCount = tasks.length;
  const completionPercentage = totalTasksCount ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  const todayTasks = tasks.filter(t => !t.completed).slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* AI Header Insight */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <ICONS.Sparkles />
            <span className="text-sm font-medium opacity-90 uppercase tracking-wider">Insight da IA</span>
          </div>
          <p className="text-xl md:text-2xl font-light leading-relaxed">
            "{aiTip}"
          </p>
        </div>
        {/* Abstract shapes for visual interest */}
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-5%] w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Tasks & Focus */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Minha Rotina</h3>
              <span className="text-sm text-slate-500">{completedTasksCount}/{totalTasksCount} concluídas</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Manhã', 'Tarde'].map(period => (
                <div key={period} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    {period === 'Manhã' ? '☀️' : '⛅'} {period}
                  </h4>
                  <div className="space-y-3">
                    {tasks.filter(t => t.routine === period).length > 0 ? (
                      tasks.filter(t => t.routine === period).map(task => (
                        <div key={task.id} className="flex items-center gap-3">
                          <button 
                            onClick={() => toggleTask(task.id)}
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-indigo-500'
                            }`}
                          >
                            {task.completed && <ICONS.Check />}
                          </button>
                          <span className={`text-sm ${task.completed ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                            {task.title}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">Nenhuma tarefa para este período.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Metas Semanais</h3>
            <div className="space-y-4">
              {goals.map(goal => (
                <div key={goal.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-700">{goal.title}</span>
                    <span className="text-sm text-indigo-600 font-bold">{goal.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-slate-400">
                    {goal.current} de {goal.target} {goal.unit}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Habits & Quick Actions */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Hábitos Diários</h3>
            <div className="space-y-6">
              {habits.map(habit => (
                <div key={habit.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${habit.completedToday ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                      <ICONS.Habits />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 text-sm">{habit.name}</p>
                      <p className="text-xs text-slate-400">🔥 {habit.streak} dias de sequência</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleHabit(habit.id)}
                    className={`p-2 rounded-xl transition-all ${
                      habit.completedToday ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    <ICONS.Check />
                  </button>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-3 px-4 bg-slate-50 text-slate-500 rounded-2xl text-sm font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 border border-dashed border-slate-200">
              <ICONS.Plus /> Adicionar Hábito
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
