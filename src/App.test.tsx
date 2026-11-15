import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('To-do list', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  it('adds a task, persists it, and updates completion progress', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('Текст задачи'), { target: { value: 'Подготовить отчёт' } })
    fireEvent.change(screen.getByLabelText('Категория'), { target: { value: 'work' } })
    fireEvent.change(screen.getByLabelText('Приоритет'), { target: { value: 'high' } })
    fireEvent.click(screen.getByRole('button', { name: 'Добавить задачу' }))

    expect(screen.getByText('Подготовить отчёт')).toBeInTheDocument()
    expect(screen.getByText('0% выполнено')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('minimal-todo.tasks') ?? '[]')).toHaveLength(1)

    fireEvent.click(screen.getByRole('checkbox', { name: 'Отметить «Подготовить отчёт» выполненной' }))
    expect(screen.getByText('100% выполнено')).toBeInTheDocument()
  })

  it('rejects blank tasks with a visible error and clears it after input', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('Текст задачи'), { target: { value: '   ' } })
    fireEvent.click(screen.getByRole('button', { name: 'Добавить задачу' }))
    expect(screen.getByText('Введите текст задачи.')).toBeInTheDocument()
    expect(screen.getByLabelText('Текст задачи')).toHaveAttribute('aria-invalid', 'true')

    fireEvent.change(screen.getByLabelText('Текст задачи'), { target: { value: 'Новая задача' } })
    expect(screen.queryByText('Введите текст задачи.')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Текст задачи')).toHaveAttribute('aria-invalid', 'false')
  })

  it('renders a long task without truncating its text', () => {
    const longText = 'Очень длинная задача '.repeat(20).trim()
    localStorage.setItem('minimal-todo.tasks', JSON.stringify([
      { id: 'task-1', text: longText, category: 'work', priority: 'high', completed: false },
    ]))
    render(<App />)

    expect(screen.getByRole('button', { name: longText })).toHaveClass('whitespace-pre-wrap')
    expect(screen.getByText(longText)).toBeInTheDocument()
  })

  it('edits a task on double click and cancels empty edits', () => {
    localStorage.setItem('minimal-todo.tasks', JSON.stringify([
      { id: 'task-1', text: 'Старый текст', category: 'personal', priority: 'medium', completed: false },
    ]))
    render(<App />)

    fireEvent.doubleClick(screen.getByText('Старый текст'))
    const input = screen.getByLabelText('Редактировать «Старый текст»')
    fireEvent.change(input, { target: { value: 'Новый текст' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(screen.getByText('Новый текст')).toBeInTheDocument()

    fireEvent.doubleClick(screen.getByText('Новый текст'))
    const emptyInput = screen.getByLabelText('Редактировать «Новый текст»')
    fireEvent.change(emptyInput, { target: { value: '   ' } })
    fireEvent.keyDown(emptyInput, { key: 'Enter' })
    expect(screen.getByText('Новый текст')).toBeInTheDocument()
  })

  it('searches and filters tasks without changing stored data', () => {
    localStorage.setItem('minimal-todo.tasks', JSON.stringify([
      { id: 'task-1', text: 'Позвонить маме', category: 'personal', priority: 'low', completed: false },
      { id: 'task-2', text: 'Прочитать главу', category: 'study', priority: 'medium', completed: true },
    ]))
    render(<App />)

    fireEvent.change(screen.getByLabelText('Поиск задач'), { target: { value: 'главу' } })
    expect(screen.getByText('Прочитать главу')).toBeInTheDocument()
    expect(screen.queryByText('Позвонить маме')).not.toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Поиск задач'), { target: { value: '' } })
    fireEvent.change(screen.getByLabelText('Статус'), { target: { value: 'active' } })
    expect(screen.getByText('Позвонить маме')).toBeInTheDocument()
    expect(screen.queryByText('Прочитать главу')).not.toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('minimal-todo.tasks') ?? '[]')).toHaveLength(2)
  })

  it('offers undo for four seconds after deletion', () => {
    localStorage.setItem('minimal-todo.tasks', JSON.stringify([
      { id: 'task-1', text: 'Купить хлеб', category: 'personal', priority: 'low', completed: false },
    ]))
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Удалить «Купить хлеб»' }))
    expect(screen.queryByText('Купить хлеб')).not.toBeInTheDocument()
    expect(screen.getByText('Задача удалена')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Отменить удаление' }))
    expect(screen.getByText('Купить хлеб')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Удалить «Купить хлеб»' }))
    act(() => vi.advanceTimersByTime(4000))
    expect(screen.queryByText('Задача удалена')).not.toBeInTheDocument()
  })

  it('exports tasks and imports a validated JSON backup', async () => {
    vi.useRealTimers()
    localStorage.setItem('minimal-todo.tasks', JSON.stringify([
      { id: 'old', text: 'Старая задача', category: 'work', priority: 'low', completed: false },
    ]))
    const createObjectUrl = vi.fn(() => 'blob:todo')
    const revokeObjectUrl = vi.fn()
    Object.defineProperty(URL, 'createObjectURL', { value: createObjectUrl, writable: true })
    Object.defineProperty(URL, 'revokeObjectURL', { value: revokeObjectUrl, writable: true })
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Экспорт в JSON' }))
    expect(createObjectUrl).toHaveBeenCalledOnce()

    const backup = JSON.stringify([
      { id: 'restored', text: 'Восстановленная задача', category: 'study', priority: 'medium', completed: true },
    ])
    const file = new File([backup], 'todo-backup.json', { type: 'application/json' })
    fireEvent.change(screen.getByLabelText('Импорт из JSON'), { target: { files: [file] } })

    expect(await screen.findByText('Восстановленная задача')).toBeInTheDocument()
    expect(screen.queryByText('Старая задача')).not.toBeInTheDocument()
  })

  it('does not overwrite tasks when importing invalid JSON', async () => {
    vi.useRealTimers()
    localStorage.setItem('minimal-todo.tasks', JSON.stringify([
      { id: 'keep', text: 'Сохранить задачу', category: 'personal', priority: 'low', completed: false },
    ]))
    render(<App />)

    const invalidFile = new File(['{"not":"tasks"}'], 'bad-backup.json', { type: 'application/json' })
    fireEvent.change(screen.getByLabelText('Импорт из JSON'), { target: { files: [invalidFile] } })

    expect(await screen.findByText('Не удалось импортировать резервную копию.')).toBeInTheDocument()
    expect(screen.getByText('Сохранить задачу')).toBeInTheDocument()
  })
})
