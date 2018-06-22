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

  async findByTitle(title: string) {
    const result = await this.ctx.connector.BlogArticle.find({
      title,
    });
    return result;
  }

  async findById(id: number) {
    const result = await this.getArticleById(id);
    return result;
  }

  async count() {
    const result = await this.ctx.connector.BlogArticle.count();
    return result;
  }

  async getByIds(ids: [number]) {
    const result = await this.dataLoader.loadManyItems(ids);
    return result;
  }

  async getArticleById(id: number) {
    const result = await this.dataLoader.loadOne(id);
    return result;
  }
}
