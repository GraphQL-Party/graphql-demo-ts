export default {
  Comment: {
    author: async ({ authorId }: { authorId: number }, args, context) => {
      const result = await context.model.UserModel.findById(authorId);
      return result;
    },
  },
};
