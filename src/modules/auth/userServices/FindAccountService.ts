import {InputBoundary} from "../../../shared/interfaces/InputBoundary";
import {RequestData} from "../../../shared/interfaces/RequestData";
import {OutputBoundary} from "../../../shared/interfaces/OutputBoundary";
import {DatabaseBoundary} from "../../../shared/interfaces/DatabaseBoundary";
import {FindAccountInputDTO, FindAccountOutputDTO} from "../dtos/FindAccountDTO";
import { FindAccountByEmailResponseData } from "../response/FindAccountByEmailResponseData";

export class FindAccountService implements InputBoundary{
   private presenter:OutputBoundary
    private database:DatabaseBoundary

    constructor(presenter: OutputBoundary, database: DatabaseBoundary) {
        this.presenter = presenter;
        this.database = database;
    }

   async execute(data: RequestData<FindAccountInputDTO>): Promise<void> {
       const email :string = data.data.email
       const isValidEmail = this.isValidEmail(email);
       if (!isValidEmail) {
           const outputDTO = new FindAccountOutputDTO("","","");
           const responseData = new FindAccountByEmailResponseData(400, "Invalid email", outputDTO)
           await this.presenter.execute(responseData);
           return;
       }else {
           try {
               const response  = await this.database.execute(email);
               console.log("Response Sau khi goi database service Find::::  "+response)
               if (!response) {
                   const outputDTO = new FindAccountOutputDTO("","","");
                   const responseData = new FindAccountByEmailResponseData(400, "User not found", outputDTO)
                   await this.presenter.execute(responseData);
                   return;
               }else {
                   const dto = new FindAccountOutputDTO( response.email, response.password, response.roles);
                   console.log("dto response.roles LOGGER::::+ "+response.roles);
                   const responseData = new FindAccountByEmailResponseData(201, "Success", dto);
                   await this.presenter.execute(responseData);
                   return;
               }
           } catch (error) {
               console.log(error);
               const dto = new FindAccountOutputDTO("", "","");
               const responseData = new FindAccountByEmailResponseData(400, "User not found", dto);
               await this.presenter.execute(responseData);
               return;
           }
       }
   }


    private isValidEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return emailRegex.test(email);
    }

}