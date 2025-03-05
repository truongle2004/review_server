/* eslint-disable @typescript-eslint/no-explicit-any */

export interface OutputBoundary{
  execute(data: any): void
  getDataViewModel(): any
}