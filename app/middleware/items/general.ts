import * as Application from 'koa';
import * as koaBody from 'koa-bodyparser';
import * as compress from 'koa-compress';
import * as logger from 'koa-logger';
import * as serve from 'koa-static';
import * as path from 'path';

const { resolve } = path;

const r = (pathstr: string) => resolve(__dirname, pathstr);

export const addBody = (app: Application) => {
  app.use(koaBody());
};

export const addServe = (app: Application) => {
  app.use(serve(r('../../public')));
};

export const addLogger = (app: Application) => {
  app.use(logger());
};

export const addCompress = (app: Application) => {
  app.use(compress());
};
