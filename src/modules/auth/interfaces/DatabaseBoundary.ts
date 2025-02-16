/* eslint-disable @typescript-eslint/no-explicit-any */

export interface DatabaseBoundary{
    execute(data: any): Promise<any>;
}