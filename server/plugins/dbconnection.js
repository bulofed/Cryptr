import mongoose from 'mongoose';

export default async () => {
  const config = useRuntimeConfig();

  const connectToDatabase = async () => {
    try {
      await mongoose.connect(config.mongodbUri, {
        dbName: config.mongodbName,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
      console.log('MongoDB connected successfully...');
    } catch (err) {
      console.error('MongoDB connection error: ' + err);
      setTimeout(connectToDatabase, 5000); // Retry connection after 5 seconds
    }
  };

  mongoose.connection.on('disconnected', () => {
    console.error('MongoDB disconnected. Trying to reconnect...');
    connectToDatabase();
  });

  await connectToDatabase();
};