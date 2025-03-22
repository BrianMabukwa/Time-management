import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Task {
  id: number | null;
  user: number;
  name: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  hours: number;
}
