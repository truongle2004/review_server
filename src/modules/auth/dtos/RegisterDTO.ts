export class RegisterInputDTO  {
    private _email: string
    private _password: string
    private _confirmPassword: string
    constructor(email: string, password: string, confirmPassword: string) {
        this._email = email
        this._password = password
        this._confirmPassword = confirmPassword
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

    get confirmPassword(): string {
        return this._confirmPassword;
    }

    set confirmPassword(value: string) {
        this._confirmPassword = value;
    }
}

export class RegisterOutputDTO  {

}