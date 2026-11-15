interface ProgressBarProps {
  progress: number
  completedCount: number
  totalCount: number
}

export function ProgressBar({ progress, completedCount, totalCount }: ProgressBarProps) {
  return (
    <>
      <div className="mb-4 overflow-hidden rounded-full bg-[#EDEAFF] shadow-inner dark:bg-[#302952]" aria-label={`Выполнено ${progress}%`}>
        <div className="h-2.5 rounded-full bg-[#5646C8] transition-all duration-500 ease-out dark:bg-[#A99AF5]" style={{ width: `${progress}%` }} />
      </div>
      <div className="mb-7 flex items-center justify-between text-sm font-medium text-[#625D80] dark:text-[#B9B0DC]">
        <span className="text-[#5646C8] dark:text-[#C5BBFF]">{progress}% выполнено</span>
        <span>{completedCount} из {totalCount}</span>
      </div>
    </>
  )
}
