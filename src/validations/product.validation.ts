import type { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import logger from '../config/logger'
import { BadRequestException } from '../shared/badRequest.exeception'

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
    logger.error(err)
    throw new BadRequestException('Bad request')
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
    throw new BadRequestException('Bad request')
  }
}

const getProductByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correctConditions = Joi.object({
    id: Joi.number().integer().positive().required().messages({
      'number.base': 'Category ID must be a number',
      'number.integer': 'Category ID must be an integer',
      'number.positive': 'Category ID must be a positive number',
      'any.required': 'Category ID is required'
    }),
    page: Joi.number().integer().positive().default(1).messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.positive': 'Page must be greater than 0'
    }),
    limit: Joi.number().integer().positive().default(10).max(100).messages({
      'number.base': 'Limit must be a number',
      'number.integer': 'Limit must be an integer',
      'number.positive': 'Limit must be greater than 0',
      'number.max': 'Limit cannot exceed 100'
    })
  })

  try {
    const id = Number(req.params.id)
    const page = Number(req.query.page) || undefined
    const limit = Number(req.query.limit) || undefined

    await correctConditions.validateAsync(
      { id, page, limit },
      { abortEarly: false }
    )
    next()
  } catch (err) {
    logger.error(err)
    throw new BadRequestException('Bad request')
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
    throw new BadRequestException('Bad request')
  }
}

export const productValidation = {
  getProductById,
  getProduct,
  deleteProduct,
  getProductByCategory
}
