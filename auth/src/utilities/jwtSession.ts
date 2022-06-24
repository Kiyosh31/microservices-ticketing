import { Request } from "express";
import jwt from "jsonwebtoken";

const setJwtSession = (req: Request, user: any) => {
  try {
    // Generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it in session object
    // @ts-ignore
    req.session = {
      jwt: userJwt,
    };
  } catch (err) {
    console.log(err);
  }
};

export { setJwtSession };
