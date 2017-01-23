import dummyData from './dummy-data';

export default (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const match = dummyData.find((item) => item[id] === id);
      resolve(match);
    }, 400);
  });
};
