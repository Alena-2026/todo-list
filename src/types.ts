export type Category = 'work' | 'personal' | 'study'
export type Priority = 'high' | 'medium' | 'low'
export type StatusFilter = 'all' | 'active' | 'completed'

export interface Task {
  id: string
  text: string
  category: Category
  priority: Priority
  completed: boolean
}

export const categoryLabels: Record<Category, string> = {
  work: 'Работа',
  personal: 'Личное',
  study: 'Учёба',
}

export const priorityLabels: Record<Priority, string> = {
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
}
