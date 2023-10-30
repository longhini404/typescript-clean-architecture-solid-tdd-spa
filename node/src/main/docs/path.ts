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
  '/api/task/delete/{user_id}': deleteTaskPath,
  '/api/task/load': listTasksPath,
  '/api/task/load/{user_id}': loadTaskByIdPath,
  '/api/task/update/{user_id}': updateTaskPath,

  '/api/tag/create': createTagPath,
  '/api/tag/delete/{user_id}': deleteTagPath,
  '/api/tag/load': listTagsPath,
  '/api/tag/load/{user_id}': loadTagByIdPath,
  '/api/tag/update/{user_id}': updateTagPath,
}
