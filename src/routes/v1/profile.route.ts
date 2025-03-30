import { Router } from 'express'
import {
  authMiddleware,
  userMiddleware
} from '../../modules/auth/authMiddleware'
import { ProfileDatabase } from '../../modules/profile/databases/ProfileDatabase'
import { ProfilePresenter } from '../../modules/profile/presenters/ProfilePresenter'
import { ProfileService } from '../../modules/profile/services/ProfileService'
import { ProfileController } from '../../modules/profile/controllers/ProfileController'
import { AppDataSource } from '../../config/data-source'
import { StatusCodes } from 'http-status-codes'
import { Users } from '../../entities/users.entity'
import { NotFoundException } from '../../shared/NotFound.exeception'

const router = Router()

const profileDatabase = new ProfileDatabase()
const profilePresenter = new ProfilePresenter()
const profileService = new ProfileService(profilePresenter, profileDatabase)
const profileController = new ProfileController(
  profileService,
  profilePresenter
)

router.put('/', authMiddleware, userMiddleware, profileController.updateProfile)

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId

    if (!userId) {
      next(new NotFoundException('User ID is required'))
      return
    }

    const appSource = AppDataSource.getRepository(Users)
    const user = await appSource.findOne({
      where: {
        id: userId
      },
      relations: ['profile'],
      select: {
        id: true,
        username: true,
        email: true,
        status: true,
        roles: true,
        profile: {
          id: true,
          profile_picture: true,
          bio: true,
          phone: true,
          country: true,
          birthday: true,
          gender: true
        }
      }
    })

    if (!user) {
      next(new NotFoundException('User not found'))
      return
    }

    res.status(StatusCodes.OK).json({
      message: 'Profile fetched successfully',
      data: user
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    next(error)
  }
})

export const profileRouter = router
