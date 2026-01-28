export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  github?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'Tools';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

// Network Topology Types
export type NodeType = 'PC' | 'SWITCH' | 'ROUTER';

export interface Node {
  id: string;
  type: NodeType;
  name: string;
  ip: string;
  x: number;
  y: number;
  connections: string[];
}

export interface Packet {
  id: string;
  path: string[]; // Array of node IDs
  currentIndex: number;
  isReturning: boolean;
  status: 'SENDING' | 'RECEIVED' | 'ACKNOWLEDGING';
}

export interface Connection {
  from: string;
  to: string;
}