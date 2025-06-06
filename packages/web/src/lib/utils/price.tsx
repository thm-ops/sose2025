/**
 * Utility class for formatting and converting price values.
 *
 * Provides static methods to display prices as formatted currency strings and to convert price values into string representations.
 *
 * @remarks
 * This class is abstract and should not be instantiated.
 */
export abstract class Price {
    /**
     * Formats the given price as a currency string.
     *
     * @param priceInCents - The price in cents to format.
     * @param currency - The currency code (default: "EUR").
     * @param locale - The locale for formatting (default: "de-DE").
     * @returns The formatted price string.
     */
    static display(priceInCents: number, currency: string = "EUR", locale: string = "de-DE"): string {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 2,
        }).format(priceInCents / 100);
    }

    /**
     * Converts a price value in cents to a string representation.
     *
     * @param price - The price in cents (e.g., 1234 for "€12.34").
     * @returns The formatted price string in the format "12.34".
     */
    static toString(price: number): string {
        let minor = Math.round(price % 100);
        const major = (price - minor) / 100;
        minor = Math.abs(minor);
        return major.toString() + "." + minor.toString().padStart(2, "0");
    }
}
