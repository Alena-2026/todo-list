import { Moon, Sun } from 'lucide-react'

interface TodoHeaderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function TodoHeader({ theme, onToggleTheme }: TodoHeaderProps) {
  return (
    <header className="mb-8 flex items-start justify-between gap-4">
      <div>
        <p className="mb-2 text-sm font-semibold tracking-wide text-[#5646C8] dark:text-[#A99AF5]">Личный планировщик</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Мои задачи</h1>
      </div>
      <button type="button" onClick={onToggleTheme} className="grid size-10 place-items-center rounded-xl border border-[#EDEAFF] bg-white text-[#5646C8] shadow-sm transition hover:-translate-y-0.5 hover:border-[#A99AF5] hover:text-[#4939B2] focus:outline-none focus:ring-2 focus:ring-[#A99AF5] focus:ring-offset-2 dark:border-[#3B3367] dark:bg-[#231E3D] dark:text-[#C5BBFF] dark:hover:border-[#7869D9] dark:hover:text-white dark:focus:ring-offset-[#171429]" aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}>
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </header>
  )
}
