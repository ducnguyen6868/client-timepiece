/**
 * @param {Date|number|string} date - Date object, timestamp, hoặc ISO string
 * @param {string} format - ví dụ: 'DD/MM/YYYY HH:mm:ss' hoặc 'YYYY-MM-DD'
 * @returns {string}
 */
export const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
