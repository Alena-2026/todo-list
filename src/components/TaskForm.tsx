import { Plus } from 'lucide-react'
import type { FormEvent } from 'react'
import { categoryLabels, priorityLabels, type Category, type Priority } from '../types'

interface TaskFormProps {
  text: string
  category: Category
  priority: Priority
  hasError: boolean
  onTextChange: (value: string) => void
  onCategoryChange: (value: Category) => void
  onPriorityChange: (value: Priority) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function TaskForm({ text, category, priority, hasError, onTextChange, onCategoryChange, onPriorityChange, onSubmit }: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#1a1a1d] sm:p-5">
      <label className="sr-only" htmlFor="task-text">Текст задачи</label>
      <input id="task-text" aria-label="Текст задачи" aria-invalid={hasError} aria-describedby={hasError ? 'task-error' : undefined} value={text} onChange={(event) => onTextChange(event.target.value)} placeholder="Что нужно сделать?" className={`w-full bg-transparent text-lg font-medium placeholder:text-slate-400 focus:outline-none dark:placeholder:text-slate-600 ${hasError ? 'border-b border-rose-500 pb-1 text-rose-700 placeholder:text-rose-300 dark:text-rose-300' : 'mb-4'}`} />
      {hasError && <p id="task-error" className="mb-3 mt-1 text-sm text-rose-600 dark:text-rose-300">Введите текст задачи.</p>}
      <div className="flex flex-col gap-3 sm:flex-row">
        <select aria-label="Категория" value={category} onChange={(event) => onCategoryChange(event.target.value as Category)} className="h-10 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:bg-[#222225]">
          {Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <select aria-label="Приоритет" value={priority} onChange={(event) => onPriorityChange(event.target.value as Priority)} className="h-10 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:bg-[#222225]">
          {Object.entries(priorityLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <button type="submit" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"><Plus size={16} />Добавить задачу</button>
      </div>
    </form>
  )
}
