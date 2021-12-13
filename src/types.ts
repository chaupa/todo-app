export type Task = {
  id: number
  title: string
  isDone: boolean
}

export enum HandleTaskEnum {
  Update = 'update',
  Delete = 'delete'
}

export enum FilterTasksEnum {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
  ClearCompleted = 'clear completed'
}
