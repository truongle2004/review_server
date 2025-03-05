export class FindAccountInputDTO{
   private _email: string

    constructor(email: string) {
        this._email = email;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

}


export class FindAccountOutputDTO {
  private _userId:string
    private _username: string
    private _email: string
    private _password: string
    private _roles: string

  constructor(userId:string,username:string,email: string, password: string, roles: string) {
    this._userId = userId
      this._username = username
    this._email = email
    this._password = password
    this._roles = roles
  }

  get email(): string {
    return this._email
  }

  set email(value: string) {
    this._email = value
  }

  get password(): string {
    return this._password
  }

  set password(value: string) {
    this._password = value
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
   get userId(): string { 
      return this._userId
    }
    set userId(value: string) {
      this._userId = value
    }
}