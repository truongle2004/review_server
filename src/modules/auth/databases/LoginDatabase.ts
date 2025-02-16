/* eslint-disable @typescript-eslint/no-explicit-any */

import { Users } from "../../../entities/users.entity";
import { DatabaseBoundary } from "../interfaces/DatabaseBoundary";

/* eslint-disable @typescript-eslint/no-unused-vars */
export class LoginDatabase implements DatabaseBoundary {
    execute(data: Users): Promise<any> {
        return Promise.resolve(undefined);
    }

}