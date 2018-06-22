import * as _ from 'lodash';
import * as path from 'path';

const { resolve } = path;

const host = process.env.HOST || 'localhost';
const env = process.env.NODE_ENV || 'development';

const conf = require(resolve(__dirname, `./${env}.ts`));

export default _.assign({
  env,
  host,
}, conf);
