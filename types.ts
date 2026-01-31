
export type Category = 'Trabalho' | 'Pessoal' | 'Saúde' | 'Estudos' | 'Finanças' | 'Outros';

export interface Task {
  id: string;
  title: string;
  category: Category;
  completed: boolean;
  dueDate: string;
  reminder?: string;
  routine?: 'Manhã' | 'Tarde' | 'Noite';
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
  history: string[]; // dates of completion
}

export interface WeeklyGoal {
  id: string;
  title: string;
  progress: number; // 0 to 100
  target: number;
  current: number;
  unit: string;
}

export type ViewState = 'dashboard' | 'tasks' | 'habits' | 'goals';
