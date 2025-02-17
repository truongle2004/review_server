import jwt from "jsonwebtoken";

export class LoginViewModel{
  private _isSuccess: string;
  private _message: string;
  private _jwt:string;


  constructor(isSuccess: string, message: string, jwt: string) {
    this._isSuccess = isSuccess;
    this._message = message;
    this._jwt = jwt;
  }


  get isSuccess(): string {
    return this._isSuccess;
  }

  set isSuccess(value: string) {
    this._isSuccess = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get jwt(): string {
    return this._jwt;
  }

  set jwt(value: string) {
    this._jwt = value;
  }
}