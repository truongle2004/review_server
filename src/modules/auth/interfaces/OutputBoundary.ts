/* eslint-disable @typescript-eslint/no-explicit-any */
import {ResponseData} from "./ResponseData";

export interface OutputBoundary{
  execute(data: ResponseData<any>): void
  getDataViewModel(): any
}