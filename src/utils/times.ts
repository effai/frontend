import moment from 'moment';

export const timeStatus = (dt: number): string => {
  const date = moment.unix(dt);
  const now = moment();
  
  const diffInSeconds = now.diff(date, 'seconds');
  
  if (diffInSeconds < 60) {
    return 'Few seconds ago';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} mins ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
}

