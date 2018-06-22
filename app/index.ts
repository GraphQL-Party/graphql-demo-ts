// import fs from 'fs'
// import * as Koa from 'koa';
import { Context } from 'koa';
import { resolve } from 'path';
import 'reflect-metadata';
import { createKoaServer } from 'routing-controllers';
import conf from './config';
import { loadConnectors } from './connector';
import {
  BlogConnection,
  InfoConnection,
} from './database/connections';
import { loadSchemasAndModels } from './graphql';
import loadMiddlewares from './middleware';
import Logger from './utils/logger';

// load routes
const app = createKoaServer({
  cors: {},
  controllers: [resolve(__dirname, './routes/*.js')],
});

(async () => {
  try {
    Logger.info('create db connections');
    const dBConnection = new InfoConnection();
    await dBConnection.initDB();
    const blogConnection = new BlogConnection();
    await blogConnection.initDB();
  } catch (err) {
    Logger.error(err);
    throw err;
  }

  loadMiddlewares(app);
  loadConnectors(app.context);
  await loadSchemasAndModels(app.context);
  app.use(async (ctx: Context) => {
    ctx.status = 200;
  });

//   const { errorHandler } = require('./lib/error');

//   app.on('error', errorHandler);
  app.listen(conf.port, conf.host);
  Logger.log('100', 'green', '服务启动： http://' + conf.host + ':' + conf.port);
})();
