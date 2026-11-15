interface ProgressBarProps {
  progress: number
  completedCount: number
  totalCount: number
}

export function ProgressBar({ progress, completedCount, totalCount }: ProgressBarProps) {
  return (
    <>
      <div className="mb-6 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" aria-label={`Выполнено ${progress}%`}>
        <div className="h-1.5 rounded-full bg-slate-900 transition-all duration-500 ease-out dark:bg-slate-100" style={{ width: `${progress}%` }} />
      </div>
      <div className="mb-7 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>{progress}% выполнено</span>
        <span>{completedCount} из {totalCount}</span>
      </div>
    </>
  )
}
