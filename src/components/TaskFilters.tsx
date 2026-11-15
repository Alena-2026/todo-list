import { Search } from 'lucide-react'
import { categoryLabels, type Category, type StatusFilter } from '../types'

interface TaskFiltersProps {
  search: string
  status: StatusFilter
  category: 'all' | Category
  onSearchChange: (value: string) => void
  onStatusChange: (value: StatusFilter) => void
  onCategoryChange: (value: 'all' | Category) => void
}

export function TaskFilters({ search, status, category, onSearchChange, onStatusChange, onCategoryChange }: TaskFiltersProps) {
  return (
    <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
      <label className="relative block"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#928AAE]" size={17} /><span className="sr-only">Поиск задач</span><input aria-label="Поиск задач" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Поиск" className="h-10 w-full rounded-lg border border-[#E2DEFA] bg-white pl-9 pr-3 text-sm outline-none transition focus:border-[#A99AF5] focus:ring-2 focus:ring-[#EDEAFF] dark:border-[#4A416F] dark:bg-[#231E3D] dark:placeholder:text-[#8177A5] dark:focus:border-[#A99AF5] dark:focus:ring-[#3B3367]" /></label>
      <select aria-label="Статус" value={status} onChange={(event) => onStatusChange(event.target.value as StatusFilter)} className="h-10 rounded-lg border border-[#E2DEFA] bg-white px-3 text-sm outline-none transition focus:border-[#A99AF5] focus:ring-2 focus:ring-[#EDEAFF] dark:border-[#4A416F] dark:bg-[#231E3D] dark:focus:border-[#A99AF5] dark:focus:ring-[#3B3367]"><option value="all">Все</option><option value="active">Активные</option><option value="completed">Выполненные</option></select>
      <select aria-label="Фильтр по категориям" value={category} onChange={(event) => onCategoryChange(event.target.value as 'all' | Category)} className="h-10 rounded-lg border border-[#E2DEFA] bg-white px-3 text-sm outline-none transition focus:border-[#A99AF5] focus:ring-2 focus:ring-[#EDEAFF] dark:border-[#4A416F] dark:bg-[#231E3D] dark:focus:border-[#A99AF5] dark:focus:ring-[#3B3367]"><option value="all">Все категории</option>{Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
    </div>
  )
}
