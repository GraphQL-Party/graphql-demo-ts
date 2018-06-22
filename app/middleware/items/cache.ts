import * as Application from 'koa';
import * as session from 'koa-session';
import redis from '../../lib/redis';

export const clientCache = (app: Application) => {
  app.keys = ['sxc_rgb'];
  const store = {
    get: async (key: string) => {
      const res = await redis.get(key);
      return JSON.parse(res);
    },
    set: async (key: string, sess: any) => {
      const json = JSON.stringify(sess);
      await redis.set(key, json);
    },
    destroy: async (key: string) => {
      await redis.del(key);
    },
  };
  const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    signed: true,
    rolling: false,
    store,
  };

  app.use(session(CONFIG, app));
};
