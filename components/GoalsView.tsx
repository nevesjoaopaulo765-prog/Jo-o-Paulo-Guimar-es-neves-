
import React from 'react';
import { WeeklyGoal } from '../types';
import { ICONS } from '../constants';

interface GoalsViewProps {
  goals: WeeklyGoal[];
}

const GoalsView: React.FC<GoalsViewProps> = ({ goals }) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 gap-6">
        {goals.map(goal => (
          <div key={goal.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
              {/* Circular Progress (Visual only for aesthetics) */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-100"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * goal.progress) / 100}
                    strokeLinecap="round"
                    className="text-indigo-600 transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-800">
                  {goal.progress}%
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-slate-800">{goal.title}</h3>
                  <button className="text-slate-400 hover:text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                  </button>
                </div>
                <p className="text-slate-500 mb-6 font-light">Meta de curto prazo focada em consistência e resultados semanais.</p>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-400 block uppercase font-bold">Progresso</span>
                    <span className="text-slate-700 font-bold">{goal.current} {goal.unit}</span>
                  </div>
                  <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-400 block uppercase font-bold">Objetivo</span>
                    <span className="text-slate-700 font-bold">{goal.target} {goal.unit}</span>
                  </div>
                  <button className="ml-auto bg-indigo-50 text-indigo-700 px-6 py-2.5 rounded-2xl font-bold hover:bg-indigo-100 transition-all flex items-center gap-2">
                    Atualizar Progresso
                  </button>
                </div>
              </div>
            </div>
            {/* Background design */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/30 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-100/40 transition-colors"></div>
          </div>
        ))}

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl text-white flex items-center justify-between">
          <div>
            <h4 className="text-xl font-bold mb-2">Pronto para um novo desafio?</h4>
            <p className="text-slate-400 text-sm max-w-sm">Estabelecer metas claras é o primeiro passo para transformar o invisível no visível.</p>
          </div>
          <button className="bg-white text-slate-900 px-8 py-3 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-xl shadow-black/20">
            Criar Meta
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalsView;
