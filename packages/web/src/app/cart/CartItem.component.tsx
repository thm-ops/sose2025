import { ShoppingCartItem } from "@/app/cart/page";
import React from "react";
import Image from "next/image";
import { Utils } from "@/lib/utils/mod";
import QuantityControl from "./QuantityControl.component";

type CartItemProps = {
    item: ShoppingCartItem;
    onQuantityChange: (id: number, delta: number) => void;
    onDeleteItem: (id: number) => void;
};

/**
 * Displays a single item in the cart
 * @param {ShoppingCartItem} item - The item to display
 * @param {function} onQuantityChange - The function for quantity change which will be forwarded to QuantityControl.
 * @param {function} onDeleteItem - The function to delete an item
 */
const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onDeleteItem }) => {
    return (
        <li className="flex py-6 sm:py-10">
            <div className="shrink-0">
                <Image
                    src={`/media/products/${item.id}`}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="size-10 rounded-md object-cover sm:size-25"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-sm">
                                <a href={`/items/${item.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                                    {item.name}
                                </a>
                            </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">{item.color}</p>
                            {item.size && <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{item.size}</p>}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">{Utils.price.display(item.price)}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                        <QuantityControl productId={item.id} quantity={item.quantity} onQuantityChange={onQuantityChange} />
                        <div className="absolute top-0 right-0">
                            <button
                                type="button"
                                onClick={() => onDeleteItem(item.id)}
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Entfernen</span>
                                <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true">
                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
