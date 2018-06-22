import * as glob from 'glob';
import * as Application from 'koa';
import * as path from 'path';
import * as R from 'ramda';
import Logger from '../utils/logger';
const { resolve } = path;

export default (app: Application) => {
  try {
    Logger.info('loading middlewares');
    const baseDir = resolve(__dirname, './items/');
    const pattern = baseDir + '/**/*.js';
    const g = new glob.Glob(pattern, {
      mark: true,
      sync: true,
    });
    const load = R.compose(
      R.map(R.compose(
          R.map((i: (app: Application) => {}) => i(app)),
          require,
        ),
      ),
    );
    load(g.found);
  } catch (error) {
    Logger.error(error);
    throw error;
  }
};
