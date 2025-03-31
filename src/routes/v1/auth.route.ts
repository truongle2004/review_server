import dotenv from 'dotenv'
import { Router } from 'express'
import { LoginController } from '../../modules/auth/controllers/LoginController'
import { RegisterController } from '../../modules/auth/controllers/RegisterController'
import { LoginDatabase } from '../../modules/auth/databases/LoginDatabase'
import { RegisterDatabase } from '../../modules/auth/databases/RegisterDatabase'
import { LoginPresenter } from '../../modules/auth/presenters/LoginPresenter'
import { RegisterPresenter } from '../../modules/auth/presenters/RegisterPresenter'
import { LoginService } from '../../modules/auth/userServices/LoginService'
import { RegisterService } from '../../modules/auth/userServices/RegisterService'
dotenv.config()

const router = Router()

const loginPresenter = new LoginPresenter()
const loginDatabase = new LoginDatabase()
const loginInputBoundary = new LoginService(loginPresenter, loginDatabase)
const loginController = new LoginController(loginInputBoundary, loginPresenter)
router.post('/login', loginController.execute)

router.post('/refresh', loginController.doRefreshToken)

const registerPresenter = new RegisterPresenter()
const registerDatabase = new RegisterDatabase()
const registerInputBoundary = new RegisterService(
  registerDatabase,
  registerPresenter
)
const registerController = new RegisterController(
  registerInputBoundary,
  registerPresenter
)
router.post('/register', registerController.execute)

export const authRouter = router
