import axiosClient from './axiosClient'
import { Task } from '../types';

const tasksApi = {
  getAll(isDone?: boolean) {
    const url = `/tasks${(typeof isDone === 'boolean') ? '?isDone=' + isDone : ''}`
    return axiosClient.get(url)
  },
  post(params: Task) {
    const url = '/tasks'
    return axiosClient.post(url, params)
  },
  put(params: Task) {
    const url = `/tasks/${params.id}`
    return axiosClient.put(url, {
      title: params.title,
      isDone: params.isDone
    })
  },
  delete(taskID: number) {
    const url = `/tasks/${taskID}`
    return axiosClient.delete(url)
  }
};

export default tasksApi;