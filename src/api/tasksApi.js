import axiosClient from './axiosClient'

const tasksApi = {
  getAll() {
    const url = '/tasks'
    return axiosClient.get(url)
  },
  post(params) {
    const url = '/tasks'
    return axiosClient.post(url, params)
  },
  put(params) {
    const url = `/tasks/${params.id}`
    return axiosClient.put(url, {
      title: params.title,
      isDone: params.isDone
    })
  },
  delete(params) {
    const url = `/tasks/${params.id}`
    return axiosClient.delete(url)
  }
};

export default tasksApi;