import { Context } from 'koa';
import * as keyUtil from '../utils/generate_object_key';

export default abstract class Model {
  ctx: Context;
  keyUtil = keyUtil;
  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  public abstract count();
}
