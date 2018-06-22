
export default {
  Query: {
    articles: async (root, args, context) => {
      const result = await context.model.ArticleModel.findAll();
      return result;
    },
    article: async (root, { title }: { title: string }, context) => {
      const result = await context.model.ArticleModel.findByTitle(title);
      return result;
    },
  },
  Article: {
    author: async ({ authorId }: { authorId: number }, args, context) => {
      const result = await context.model.UserModel.findById(authorId);
      return result;
    },
    comments: async ({ commentIds }: { commentIds: [number] }, args, context) => {
      const result = await context.model.CommentModel.getByIds(commentIds);
      return result;
    },
  },
};
