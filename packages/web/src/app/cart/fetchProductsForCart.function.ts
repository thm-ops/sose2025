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
export async function fetchProductsForCart(cart: Cart): Promise<ShoppingCartItem[]> {
    return await Promise.all(
        cart.map(async (item) => {
            return {
                ...rubberDucks.find((duck)=>duck.id === item.id) as RubberDuck,
                quantity: item.qty,
                inStock: true
            }
        })
    )
}