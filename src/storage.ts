import type { Task } from './types'

export const TASKS_KEY = 'minimal-todo.tasks'
export const THEME_KEY = 'minimal-todo.theme'

export const isTask = (value: unknown): value is Task => {
  if (typeof value !== 'object' || value === null) return false
  const task = value as Record<string, unknown>
  return typeof task.id === 'string'
    && typeof task.text === 'string'
    && ['work', 'personal', 'study'].includes(String(task.category))
    && ['high', 'medium', 'low'].includes(String(task.priority))
    && typeof task.completed === 'boolean'
}

export function parseTaskBackup(serialized: string): Task[] | null {
  try {
    const parsed: unknown = JSON.parse(serialized)
    return Array.isArray(parsed) && parsed.every(isTask) ? parsed : null
  } catch {
    return null
  }
}

export function loadTasks(): Task[] {
  return parseTaskBackup(localStorage.getItem(TASKS_KEY) ?? '[]') ?? []
}

export function loadTheme(): 'light' | 'dark' {
  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
}
