import type { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import logger from '../config/logger'
import { BadRequestException } from '../shared/BadRequest.exeception'

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const correctConditions = Joi.object({
    page: Joi.number().integer().positive().default(1).messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.positive': 'Page must be greater than 0'
    })
  })

  try {
    await correctConditions.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (err) {
    next(new BadRequestException('Bad request'))
  }
}

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correctConditions = Joi.object({
    id: Joi.number().integer().positive().required().messages({
      'number.base': 'Product ID must be a number',
      'number.integer': 'Product ID must be an integer',
      'number.positive': 'Product ID must be a positive number',
      'any.required': 'Product ID is required'
    })
  })

  try {
    await correctConditions.validateAsync(req.params, { abortEarly: false })
    next()
  } catch (err) {
    logger.error(err)
    next(new BadRequestException('Bad request'))
  }
}
const getProductPagination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correctConditions = Joi.object({
    id: Joi.any().optional().messages({
      'number.base': 'Category ID must be a number',
      'number.integer': 'Category ID must be an integer',
      'number.positive': 'Category ID must be a positive number'
    }),
    page: Joi.number().integer().positive().default(1).optional().messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.positive': 'Page must be greater than 0'
    }),
    limit: Joi.number()
      .integer()
      .positive()
      .default(10)
      .max(100)
      .optional()
      .messages({
        'number.base': 'Limit must be a number',
        'number.integer': 'Limit must be an integer',
        'number.positive': 'Limit must be greater than 0',
        'number.max': 'Limit cannot exceed 100'
      }),
    rating: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .default(100)
      .optional()
      .messages({
        'number.base': 'Rating must be a number',
        'number.integer': 'Rating must be an integer',
        'number.min': 'Rating must be greater than or equal to 1',
        'number.max': 'Rating must be less than or equal to 100'
      }),
    sort: Joi.string().valid('asc', 'desc').default('asc').optional().messages({
      'string.base': 'Sort must be a string',
      'any.only': 'Sort must be either "asc" or "desc"'
    })
  })

  try {
    const validationData = {
      id: req.params.id ? Number(req.params.id) : undefined,
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      rating: req.query.rating ? Number(req.query.rating) : undefined
    }

    await correctConditions.validateAsync(validationData, { abortEarly: false })
    next()
  } catch (err) {
    logger.error(err)
    next(new BadRequestException('Bad request'))
  }
}

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correctConditions = Joi.object({
    id: Joi.number().integer().positive().required().messages({
      'number.base': 'Product ID must be a number',
      'number.integer': 'Product ID must be an integer',
      'number.positive': 'Product ID must be a positive number',
      'any.required': 'Product ID is required'
    })
  })

  try {
    await correctConditions.validateAsync(req.params, { abortEarly: false })
    next()
  } catch (err) {
    logger.error(err)
    next(new BadRequestException('Bad request'))
  }
}

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correctConditions = Joi.object({
    title: Joi.string().required().messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title cannot be empty',
      'any.required': 'Title is required'
    }),
    description: Joi.string().required().messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description cannot be empty',
      'any.required': 'Description is required'
    }),
    categoryId: Joi.number().required().messages({
      'number.base': 'Category ID must be a number',
      'number.integer': 'Category ID must be an integer',
      'number.positive': 'Category ID must be a positive number',
      'any.required': 'Category ID is required'
    }),
    images: Joi.array().items(Joi.string().uri()).required().min(1).messages({
      'array.base': 'Images must be an array',
      'array.empty': 'At least one image is required',
      'array.min': 'At least one image is required',
      'string.uri': 'Image URL must be a valid URI',
      'any.required': 'Images are required'
    })
  })

  try {
    await correctConditions.validateAsync(req.body, { abortEarly: false })
    next()
  } catch {
    next(new BadRequestException('Bad request'))
  }
}

export const productValidation = {
  getProduct,
  getProductById,
  getProductByCategory: getProductPagination,
  deleteProduct,
  createProduct
}
