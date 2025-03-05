export class FindAccountByEmailViewModel{
  private _isSuccess: string
  private _message: string
  private _username:string
  private _email: string
  private _password: string
  private _roles: string

  constructor(isSuccess: string, message: string, username:string,email: string, password: string, roles: string) {
    this._isSuccess = isSuccess;
    this._message = message;
    this._username = username
    this._email = email;
    this._password = password;
    this._roles = roles;
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

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get roles(): string {
    return this._roles
  }

  set roles(value: string) {
    this._roles = value
  }

  get username(): string {
    return this._username
  }

  set username(value: string) {
    this._username = value
  }
}