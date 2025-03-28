import { Router } from 'express'
import {
  authMiddleware,
  userMiddleware
} from '../../modules/auth/authMiddleware'
import { ProfileDatabase } from '../../modules/profile/databases/ProfileDatabase'
import { ProfilePresenter } from '../../modules/profile/presenters/ProfilePresenter'
import { ProfileService } from '../../modules/profile/services/ProfileService'
import { ProfileController } from '../../modules/profile/controllers/ProfileController'

const router = Router()

const profileDatabase = new ProfileDatabase()
const profilePresenter = new ProfilePresenter()
const profileService = new ProfileService(profilePresenter, profileDatabase)
const profileController = new ProfileController(
  profileService,
  profilePresenter
)

router.put('/', authMiddleware, userMiddleware, profileController.updateProfile)

export const profileRouter = router
