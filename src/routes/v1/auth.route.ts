import { Router } from 'express'
import 'reflect-metadata'
import { LoginService } from '../../modules/auth/userServices/LoginService'
import { LoginPresenter } from '../../modules/auth/presenters/LoginPresenter'
import { LoginDatabase } from '../../modules/auth/databases/LoginDatabase'
import { FindAccountService } from '../../modules/auth/userServices/FindAccountService'
import { FindAccountByEmailPresenter } from '../../modules/auth/presenters/FindAccountByEmailPresenter'
import { TokenService } from '../../modules/auth/tokenServices/TokenService'
import { FindAccountByEmailDatabase } from '../../modules/auth/databases/FindAccountByEmailDatabase'
import { LoginController } from '../../modules/auth/controllers/LoginController'
import { RegisterPresenter } from '../../modules/auth/presenters/RegisterPresenter'
import { RegisterService } from '../../modules/auth/userServices/RegisterService'
import { RegisterDatabase } from '../../modules/auth/databases/RegisterDatabase'
import { RegisterController } from '../../modules/auth/controllers/RegisterController'

const router = Router()

const findAccountDatabase = new FindAccountByEmailDatabase();
const findAccountPresenter = new FindAccountByEmailPresenter();
const findAccountService = new FindAccountService(findAccountPresenter,findAccountDatabase);

const loginPresenter = new LoginPresenter();
const loginDatabase = new LoginDatabase();
const tokenService = new TokenService();
const loginInputBoundary = new LoginService(loginPresenter,loginDatabase,tokenService,findAccountService,findAccountPresenter);
const loginController = new LoginController(loginInputBoundary,loginPresenter);
router.post("/login",loginController.execute)


const registerPresenter = new RegisterPresenter()
const registerDatabase = new RegisterDatabase()
const registerInputBoundary = new RegisterService(registerDatabase,registerPresenter,findAccountService,findAccountPresenter)
const registerController = new RegisterController(registerInputBoundary,registerPresenter)
router.post("/register",registerController.execute)

export const authRouter = router
