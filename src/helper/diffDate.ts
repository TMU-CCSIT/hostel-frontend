export  function dateDiffInDays(dateStr1: string, dateStr2: string): number {
    // Parse the input date strings into Date objects
    const [day1, month1, year1] = dateStr1.split('/').map(Number);
    const [day2, month2, year2] = dateStr2.split('/').map(Number);
  
    const date1 = new Date(year1, month1 - 1, day1); // month is 0-based (0 = January)
    const date2 = new Date(year2, month2 - 1, day2);
  
    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  
    // Convert the difference from milliseconds to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
    return diffInDays;

  }
  
  

  