/**
 * Kiểm tra định dạng email hợp lệ
 * @param {string} email - Chuỗi email cần kiểm tra
 * @returns {boolean} - true nếu hợp lệ, false nếu sai
 */
export function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
