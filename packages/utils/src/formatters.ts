/**
 * Format a date string to a localized date format
 * @param dateString - The date string to format
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale = 'en-US'): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  /**
   * Format a number as a currency string
   * @param value - The number to format
   * @param currency - The currency code (default: 'USD')
   * @param locale - The locale to use for formatting (default: 'en-US')
   * @returns Formatted currency string
   */
  export function formatCurrency(value: number, currency = 'USD', locale = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value);
  }