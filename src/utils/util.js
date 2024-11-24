export function biddingCalc(min, sec) {
  return `${min} mins ${sec} seconds`;
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  return `${day}-${month}-${year} (${hours}:${minutes}:${seconds} ${ampm})`;
}
export function projectBudget(actual_value, bid_value, bid_value2) {
  return `$${actual_value} -  $${bid_value2 || bid_value}`;
}
