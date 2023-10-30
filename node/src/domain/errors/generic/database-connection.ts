export class DatabaseConnection extends Error {
  constructor() {
    super('Database connection error.')
    this.name = 'DatabaseConnection'
  }
}
