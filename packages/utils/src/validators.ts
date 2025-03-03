/**
 * Validate an email address format
 * @param email - The email address to validate
 * @returns Whether the email is valid
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  /**
   * Validate that a string is not empty
   * @param value - The string to validate
   * @returns Whether the string is not empty
   */
  export function isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
  }