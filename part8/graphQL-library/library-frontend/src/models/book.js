import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 2 },
  published: Number,
  genres: [String],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
})

export default mongoose.model('Book', bookSchema)
