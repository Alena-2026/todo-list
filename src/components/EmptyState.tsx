import { CheckCircle2, Sparkles } from 'lucide-react'

export function EmptyState({ hasTasks }: { hasTasks: boolean }) {
  return (
    <div className="grid min-h-52 place-items-center rounded-2xl border border-dashed border-slate-300 bg-white/50 px-5 text-center dark:border-slate-700 dark:bg-[#1a1a1d]/50">
      <div>{hasTasks ? <><CheckCircle2 className="mx-auto mb-3 text-slate-300 dark:text-slate-600" size={30} /><p className="text-sm text-slate-500 dark:text-slate-400">По этому запросу задач нет</p></> : <><div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"><Sparkles size={22} /></div><h2 className="text-base font-semibold">Начните с первой задачи</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Добавьте то, что хотите успеть сегодня.</p></>}</div>
    </div>
  )
}
