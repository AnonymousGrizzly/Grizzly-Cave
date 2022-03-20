
export const formatDate = (date) => {

    if (typeof date === 'string') {
      date = new Date(date);
    }
    if(typeof date === 'number'){
      date = new Date(date*1000);
    }
    return date.toLocaleDateString('sl');
};