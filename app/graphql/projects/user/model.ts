import { Context } from 'koa';
import BaseModel from '../../base_model';
import DataLoader from '../../data_loader';
export default class UserModel extends BaseModel {
  dataLoader: DataLoader<string, any>;
  constructor(ctx: Context) {
    super(ctx);
    this.dataLoader = new DataLoader((keys) => new Promise((resolve, reject) => {
      this.ctx.connector.InfoUser.find({
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
    const result = await this.ctx.connector.InfoUser.find();
    return result;
  }

  async addUser (user: any) {
    const { InfoUser } = this.ctx.connector;
    const userInfo = new InfoUser(user);
    const res = await userInfo.save();
    return res;
  }

  async findById(userId: string) {
    const result = await this.getUserById(userId);
    return result;
  }

  async findByName(userName: string) {
    const result = await this.ctx.connector.InfoUser.find({
      userName,
    });
    return result;
  }

  async count() {
    const result = await this.ctx.connector.InfoUser.count();
    return result;
  }

  async getUsersByIds(ids: [string]) {
    const result = await this.dataLoader.loadManyItems(ids);
    return result;
  }

  async getUserById(id: string) {
    const result = await this.dataLoader.loadOne(id);
    return result;
  }
}
