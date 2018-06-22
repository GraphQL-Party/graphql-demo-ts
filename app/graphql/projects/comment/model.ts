import { Context } from 'koa';
import BaseModel from '../../base_model';
import DataLoader from '../../data_loader';
export default class CommentModel extends BaseModel {
  dataLoader: DataLoader<string, any>;
  constructor(ctx: Context) {
    super(ctx);
    this.dataLoader = new DataLoader((keys) => new Promise((resolve, reject) => {
      this.ctx.connector.BlogComment.find({
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
    const result = await this.ctx.connector.BlogComment.find();
    return result;
  }

  async addComment (comment: any) {
    const { BlogComment } = this.ctx.connector;
    const commentInfo = new BlogComment(comment);
    const result = await commentInfo.save();
    // const result = await this.getCommentById(user.userName);
    return result;
  }

  async findById(id: number) {
    const result = await this.getCommentById(id);
    return result;
  }

  async count() {
    const result = await this.ctx.connector.BlogComment.count();
    return result;
  }

  async getByIds(ids: [number]) {
    const result = await this.dataLoader.loadManyItems(ids);
    return result;
  }

  async getCommentById(id: number) {
    const result = await this.dataLoader.loadOne(id);
    return result;
  }
}
