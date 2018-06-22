import * as MD5 from 'md5';
import * as R from 'ramda';

export default (obj: any) => {
  return MD5(R.toString(obj));
};
