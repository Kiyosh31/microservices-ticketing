import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@ms-ticket/common';
import { setJwtSession } from '../utilities/jwtSession';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({
      email,
      password,
    });
    await user.save();

    setJwtSession(req, user);

    res.status(200).send(user);
  }
);

export { router as signupRouter };
