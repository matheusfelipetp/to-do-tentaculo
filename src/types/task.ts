export type TaskProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'Normal' | 'Prioridade' | 'Urgente';
  isFinished: boolean;
};
