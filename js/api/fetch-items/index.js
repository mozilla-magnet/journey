
import dummyData from './dummy-data';

export default () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyData);
    }, 400);
  });
};
