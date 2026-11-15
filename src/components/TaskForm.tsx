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
    <form onSubmit={onSubmit} className="mb-6 rounded-2xl border border-[#EDEAFF] bg-white p-4 shadow-[0_12px_32px_rgba(86,70,200,0.10)] dark:border-[#3B3367] dark:bg-[#231E3D] sm:p-5">
      <label className="sr-only" htmlFor="task-text">Текст задачи</label>
      <input id="task-text" aria-label="Текст задачи" aria-invalid={hasError} aria-describedby={hasError ? 'task-error' : undefined} value={text} onChange={(event) => onTextChange(event.target.value)} placeholder="Что нужно сделать?" className={`w-full rounded-xl bg-[#F8F7FF] px-3 py-3 text-lg font-medium placeholder:text-[#928AAE] transition focus:outline-none focus:ring-2 focus:ring-[#A99AF5] dark:bg-[#1A1630] dark:placeholder:text-[#8177A5] ${hasError ? 'border border-rose-400 text-rose-700 placeholder:text-rose-300 dark:text-rose-300' : 'mb-4 border border-transparent'}`} />
      {hasError && <p id="task-error" className="mb-3 mt-1 text-sm text-rose-600 dark:text-rose-300">Введите текст задачи.</p>}
      <div className="flex flex-col gap-3 sm:flex-row">
        <select aria-label="Категория" value={category} onChange={(event) => onCategoryChange(event.target.value as Category)} className="h-10 flex-1 rounded-lg border border-[#E2DEFA] bg-[#F8F7FF] px-3 text-sm outline-none transition focus:border-[#A99AF5] focus:ring-2 focus:ring-[#EDEAFF] dark:border-[#4A416F] dark:bg-[#1A1630] dark:focus:border-[#A99AF5] dark:focus:ring-[#3B3367]">
          {Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <select aria-label="Приоритет" value={priority} onChange={(event) => onPriorityChange(event.target.value as Priority)} className="h-10 flex-1 rounded-lg border border-[#E2DEFA] bg-[#F8F7FF] px-3 text-sm outline-none transition focus:border-[#A99AF5] focus:ring-2 focus:ring-[#EDEAFF] dark:border-[#4A416F] dark:bg-[#1A1630] dark:focus:border-[#A99AF5] dark:focus:ring-[#3B3367]">
          {Object.entries(priorityLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <button type="submit" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#5646C8] px-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#4939B2] active:translate-y-0 active:bg-[#3F319D] focus:outline-none focus:ring-2 focus:ring-[#A99AF5] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#7869D9] dark:hover:bg-[#8F82E8] dark:focus:ring-offset-[#231E3D]"><Plus size={16} />Добавить задачу</button>
      </div>
    </form>
  )
}
