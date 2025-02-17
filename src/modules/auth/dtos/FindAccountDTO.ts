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
    private _email: string
    private _password: string
    private _roles: string

  constructor(email: string, password: string, roles: string) {
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
}