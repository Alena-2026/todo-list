import { Check, Trash2 } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import { categoryLabels, priorityLabels, type Category, type Priority, type Task } from '../types'

const categoryStyles: Record<Category, string> = {
  work: 'bg-sky-50 text-sky-700 ring-sky-100 dark:bg-sky-400/15 dark:text-sky-200 dark:ring-sky-400/20',
  personal: 'bg-[#EDEAFF] text-[#5646C8] ring-[#DDD7FF] dark:bg-[#5646C8]/25 dark:text-[#D8D1FF] dark:ring-[#7869D9]/30',
  study: 'bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-400/15 dark:text-emerald-200 dark:ring-emerald-400/20',
}

const priorityStyles: Record<Priority, string> = {
  high: 'bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300',
  medium: 'bg-orange-50 text-orange-700 dark:bg-orange-400/10 dark:text-orange-300',
  low: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200',
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
    <article className="group flex items-center gap-3 rounded-xl border border-[#EDEAFF] bg-white px-4 py-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#D3CBFC] hover:shadow-[0_10px_24px_rgba(86,70,200,0.09)] dark:border-[#3B3367] dark:bg-[#231E3D] dark:hover:border-[#5A4E91]">
      <button type="button" role="checkbox" aria-checked={task.completed} aria-label={`Отметить «${task.text}» ${task.completed ? 'активной' : 'выполненной'}`} onClick={onToggle} className={`grid size-5 shrink-0 place-items-center rounded-full border transition focus:outline-none focus:ring-2 focus:ring-[#A99AF5] ${task.completed ? 'border-[#5646C8] bg-[#5646C8] text-white dark:border-[#A99AF5] dark:bg-[#A99AF5] dark:text-[#241E42]' : 'border-[#B7AFD8] hover:border-[#7869D9] dark:border-[#70658F] dark:hover:border-[#A99AF5]'}`}>
        {task.completed && <Check size={13} strokeWidth={3} />}
      </button>
      <div className="min-w-0 flex-1">
        {isEditing ? <input autoFocus aria-label={`Редактировать «${task.text}»`} value={editingText} onChange={(event) => onEditChange(event.target.value)} onBlur={onSaveEdit} onKeyDown={onEditKeyDown} className="w-full rounded bg-[#F8F7FF] px-1 font-medium outline-none ring-2 ring-[#A99AF5] dark:bg-[#1A1630]" /> : <button type="button" onDoubleClick={onStartEdit} className={`block w-full whitespace-pre-wrap break-words text-left font-medium focus:outline-none focus:ring-2 focus:ring-[#A99AF5] ${task.completed ? 'text-[#928AAE] line-through dark:text-[#9188B2]' : ''}`}>{task.text}</button>}
        <div className="mt-1.5 flex flex-wrap gap-1.5"><span className={`rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${categoryStyles[task.category]}`}>{categoryLabels[task.category]}</span><span className={`rounded-md px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}>{priorityLabels[task.priority]}</span></div>
      </div>
      <button type="button" onClick={onDelete} aria-label={`Удалить «${task.text}»`} className="grid size-8 shrink-0 place-items-center rounded-lg text-[#928AAE] opacity-100 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-[#A99AF5] sm:opacity-0 sm:group-hover:opacity-100 dark:hover:bg-rose-400/10"><Trash2 size={16} /></button>
    </article>
  )
}
