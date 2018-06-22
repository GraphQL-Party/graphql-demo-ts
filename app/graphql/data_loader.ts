import * as DataLoader from 'dataloader';
import * as R from 'ramda';

export default class MyDataLoader<K, V> extends DataLoader<K, V> {
  loadOne(key: any): Promise<V> {
    if (!key) {
      return null;
    } else {
      return this.load(key);
    }
  }

  loadManyItems(keys: any[]): Promise<V[]> {
    const targetKeys = R.filter((item) => !R.isEmpty(item) && !R.isNil(item), (keys || []));
    return this.loadMany(targetKeys);
  }
}
