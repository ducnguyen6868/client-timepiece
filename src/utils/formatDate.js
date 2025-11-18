/**
 * @param {Date|number|string} date - Date object, timestamp, hoặc ISO string
 * @param {string} format - ví dụ: 'DD/MM/YYYY HH:mm:ss' hoặc 'YYYY-MM-DD'
 * @returns {string}
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
