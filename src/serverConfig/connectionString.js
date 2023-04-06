import mongoose from 'mongoose';

export default function dbConnect() {
  mongoose.set('strictQuery', false);

  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  try {
    mongoose.connect(process.env.MONGO_URI, mongooseOptions);
  } catch (error) {
    console.error(error);
  }

  const db = mongoose.connection;
  db.on('error', (error) => {
    console.error('Connection to database failed', error);
  });

  db.once('open', async () => {
    console.info('Connected to database successfully');
  });
}
