import moment from 'moment';

const isoDateToMoment = (isoDate: moment.MomentInput) => moment(isoDate, 'YYYY-MM-DD');

export const formatRelease = (isoDate: moment.MomentInput) => isoDateToMoment(isoDate).format('MMMM YYYY');
