import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  if (!process.env.START_PORT) {
    throw new Error('START_PORT must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conntected to db!');
  } catch (err) {
    console.error(err);
  }
};

app.listen(process.env.START_PORT, () => {
  console.log(`Listening on port ${process.env.START_PORT}!!!`);
});

start();
