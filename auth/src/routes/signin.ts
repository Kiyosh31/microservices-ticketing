import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@ms-ticket/common';
import { User } from '../models/user';
import { setJwtSession } from '../utilities/jwtSession';
import { Password } from '../utilities/password';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must provide a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    setJwtSession(req, existingUser);

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
