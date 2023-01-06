import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  location: { type: String },
  postLikes: [
    {
      username: { type: String, required: true },
      dateCreated: { type: String, required: true },
    },
  ],
  comments: [
    {
      username: { type: String, required: true },
      content: { type: String, required: true },
      dateCreated: { type: String, required: true },
      commentLikes: [
        {
          username: { type: String, required: true },
          dateCreated: { type: String, required: true },
        },
      ],
    },
  ],
  dateCreated: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;