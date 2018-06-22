
export default {
  Query: {
    users: async (root, args, context) => {
      const result = await context.model.UserModel.findAll();
      return result;
    },
    user: async (root, { userName }: { userName: string }, context) => {
      const result = await context.model.UserModel.findByName(userName);
      return result;
    },
  },
};
