import {
  errorSchema,
  loginParamsSchema,
  loginResultSchema,
  createUserParamsSchema,
  listUsersResultSchema,
  loadUserByIdResultSchema,
  updateUserParamsSchema,
  createTaskParamsSchema,
  listTasksResultSchema,
  loadTaskByIdResultSchema,
  updateTaskParamsSchema,
} from './schemas/index'

export default {
  error: errorSchema,

  loginParams: loginParamsSchema,
  loginResult: loginResultSchema,

  createUserParams: createUserParamsSchema,
  listUsersSchema: listUsersResultSchema,
  loadUserByIdSchema: loadUserByIdResultSchema,
  updateUserParams: updateUserParamsSchema,

  createTaskParams: createTaskParamsSchema,
  listTasksSchema: listTasksResultSchema,
  loadTaskByIdSchema: loadTaskByIdResultSchema,
  updateTaskParams: updateTaskParamsSchema,
}
