import { Moon, Sun } from 'lucide-react'

interface TodoHeaderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function TodoHeader({ theme, onToggleTheme }: TodoHeaderProps) {
  return (
    <header className="mb-8 flex items-start justify-between gap-4">
      <div>
        <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">Личный планировщик</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Мои задачи</h1>
      </div>
      <button type="button" onClick={onToggleTheme} className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:bg-[#1a1a1d] dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white" aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}>
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </header>
  )
}
