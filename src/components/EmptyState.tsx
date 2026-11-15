import { CheckCircle2, Sparkles } from 'lucide-react'

export function EmptyState({ hasTasks }: { hasTasks: boolean }) {
  return (
    <div className="grid min-h-52 place-items-center rounded-2xl border border-dashed border-[#D8D1FF] bg-white/70 px-5 text-center shadow-sm dark:border-[#4A416F] dark:bg-[#231E3D]/60">
      <div>{hasTasks ? <><CheckCircle2 className="mx-auto mb-3 text-[#A99AF5] dark:text-[#7869D9]" size={30} /><p className="text-sm text-[#625D80] dark:text-[#B9B0DC]">По этому запросу задач нет</p></> : <><div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-[#EDEAFF] text-[#5646C8] shadow-sm dark:bg-[#3B3367] dark:text-[#C5BBFF]"><Sparkles size={22} /></div><h2 className="text-base font-semibold">Начните с первой задачи</h2><p className="mt-1 text-sm text-[#625D80] dark:text-[#B9B0DC]">Добавьте то, что хотите успеть сегодня.</p></>}</div>
    </div>
  )
}
