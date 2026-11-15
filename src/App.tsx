import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'
import { BackupActions } from './components/BackupActions'
import { EmptyState } from './components/EmptyState'
import { ProgressBar } from './components/ProgressBar'
import { TaskFilters } from './components/TaskFilters'
import { TaskForm } from './components/TaskForm'
import { TaskItem } from './components/TaskItem'
import { TodoHeader } from './components/TodoHeader'
import { UndoToast } from './components/UndoToast'
import { loadTasks, loadTheme, parseTaskBackup, TASKS_KEY, THEME_KEY } from './storage'
import type { Category, Priority, StatusFilter, Task } from './types'

interface DeletedTask {
  task: Task
  index: number
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [theme, setTheme] = useState<'light' | 'dark'>(loadTheme)
  const [text, setText] = useState('')
  const [inputError, setInputError] = useState(false)
  const [importError, setImportError] = useState(false)
  const [category, setCategory] = useState<Category>('work')
  const [priority, setPriority] = useState<Priority>('medium')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<'all' | Category>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')
  const [deleted, setDeleted] = useState<DeletedTask | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const completedCount = tasks.filter((task) => task.completed).length
  const progress = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100)
  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const queryMatches = task.text.toLocaleLowerCase('ru').includes(search.trim().toLocaleLowerCase('ru'))
    const statusMatches = status === 'all' || (status === 'completed' ? task.completed : !task.completed)
    const categoryMatches = categoryFilter === 'all' || task.category === categoryFilter
    return queryMatches && statusMatches && categoryMatches
  }), [tasks, search, status, categoryFilter])

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedText = text.trim()
    if (!trimmedText) {
      setInputError(true)
      return
    }
    setTasks((current) => [...current, { id: crypto.randomUUID(), text: trimmedText, category, priority, completed: false }])
    setText('')
    setInputError(false)
  }

  function exportTasks() {
    const backup = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(backup)
    const link = document.createElement('a')
    link.href = url
    link.download = 'todo-backup.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  async function importTasks(file: File) {
    try {
      const parsed = parseTaskBackup(await file.text())
      if (!parsed) throw new Error('Invalid backup')
      setTasks(parsed)
      setImportError(false)
    } catch {
      setImportError(true)
    }
  }

  function toggleTask(id: string) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  function beginEdit(task: Task) {
    setEditingId(task.id)
    setEditingText(task.text)
  }

  function saveEdit(id: string) {
    const trimmedText = editingText.trim()
    if (trimmedText) setTasks((current) => current.map((task) => task.id === id ? { ...task, text: trimmedText } : task))
    setEditingId(null)
  }

  function onEditKeyDown(event: KeyboardEvent<HTMLInputElement>, id: string) {
    if (event.key === 'Enter') saveEdit(id)
    if (event.key === 'Escape') setEditingId(null)
  }

  function deleteTask(task: Task) {
    const index = tasks.findIndex((current) => current.id === task.id)
    setTasks((current) => current.filter((current) => current.id !== task.id))
    setDeleted({ task, index })
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDeleted(null), 4000)
  }

  function undoDelete() {
    if (!deleted) return
    setTasks((current) => {
      const restored = [...current]
      restored.splice(deleted.index, 0, deleted.task)
      return restored
    })
    if (timerRef.current) clearTimeout(timerRef.current)
    setDeleted(null)
  }

  return (
    <main className="min-h-screen bg-[#F8F7FF] px-4 py-8 text-[#202338] transition-colors dark:bg-[#171429] dark:text-[#F8F7FF] sm:px-6 sm:py-12">
      <section className="mx-auto max-w-3xl">
        <TodoHeader theme={theme} onToggleTheme={() => setTheme((current) => current === 'light' ? 'dark' : 'light')} />
        <ProgressBar progress={progress} completedCount={completedCount} totalCount={tasks.length} />
        <TaskForm text={text} category={category} priority={priority} hasError={inputError} onTextChange={(value) => { setText(value); if (inputError) setInputError(false) }} onCategoryChange={setCategory} onPriorityChange={setPriority} onSubmit={addTask} />
        <BackupActions hasError={importError} onExport={exportTasks} onImport={importTasks} />
        <TaskFilters search={search} status={status} category={categoryFilter} onSearchChange={setSearch} onStatusChange={setStatus} onCategoryChange={setCategoryFilter} />
        <div className="space-y-2">
          {visibleTasks.map((task) => <TaskItem key={task.id} task={task} isEditing={editingId === task.id} editingText={editingText} onToggle={() => toggleTask(task.id)} onStartEdit={() => beginEdit(task)} onEditChange={setEditingText} onSaveEdit={() => saveEdit(task.id)} onEditKeyDown={(event) => onEditKeyDown(event, task.id)} onDelete={() => deleteTask(task)} />)}
          {visibleTasks.length === 0 && <EmptyState hasTasks={tasks.length > 0} />}
        </div>
      </section>
      {deleted && <UndoToast onUndo={undoDelete} onClose={() => setDeleted(null)} />}
    </main>
  )
}

export default App
