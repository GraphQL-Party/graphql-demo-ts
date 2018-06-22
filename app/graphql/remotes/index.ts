import { createApolloFetch } from 'apollo-fetch';
import * as Promise from 'bluebird';
import {
  introspectSchema,
  makeRemoteExecutableSchema,
} from 'graphql-tools';
import * as _ from 'lodash';
import config from '../../config';
import logger from '../../utils/logger';

export default async () => {
  if (config.graphql && !_.isEmpty(config.graphql.remotes)) {
    const result = Promise.map(config.graphql.remotes, (async (uri: string) => {
      logger.info(`loading remote schema from { ${uri} }`);
      const fetcher = createApolloFetch({ uri });
      const schema = makeRemoteExecutableSchema({
        schema: await introspectSchema(fetcher),
        fetcher,
      });
      return schema;
    }));
    return result;
  } else {
    return [];
  }
};
