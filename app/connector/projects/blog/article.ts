import * as mongoose from 'mongoose';
import { BlogConnection } from '../../../database/connections';
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: String,
  content: String,
  authorId: String,
  commentIds: [String],
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
  collection: 'article',
});

export default BlogConnection.getConn().model('BlogArticle', articleSchema);
