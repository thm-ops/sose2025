import Cart from "@/lib/model/cart/Cart.model";
import { ShoppingCartItem } from "./cart.component";
import { rubberDuckData } from "@/data/data";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";

const rubberDucks = rubberDuckData;

/**
 * Fetching products for given Cart
 *
 * @param cart
 * @returns
 */
export function fetchProductsForCart(cart: Cart): ShoppingCartItem[] {
    return cart.map((item) => {
        return {
            ...(rubberDucks.find((duck) => duck.id === item.id) as RubberDuck),
            quantity: item.qty,
            inStock: true,
        };
    });
}
