import { Person } from './person.model';

export const MOCKPEOPLE: Person[] = [
  {
    id: '1',
    name: 'Kendrick Mausisa',
    age: 22,
    address: 'Rexburg, Idaho',
    phone: '123-456-7890',
    email: 'mau20003@byui.edu',
    notes: 'Random notes',
    household: [
      {
        id: '2',
      },
      {
        id: '3',
      },
      {
        id: '4',
      },
      {
        id: '5',
      },
    ],
  },
  {
    id: '2',
    name: 'Kevyn Mausisa',
    age: 21,
    address: 'Provo, Utah',
    phone: '123-456-7891',
    email: 'mau20002@byui.edu',
    notes: 'Random notes 2',
    household: null,
  },
  {
    id: '3',
    name: 'Rhianne Mausisa',
    age: 15,
    address: 'San Francisco, CA',
    phone: '098-765-4321',
    email: 'mau20001@byui.edu',
    notes: 'Random notes 3',
    household: null,
  },
  {
    id: '4',
    name: 'Richyl Mausisa',
    age: 13,
    address: 'San Francisco, CA',
    phone: '998-765-4321',
    email: 'mau20000@byui.edu',
    notes: 'Random notes 4',
    household: null,
  },
];
