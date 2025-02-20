/* eslint-disable @typescript-eslint/no-explicit-any */
import {RequestData} from "./RequestData";

export interface InputBoundary{
  execute(data: RequestData<any>): void;
}