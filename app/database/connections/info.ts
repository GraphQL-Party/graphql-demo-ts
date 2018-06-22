import { Connection } from 'mongoose';
import * as mongoose from 'mongoose';
import config from '../../config';
import Logger from '../../utils/logger';

require('mongoose').Promise = Promise;

export default class ConnDB {
  static connInst: ConnDB = null;

  conn: Connection;

  constructor () {
    this.conn = mongoose.createConnection(config.dataSources.dbInfo.uri, config.dataSources.dbInfo.options);
  }

  static getConn () {
    if (ConnDB.connInst) {
      return ConnDB.connInst.conn;
    } else {
      ConnDB.connInst = new ConnDB();
      return ConnDB.connInst.conn;
    }
  }

  async initDB () {
    return new Promise((resolve, reject) => {
      if (!this.conn) {
        this.conn = mongoose.createConnection(config.dataSources.dbInfo.uri, config.dataSources.dbInfo.options);
      }

      if (config.env === 'development') {
        mongoose.set('debug', true);
      }

      this.conn.on('disconnected', () => {
        mongoose.connect(config.dataSources.dbInfo.uri);
      });

      this.conn.on('error', (err) => {
        reject(err);
      });

      this.conn.on('open', () => {
        resolve(this.conn);
      });

      this.conn.once('open', () => {
        Logger.info('Connected to MongoDB', config.dataSources.dbInfo.uri);
      });
    });
  }
}
