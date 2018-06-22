import * as fs from 'fs';
import {
  makeExecutableSchema,
  mergeSchemas,
} from 'graphql-tools';
import { Context } from 'koa';
import * as mergeGraphqlSchemas from 'merge-graphql-schemas';
import * as path from 'path';
// import * as Error from 'graphql-errors';
import logger from '../utils/logger';
import loadRemotes from './remotes';

const { fileLoader, mergeTypes, mergeResolvers } = mergeGraphqlSchemas;

const { resolve } = path;
const SYMBOL_GRAPHQL_SCHEMA_CLASS = Symbol('Application#Context#graphqlSchema');
const SYMBOL_MODEL_CLASS = Symbol('Application#Context#model');

export const loadSchemasAndModels = async (context: Context) => {
  try {
    logger.info('loading graphql schemas and models');

    const baseDir = resolve(__dirname, './projects/');
    const types = fs.readdirSync(baseDir);

    const models = {};
    // const directives = {};

    types.map((type) => {
      // 加载 model
      const modelFile = path.join(baseDir, type, 'model.ts');
      if (fs.existsSync(modelFile)) {
        logger.info('loading model ' + type);
        const modelClass = require(modelFile).default;
        const model = new modelClass.prototype.constructor(context);
        models[model.constructor.name] = model;
      }

      // 加载directive resolver
      // const directiveFile = path.join(baseDir, type, 'directive.ts');
      // let directive = {};
      // if (fs.existsSync(directiveFile)) {
      //   logger.info('loading directive resolver ' + type);
      //   directive = require(directiveFile).default;
      // }
    });
    logger.info('merging schemas and resolvers');

    const schemas = fileLoader(path.join(__dirname, './**/*'), {
      extensions: ['.gql', '.graphql', '.graphqls'],
    });
    const typeDefs = mergeTypes(schemas);
    const resolvers = fileLoader(path.join(__dirname, './**/resolver.ts'));

    const graphqlSchema = makeExecutableSchema({
      typeDefs,
      resolvers: mergeResolvers(resolvers),
      logger: {
        log: (e) => logger.error(e),
      },
    });

    // addMockFunctionsToSchema({
    //   schema: graphqlSchema,
    //   preserveResolvers: true,
    // });

    const mergedSchemas = await loadRemotes();
    mergedSchemas.push(graphqlSchema);
    const mergedSchema = mergeSchemas({
      schemas: mergedSchemas,
    });

    Object.defineProperty(context, 'graphqlSchema', {
      get() {
        if (!this[SYMBOL_GRAPHQL_SCHEMA_CLASS]) {
          this[SYMBOL_GRAPHQL_SCHEMA_CLASS] = mergedSchema;
        }
        return this[SYMBOL_GRAPHQL_SCHEMA_CLASS];
      },
    });

    Object.defineProperty(context, 'model', {
      get() {
        if (!this[SYMBOL_MODEL_CLASS]) {
          this[SYMBOL_MODEL_CLASS] = models;
        }
        return this[SYMBOL_MODEL_CLASS];
      },
    });
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
