import paths from './path'
import schemas from './schemas'
import components from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'API with Node.js, TypeScript, Express, Postgres and Swagger',
    description: 'Hash-git-commit',
    version: '1.0.0',
  },
  license: {
    name: 'GPL 3.0 or later',
    url: 'https://opensource.org/licenses/GPL-3.0',
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Developer server',
    },
  ],
  tags: [
    {
      name: 'Authentication',
    },
    {
      name: 'User',
    },
  ],
  paths,
  schemas,
  components,
}
