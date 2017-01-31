import moment from 'moment';

export default (timestamp) => {
  return moment.unix(timestamp).fromNow();
};
