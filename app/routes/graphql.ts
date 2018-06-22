import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa';
import costAnalysis from 'graphql-cost-analysis';
import * as depthLimit from 'graphql-depth-limit';
import { koa as koaVoyager } from 'graphql-voyager/middleware';
import { Context } from 'koa';
import { Controller, Ctx, Get, Post } from 'routing-controllers';

@Controller('')
export default class GraphqlController {

  @Get('/graphql')
  @Post('/graphql')
  async graphql(@Ctx() ctx: Context, next: () => {}) {
    await graphqlKoa({
      schema: ctx.graphqlSchema,
      tracing: true,
      cacheControl: false,
      context: ctx,
      formatResponse: (res, { query }) => {
        // return {
        //   data: res.data,
        // };
        return res;
      },
      validationRules: [
        costAnalysis({
          maximumCost: 1000,
          createError: (maximumCost: number, cost: number) => {
            throw new Error(`Query is too complex: ${cost}. Maximum allowed complexity: ${maximumCost}`);
          },
        }),
        depthLimit(4),
      ],
    })(ctx, next);
    return ctx;
  }

  @Get('/graphiql')
  async graphiql(@Ctx() ctx: Context) {
    await graphiqlKoa({
      endpointURL: '/graphql',
    })(ctx);
    return ctx;
  }

  @Get('/voyager')
  async voyager(@Ctx() ctx: Context) {
    await koaVoyager({
      endpointUrl: '/graphql',
      displayOptions: {},
    })(ctx, () => null);
    return ctx;
  }

}
