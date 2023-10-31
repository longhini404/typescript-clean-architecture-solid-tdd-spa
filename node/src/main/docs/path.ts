import {
  createUserPath,
  deleteUserPath,
  listUsersPath,
  loadUserByIdPath,
  loginPath,
  updateUserPath,
  createTaskPath,
  deleteTaskPath,
  listTasksPath,
  loadTaskByIdPath,
  updateTaskPath,
  createTagPath,
  deleteTagPath,
  listTagsPath,
  loadTagByIdPath,
  updateTagPath,
} from './path/index'

export default {
  '/api/login': loginPath,

  '/api/user/create': createUserPath,
  '/api/user/delete/{user_id}': deleteUserPath,
  '/api/user/load': listUsersPath,
  '/api/user/load/{user_id}': loadUserByIdPath,
  '/api/user/update/{user_id}': updateUserPath,

  '/api/task/create': createTaskPath,
  '/api/task/delete/{task_id}': deleteTaskPath,
  '/api/task/load': listTasksPath,
  '/api/task/load/{task_id}': loadTaskByIdPath,
  '/api/task/update/{task_id}': updateTaskPath,

  '/api/tag/create': createTagPath,
  '/api/tag/delete/{tag_id}': deleteTagPath,
  '/api/tag/load': listTagsPath,
  '/api/tag/load/{tag_id}': loadTagByIdPath,
  '/api/tag/update/{tag_id}': updateTagPath,
}
