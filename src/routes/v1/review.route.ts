import { Router } from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'
import 'reflect-metadata'
import { container } from 'tsyringe'
import {
  authMiddleware,
  userMiddleware
} from '../../modules/auth/authMiddleware'
import { ReviewController } from '../../modules/review/controllers/review.controller'
import { AppConstant } from '../../utils/constant'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/images/'))
  },
  filename: (req, file, cb) => {
    const reviewId = req.params.reviewId
    const safeOriginalName = file.originalname.replace(/[^a-z0-9.]+/gi, '_')
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${reviewId}-${uniqueSuffix}-${safeOriginalName}`)
  }
})
const upload = multer({ storage })

const router = Router()

const reviewController = container.resolve(ReviewController)

router.route('/:reviewId/images').post(
  authMiddleware,
  userMiddleware,
  upload.array('reviewImages', 5), // Multer processes files here
  (req, res) => {
    // Handler runs if multer succeeded or found no files

    const files = req.files as Express.Multer.File[]

    if (files && files.length > 0) {
      res.status(201).json({ message: 'Success' }) // 201 Created is suitable
    } else {
      res.status(400).json({ message: 'No image files were uploaded.' })
    }
  }
)

router.route('/:reviewId/images').get(async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId
    const imagesPath = path.join(__dirname, '../../public/images/')

    // Read the directory and filter files for this review
    const allFiles = await fs.promises.readdir(imagesPath)
    const reviewImages = allFiles.filter((file) =>
      file.startsWith(`${reviewId}-`)
    )

    // Map files to full paths and URLs
    const imageUrls = reviewImages.map((filename) => ({
      filename,
      url: `${AppConstant.IMAGE_STATIC}/${filename}`, // Adjust this base URL as needed
      fullPath: path.join(imagesPath, filename)
    }))

    res.json(imageUrls)
  } catch (error) {
    // Handle potential errors (e.g., directory not found)
    next(error)
  }
})

router.route('/').post(authMiddleware, reviewController.saveReview)

router.route('/search').get(reviewController.searchReviewByTitle)

router.route('/product/:id').get(reviewController.getReviewByProductId)

router.route('/user/:id').get(reviewController.getReviewByUserId)

router.route('/detail/:id').get(reviewController.getDetailById)

router.route('/:id').delete(authMiddleware, reviewController.deleteReview)

router.route('/:id').put(authMiddleware, reviewController.updateReview)

export const reviewRoute = router
