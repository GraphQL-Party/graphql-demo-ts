import * as mongoose from 'mongoose';
import { InfoConnection } from '../../../database/connections';
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: String,
  mobilePhone: String,
  gmtCreated: Date,
  lastModified: Date,
  lastLoginTime: Date,
  lastLoginIp: String,
}, {
  versionKey: false,
  timestamps: { createdAt: 'gmtCreated', updatedAt: 'lastModified' },
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

export default InfoConnection.getConn().model('InfoUser', userSchema);
