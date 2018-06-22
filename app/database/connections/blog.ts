import * as mongoose from 'mongoose';
import config from '../../config';
import Logger from '../../utils/logger';

require('mongoose').Promise = Promise;

export default class ConnTrack {
  static connInst: ConnTrack = null;

  conn: mongoose.Connection;

  constructor () {
    this.conn = mongoose.createConnection(config.dataSources.dbBlog.uri, config.dataSources.dbBlog.options);
  }

  static getConn () {
    if (ConnTrack.connInst) {
      return ConnTrack.connInst.conn;
    } else {
      ConnTrack.connInst = new ConnTrack();
      return ConnTrack.connInst.conn;
    }
  }

  async initDB () {
    return new Promise((resolve, reject) => {
      if (!this.conn) {
        this.conn = mongoose.createConnection(config.dataSources.dbBlog.uri, config.dataSources.dbBlog.options);
      }

      if (config.env === 'development') {
        mongoose.set('debug', true);
      }

      this.conn.on('disconnected', () => {
        mongoose.connect(config.dataSources.dbBlog.uri);
      });

      this.conn.on('error', (err) => {
        reject(err);
      });

      this.conn.on('open', () => {
        resolve(this.conn);
      });

      this.conn.once('open', () => {
        Logger.info('Connected to MongoDB', config.dataSources.dbBlog.uri);
      });
    });
  }
}
