import mongoose from 'mongoose';
import { app } from './app';

const authPort = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conntected to db!');
  } catch (err) {
    console.error(err);
  }
};

app.listen(authPort, () => {
  console.log(`Listening on port ${authPort}!!!`);
});

start();
