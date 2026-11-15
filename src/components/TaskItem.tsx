import { Check, Trash2 } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import { categoryLabels, priorityLabels, type Category, type Priority, type Task } from '../types'

const categoryStyles: Record<Category, string> = {
  work: 'bg-blue-50 text-blue-700 ring-blue-100 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/20',
  personal: 'bg-violet-50 text-violet-700 ring-violet-100 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-400/20',
  study: 'bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-400/10 dark:text-amber-200 dark:ring-amber-400/20',
}

const priorityStyles: Record<Priority, string> = {
  high: 'bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300',
  medium: 'bg-orange-50 text-orange-700 dark:bg-orange-400/10 dark:text-orange-300',
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
}

interface TaskItemProps {
  task: Task
  isEditing: boolean
  editingText: string
  onToggle: () => void
  onStartEdit: () => void
  onEditChange: (value: string) => void
  onSaveEdit: () => void
  onEditKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  onDelete: () => void
}

export function TaskItem({ task, isEditing, editingText, onToggle, onStartEdit, onEditChange, onSaveEdit, onEditKeyDown, onDelete }: TaskItemProps) {
  return (
    <article className="group flex items-center gap-3 rounded-xl border border-transparent bg-white px-4 py-3.5 shadow-sm transition hover:border-slate-200 dark:bg-[#1a1a1d] dark:hover:border-slate-800">
      <button type="button" role="checkbox" aria-checked={task.completed} aria-label={`Отметить «${task.text}» ${task.completed ? 'активной' : 'выполненной'}`} onClick={onToggle} className={`grid size-5 shrink-0 place-items-center rounded-full border transition focus:outline-none focus:ring-2 focus:ring-slate-400 ${task.completed ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900' : 'border-slate-300 dark:border-slate-600'}`}>
        {task.completed && <Check size={13} strokeWidth={3} />}
      </button>
      <div className="min-w-0 flex-1">
        {isEditing ? <input autoFocus aria-label={`Редактировать «${task.text}»`} value={editingText} onChange={(event) => onEditChange(event.target.value)} onBlur={onSaveEdit} onKeyDown={onEditKeyDown} className="w-full bg-transparent font-medium outline-none ring-0" /> : <button type="button" onDoubleClick={onStartEdit} className={`block w-full whitespace-pre-wrap break-words text-left font-medium focus:outline-none focus:ring-2 focus:ring-slate-400 ${task.completed ? 'text-slate-400 line-through dark:text-slate-500' : ''}`}>{task.text}</button>}
        <div className="mt-1.5 flex flex-wrap gap-1.5"><span className={`rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${categoryStyles[task.category]}`}>{categoryLabels[task.category]}</span><span className={`rounded-md px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}>{priorityLabels[task.priority]}</span></div>
      </div>
      <button type="button" onClick={onDelete} aria-label={`Удалить «${task.text}»`} className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-400 opacity-100 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-slate-400 sm:opacity-0 sm:group-hover:opacity-100 dark:hover:bg-rose-400/10"><Trash2 size={16} /></button>
    </article>
  )
}
