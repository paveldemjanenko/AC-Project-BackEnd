import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    message: { type: String, trim: true, unique: false, required: true },
    // username: { type: String, unique: false, required: true },
    id: { type: String, unique: false, required: true },
  },
  { timestamps: true },
);

const CommentModel = mongoose.model('Comment', commentSchema);

const save = async model => new CommentModel(model).save();

const getCommentsByProduct = async id => CommentModel.find({ id });

export { save, getCommentsByProduct, commentSchema };