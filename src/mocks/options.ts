import { v4 as uuid } from 'uuid';

export const mockOptions = [
  {
    id: uuid(),
    option: 'Todos',
  },
  {
    id: uuid(),
    option: 'Normal',
  },
  {
    id: uuid(),
    option: 'Prioridade',
  },
  {
    id: uuid(),
    option: 'Urgente',
  },
];

export const mockOptionsCreate = [
  {
    id: uuid(),
    option: 'Normal',
  },
  {
    id: uuid(),
    option: 'Prioridade',
  },
  {
    id: uuid(),
    option: 'Urgente',
  },
];
