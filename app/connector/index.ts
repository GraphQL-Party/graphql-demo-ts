
// import * as fs from 'fs';
// import { Description } from 'graphql-decorators';
import * as glob from 'glob';
import { Context } from 'koa';
import * as path from 'path';
import * as R from 'ramda';
import logger from '../utils/logger';

const { resolve } = path;
const SYMBOL_CONNECTOR_CLASS = Symbol('Application#Context#connector');

export const loadConnectors = (context: Context): void => {
  try {
    logger.info('loading connectors');
    const baseDir = resolve(__dirname, './projects/');
    const pattern = baseDir + '/**/index.ts';
    const g = new glob.Glob(pattern, {
      mark: true,
      sync: true,
    });
    Object.defineProperty(context, 'connector', {
      get() {
        if (!this[SYMBOL_CONNECTOR_CLASS]) {
          let connectorsMap: any = {};
          R.map(R.compose(
            (connectorss: object) => {
              connectorsMap = R.merge(connectorsMap, connectorss);
            },
            require,
          ))(g.found);
          this[SYMBOL_CONNECTOR_CLASS] = connectorsMap;
        }
        return this[SYMBOL_CONNECTOR_CLASS];
      },
    });
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
