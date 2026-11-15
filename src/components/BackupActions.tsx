import { Download, Upload } from 'lucide-react'
import { ChangeEvent, useRef } from 'react'

interface BackupActionsProps {
  hasError: boolean
  onExport: () => void
  onImport: (file: File) => void
}

export function BackupActions({ hasError, onExport, onImport }: BackupActionsProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) onImport(file)
    event.target.value = ''
  }

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      <button type="button" onClick={onExport} className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#E2DEFA] bg-white px-3 text-sm font-medium text-[#625D80] transition hover:border-[#A99AF5] hover:bg-[#F8F7FF] hover:text-[#5646C8] focus:outline-none focus:ring-2 focus:ring-[#A99AF5] focus:ring-offset-2 dark:border-[#4A416F] dark:bg-[#231E3D] dark:text-[#C5BBFF] dark:hover:border-[#7869D9] dark:hover:bg-[#2C254B] dark:hover:text-white dark:focus:ring-offset-[#171429]"><Download size={15} />Экспорт в JSON</button>
      <input ref={inputRef} onChange={handleImport} aria-label="Импорт из JSON" type="file" accept="application/json,.json" className="sr-only" />
      <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#E2DEFA] bg-white px-3 text-sm font-medium text-[#625D80] transition hover:border-[#A99AF5] hover:bg-[#F8F7FF] hover:text-[#5646C8] focus:outline-none focus:ring-2 focus:ring-[#A99AF5] focus:ring-offset-2 dark:border-[#4A416F] dark:bg-[#231E3D] dark:text-[#C5BBFF] dark:hover:border-[#7869D9] dark:hover:bg-[#2C254B] dark:hover:text-white dark:focus:ring-offset-[#171429]"><Upload size={15} />Импорт из JSON</button>
      {hasError && <p role="alert" className="text-sm text-rose-600 dark:text-rose-300">Не удалось импортировать резервную копию.</p>}
    </div>
  )
}
