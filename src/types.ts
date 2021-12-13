export type Task = {
  id: number
  title: string
  isDone?: boolean
}

export type TodoListProps = {
  addTask: (name: string) => void
  updateTask: (task: Task) => void
  deleteTask: (taskID: number) => void
  filterTasks: (key: FilterTasksEnum) => void
  tasks: Task[]
}

export type TodoItemProps = {
  task: Task
  updateTask: (task: Task) => void
  deleteTask: (taskID: number) => void
}

export enum FilterTasksEnum {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
  ClearCompleted = 'clear completed'
}