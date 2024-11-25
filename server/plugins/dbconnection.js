import mongoose from 'mongoose'

export default async () => {
  const config = useRuntimeConfig()
  const connectToDatabase = async () => {
    try {
      await mongoose.connect(config.mongodbUri + config.mongodbName)
      console.log('MongoDB connected successfully...')
    } catch (err) {
      console.error('MongoDB connection error: ' + err)
    }
  }

  mongoose.connection.on('disconnected', () => {
    console.error('MongoDB disconnected. Trying to reconnect...')
    connectToDatabase()
  })

  await connectToDatabase()
}
