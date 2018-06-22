import { Context } from 'koa';
import BaseModel from '../../base_model';
import DataLoader from '../../data_loader';
export default class ArticleModel extends BaseModel {
  dataLoader: DataLoader<string, any>;
  constructor(ctx: Context) {
    super(ctx);
    this.dataLoader = new DataLoader((keys) => new Promise((resolve, reject) => {
      this.ctx.connector.BlogArticle.find({
        _id: {
          $in: keys,
        },
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        return reject(err);
      });
    }));
  }
  async findAll() {
    const result = await this.ctx.connector.BlogArticle.find();
    return result;
  }

  async addArticle (article: any) {
    const { BlogArticle } = this.ctx.connector;
    const articleInfo = new BlogArticle(article);
    const result = await articleInfo.save();
    // const result = await this.getCommentById(user.userName);
    return result;
  }

  async insertComment(articleId, commentId) {
    const article = await this.findById(articleId);

    const ids = article.commentIds || [];

    ids.push(commentId);

    article.commentIds = ids;

    const result = await this.ctx.connector.BlogArticle.findByIdAndUpdate({
      _id: article._id,
    }, article);

    return result;
  }

  async findByTitle(title: string) {
    const result = await this.ctx.connector.BlogArticle.find({
      title,
    });
    return result;
  }

  async findById(id: string) {
    const result = await this.getArticleById(id);
    return result;
  }

  async count() {
    const result = await this.ctx.connector.BlogArticle.count();
    return result;
  }

  async getByIds(ids: [string]) {
    const result = await this.dataLoader.loadManyItems(ids);
    return result;
  }

  async getArticleById(id: string) {
    const result = await this.dataLoader.loadOne(id);
    return result;
  }
}
