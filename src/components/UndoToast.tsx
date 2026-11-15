import { X } from 'lucide-react'

interface UndoToastProps {
  onUndo: () => void
  onClose: () => void
}

export function UndoToast({ onUndo, onClose }: UndoToastProps) {
  return <div role="status" className="fixed bottom-5 left-1/2 z-10 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-xl bg-[#29224D] px-4 py-3 text-sm text-white shadow-[0_16px_36px_rgba(41,34,77,0.28)] dark:bg-[#EDEAFF] dark:text-[#29224D]"><span className="flex-1">Задача удалена</span><button type="button" onClick={onUndo} aria-label="Отменить удаление" className="font-semibold text-[#C5BBFF] underline underline-offset-4 dark:text-[#5646C8]">Отменить</button><button type="button" onClick={onClose} aria-label="Закрыть уведомление"><X size={16} /></button></div>
}
