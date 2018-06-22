export default {
  Comment: {
    author: async ({ authorId }: { authorId: string }, args, context) => {
      const result = await context.model.UserModel.findById(authorId);
      return result;
    },
  },
  Mutation: {
    addComment: async (root, { comment }: { comment: any }, context) => {
      const commentResult = await context.model.CommentModel.addComment(comment);
      const { articleId } = comment;
      const { id } = commentResult;
      const result = await context.model.ArticleModel.insertComment(articleId, id);
      return result;
    },
  },
};
