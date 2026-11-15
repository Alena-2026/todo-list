import { X } from 'lucide-react'

interface UndoToastProps {
  onUndo: () => void
  onClose: () => void
}

export function UndoToast({ onUndo, onClose }: UndoToastProps) {
  return <div role="status" className="fixed bottom-5 left-1/2 z-10 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-xl dark:bg-slate-100 dark:text-slate-900"><span className="flex-1">Задача удалена</span><button type="button" onClick={onUndo} aria-label="Отменить удаление" className="font-semibold underline underline-offset-4">Отменить</button><button type="button" onClick={onClose} aria-label="Закрыть уведомление"><X size={16} /></button></div>
}
