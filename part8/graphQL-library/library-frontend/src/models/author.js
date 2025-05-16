import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  born: { type: Number }
})

export default mongoose.model('Author', authorSchema)
