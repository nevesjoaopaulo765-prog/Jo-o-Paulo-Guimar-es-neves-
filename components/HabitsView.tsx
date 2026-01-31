
import React from 'react';
import { Habit } from '../types';
import { ICONS } from '../constants';

interface HabitsViewProps {
  habits: Habit[];
  toggleHabit: (id: string) => void;
}

const HabitsView: React.FC<HabitsViewProps> = ({ habits, toggleHabit }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {habits.map(habit => (
          <div key={habit.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-48 relative overflow-hidden group">
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{habit.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-orange-500 flex items-center gap-1">
                    🔥 {habit.streak} dias
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-xs text-slate-500">Meta: Diária</span>
                </div>
              </div>
              <button 
                onClick={() => toggleHabit(habit.id)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  habit.completedToday 
                    ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-100 scale-105' 
                    : 'bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                {habit.completedToday ? <ICONS.Check /> : <ICONS.Plus />}
              </button>
            </div>

            <div className="relative z-10">
              <div className="flex gap-1.5 mt-4">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 h-1.5 rounded-full ${
                      i < 5 ? 'bg-emerald-400' : 'bg-slate-100'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-bold">Últimos 7 dias</p>
            </div>

            {/* Background design element */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-50 rounded-full group-hover:bg-indigo-50 transition-colors -z-0"></div>
          </div>
        ))}

        <button className="bg-white border-2 border-dashed border-slate-200 p-6 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all gap-2 group h-48">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
            <ICONS.Plus />
          </div>
          <span className="font-semibold">Novo Hábito</span>
        </button>
      </div>
    </div>
  );
};

export default HabitsView;
