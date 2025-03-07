import { Router } from 'express'
import 'reflect-metadata'
import { LoginService } from '../../modules/auth/userServices/LoginService'
import { LoginPresenter } from '../../modules/auth/presenters/LoginPresenter'
import { LoginDatabase } from '../../modules/auth/databases/LoginDatabase'
import { LoginController } from '../../modules/auth/controllers/LoginController'
import { RegisterPresenter } from '../../modules/auth/presenters/RegisterPresenter'
import { RegisterService } from '../../modules/auth/userServices/RegisterService'
import { RegisterDatabase } from '../../modules/auth/databases/RegisterDatabase'
import { RegisterController } from '../../modules/auth/controllers/RegisterController'

const router = Router()


const loginPresenter = new LoginPresenter();
const loginDatabase = new LoginDatabase();
const loginInputBoundary = new LoginService(loginPresenter,loginDatabase);
const loginController = new LoginController(loginInputBoundary,loginPresenter);
router.post("/login",loginController.execute)


const registerPresenter = new RegisterPresenter()
const registerDatabase = new RegisterDatabase()
const registerInputBoundary = new RegisterService(registerDatabase,registerPresenter)
const registerController = new RegisterController(registerInputBoundary,registerPresenter)
router.post("/register",registerController.execute)

export const authRouter = router
