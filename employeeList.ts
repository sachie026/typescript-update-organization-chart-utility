import { Employee } from "./shared";

export const sophie: Employee = {
  uniqueID: 15,
  name: "Sophie Turner",
  subordinates: [],
};

export const gary: Employee = {
  uniqueID: 14,
  name: "Gary Styles",
  subordinates: [],
};

export const george: Employee = {
  uniqueID: 13,
  name: "George Carrey",
  subordinates: [],
};

export const thomas: Employee = {
  uniqueID: 12,
  name: "Thomas Brown",
  subordinates: [],
};

export const harry: Employee = {
  uniqueID: 11,
  name: "Harry TObs",
  subordinates: [thomas],
};

export const will: Employee = {
  uniqueID: 10,
  name: "Will Turner",
  subordinates: [],
};

export const tina: Employee = {
  uniqueID: 9,
  name: "Tine Teff",
  subordinates: [will],
};

export const bob: Employee = {
  uniqueID: 8,
  name: "Bob Saget",
  subordinates: [tina],
};

export const mary: Employee = {
  uniqueID: 7,
  name: "Mary Blue",
  subordinates: [],
};

export const cassandra: Employee = {
  uniqueID: 6,
  name: "Cassandra Reynolds",
  subordinates: [bob, mary],
};

export const sarah: Employee = {
  uniqueID: 2,
  name: "Sarah Donald",
  subordinates: [cassandra],
};

export const tyler: Employee = {
  uniqueID: 3,
  name: "Tyler Simpson",
  subordinates: [harry, george, gary],
};

export const bruce: Employee = {
  uniqueID: 4,
  name: "Bruce Willis",
  subordinates: [],
};

export const georgina: Employee = {
  uniqueID: 5,
  name: "Georgina Flangy",
  subordinates: [sophie],
};

export const inputCEO: Employee = {
  uniqueID: 1,
  name: "Mark Zuckerberg",
  subordinates: [sarah, tyler, bruce, georgina],
};
