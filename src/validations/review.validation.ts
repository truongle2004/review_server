import type { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { BadRequestException } from '../shared/BadRequest.exeception'

const saveReview = async (req: Request, res: Response, next: NextFunction) => {
  const correctConditions = Joi.object({
    title: Joi.string().required().messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title cannot be empty',
      'any.required': 'Title is required'
    }),
    content: Joi.string().required().messages({
      'string.base': 'Content must be a string',
      'string.empty': 'Content cannot be empty',
      'any.required': 'Content is required'
    }),
    productId: Joi.number().required().messages({
      'number.base': 'Product ID must be a number',
      'number.integer': 'Product ID must be an integer',
      'number.positive': 'Product ID must be a positive number',
      'any.required': 'Product ID is required'
    })
  })

  try {
    await correctConditions.validateAsync(req.body, { abortEarly: false })
    next()
  } catch {
    next(new BadRequestException('Bad request'))
  }
}

const getReviewByProductId = async (
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
  } catch {
    next(new BadRequestException('Bad request'))
  }
}

const getReviewByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correctConditions = Joi.object({
    id: Joi.string().required().messages({
      'string.base': 'User ID must be a string',
      'string.empty': 'User ID cannot be empty',
      'any.required': 'User ID is required'
    })
  })

  try {
    await correctConditions.validateAsync(req.params, { abortEarly: false })
    next()
  } catch {
    next(new BadRequestException('Bad request'))
  }
}

const getDetailById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correctConditions = Joi.object({
    id: Joi.string().required().messages({
      'string.base': 'Review ID must be a string',
      'string.empty': 'Review ID cannot be empty',
      'any.required': 'Review ID is required'
    })
  })

  try {
    await correctConditions.validateAsync(req.params, { abortEarly: false })
    next()
  } catch {
    next(new BadRequestException('Bad request'))
  }
}

export const reviewValidation = {
  saveReview,
  getReviewByProductId,
  getReviewByUserId,
  getDetailById
}
