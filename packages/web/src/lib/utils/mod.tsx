import { Price } from "./price";

/**
 * Abstract utility class providing static references to commonly used utilities.
 *
 * @remarks
 * This class is intended to serve as a namespace for utility functions and constants.
 * It cannot be instantiated.
 */
export abstract class Utils {
    static price = Price;
}
