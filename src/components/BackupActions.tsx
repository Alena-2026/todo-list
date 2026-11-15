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
      <button type="button" onClick={onExport} className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:bg-[#1a1a1d] dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"><Download size={15} />Экспорт в JSON</button>
      <input ref={inputRef} onChange={handleImport} aria-label="Импорт из JSON" type="file" accept="application/json,.json" className="sr-only" />
      <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:bg-[#1a1a1d] dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"><Upload size={15} />Импорт из JSON</button>
      {hasError && <p role="alert" className="text-sm text-rose-600 dark:text-rose-300">Не удалось импортировать резервную копию.</p>}
    </div>
  )
}
