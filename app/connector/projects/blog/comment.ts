import * as mongoose from 'mongoose';
import { BlogConnection } from '../../../database/connections';
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: String,
  authorId: Number,
  gmtCreated: Date,
  lastModified: Date,
}, {
  versionKey: false,
  timestamps: { createdAt: 'gmtCreated', updatedAt: 'lastModified' },
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
  collection: 'comment',
});

export default BlogConnection.getConn().model('BlogComment', commentSchema);
