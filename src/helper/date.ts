export const dateIntoReadableFormat = (fetchedDate: string): string => {

    if (!fetchedDate) return "";

    console.log(fetchedDate)

    // Get the day, month, and year from the Date object

    const value = new Date(fetchedDate)
    const day = value.getDate();

    // JavaScript months are 0-indexed, so we add 1 to get the correct month
    const month = value.getMonth() + 1;
    const year = value.getFullYear();

    // Pad day and month with leading zeros if needed
    const paddedDay = day < 10 ? `0${day}` : day;
    const paddedMonth = month < 10 ? `0${month}` : month;

    // Return the formatted date as a string
    return `${paddedDay}/${paddedMonth}/${year}`;
}
