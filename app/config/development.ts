export = {
  dataSources: {
    dbBlog: {
      uri: 'mongodb://127.0.0.1:27017/blog',
      options: {
        autoReconnect: true,
      },
    },
    dbInfo: {
      uri: 'mongodb://127.0.0.1:27017/test',
      options: {
        autoReconnect: true,
      },
    },
  },
  mongoClientOptions: {
    autoReconnect: true,
    reconnectTries: 20,
    reconnectInterval: 500,
    connectTimeoutMS: 30000,
  },
  port: 3000,
  redis: {
    endpoints: [
      {
        host: '127.0.0.1',
        port: 6379,
      },
    ],
  },
  base: 'http://localhost:3000',
  graphql: {
    // remotes: ['https://otherGQService.com/graphql'],
  },
};
