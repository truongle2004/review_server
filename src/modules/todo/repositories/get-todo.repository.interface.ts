export interface IGetTodoRepository {
  execute(): Promise<string>
}
