export const formatDateForInput = (inputDate: Date | string): string => {
  const date = new Date(inputDate)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


export const calculateTimeLeft = (inputDate: Date | string): string => {
  const expiryDate = new Date(inputDate);
  const now = new Date();
  const timeLeft = expiryDate.getTime() - now.getTime();
  if (timeLeft < 0) {
    return "Auction ended";
  }
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (days > 0) {
    return `${days}d ${hours}h left`; 
  } 
  if (hours > 0) {
    return `${hours}h ${minutes}m left`; 
  } 
  if (minutes > 0) {
    return `${minutes}m ${seconds}s left`; 
  } 
  if (seconds > 0) {
    return `${seconds}s left`; 
  }
  
  return "Ending soon";
};