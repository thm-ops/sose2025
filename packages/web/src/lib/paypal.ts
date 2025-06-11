import {
    CheckoutPaymentIntent,
    Client,
    Environment,
    Item,
    ItemCategory,
    LogLevel,
    Order,
    OrdersController,
    ShippingType,
} from "@paypal/paypal-server-sdk";
import Cart from "./model/cart/Cart.model";
import { rubberDuckData } from "@/data/data";
import { Utils } from "./utils/mod";

/**
 * A service class for interacting with the PayPal API using a singleton client instance.
 */
export class PayPalApiService {
    private static instance: Client;

    /**
     * Initializes the PayPal client when an instance of the service is created.
     */
    constructor() {
        PayPalApiService.getClient();
    }

    /**
     * Returns the singleton instance of the PayPal client.
     * If the client has not been initialized yet, it creates a new one using
     * environment variables for authentication.
     * 
     * @returns {Client} A configured instance of the PayPal client.
     * @throws {Error} If the client ID or secret is not set in the environment variables.
     */
    public static getClient(): Client {
        if (!PayPalApiService.instance) {
            const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
            const secret = process.env.PAYPAL_SECRET;
            if (!clientId || !secret) {
                throw new Error("PayPal client ID and secret must be set");
            }

            PayPalApiService.instance = new Client({
                clientCredentialsAuthCredentials: {
                    oAuthClientId: clientId,
                    oAuthClientSecret: secret,
                },
                timeout: 0,
                environment: Environment.Sandbox,
                logging: {
                    logLevel: LogLevel.Warn,
                    logRequest: {
                        logBody: true,
                    },
                    logResponse: {
                        logHeaders: true,
                    },
                },
            });
        }

        return PayPalApiService.instance;
    }

    /**
     * Creates a PayPal order based on the provided cart data.
     * 
     * Each item in the cart is mapped to a PayPal `Item` object, and the total price
     * is calculated. Shipping options are also included in the order.
     * 
     * @param {Cart} cart - The shopping cart containing product IDs and quantities.
     * @returns {Promise<Order>} A promise that resolves to the created PayPal order.
     */
    public async createOrder(cart: Cart): Promise<Order> {
        const client = PayPalApiService.getClient();
        const ordersController = new OrdersController(client);

        const items: Item[] = [];
        let total = 0;
        for (const entry of cart) {
            const item = rubberDuckData.find((x) => x.id == entry.id);
            if (item) {
                total += item.price * entry.qty;
                items.push({
                    name: item.name,
                    quantity: entry.qty.toString(),
                    description: item.description,
                    category: ItemCategory.PhysicalGoods,
                    imageUrl: "https://picsum.photos/seed/" + item.id.toString() + "/800/800.jpg",
                    unitAmount: {
                        currencyCode: "EUR",
                        value: Utils.price.toString(item.price),
                    },
                });
            }
        }

        const order = await ordersController.createOrder({
            body: {
                intent: CheckoutPaymentIntent.Capture,
                purchaseUnits: [
                    {
                        amount: {
                            currencyCode: "EUR",
                            value: Utils.price.toString(total),
                            breakdown: {
                                itemTotal: {
                                    currencyCode: "EUR",
                                    value: Utils.price.toString(total),
                                },
                            },
                        },
                        shipping: {
                            options: [
                                {
                                    id: "1",
                                    label: "Kostenloser Versand",
                                    type: ShippingType.Shipping,
                                    selected: true,
                                    amount: {
                                        currencyCode: "EUR",
                                        value: "0.00",
                                    },
                                },
                                {
                                    id: "2",
                                    label: "Standard Versand",
                                    type: ShippingType.Shipping,
                                    selected: false,
                                    amount: {
                                        currencyCode: "EUR",
                                        value: "5.00",
                                    },
                                },
                                {
                                    id: "3",
                                    label: "Express Versand",
                                    type: ShippingType.Shipping,
                                    selected: false,
                                    amount: {
                                        currencyCode: "EUR",
                                        value: "10.00",
                                    },
                                },
                                {
                                    id: "4",
                                    label: "Paketente für Entenliebhaber",
                                    type: ShippingType.Shipping,
                                    selected: false,
                                    amount: {
                                        currencyCode: "EUR",
                                        value: "512.00",
                                    },
                                },
                            ],
                        },
                        items: items,
                    },
                ],
            },
            prefer: "return=minimal",
        });
        return order.result;
    }

    /**
     * Captures a previously created PayPal order by its ID.
     * 
     * This method finalizes the payment for an approved order.
     * 
     * @param {string} id - The PayPal order ID to be captured.
     * @returns {Promise<Order>} A promise that resolves to the captured order result.
     */
    public async captureOrder(id: string): Promise<Order> {
        const client: Client = PayPalApiService.getClient();
        const ordersController = new OrdersController(client);
        const order = await ordersController.captureOrder({
            id: id,
            prefer: "return=minimal",
        });
        return order.result;
    }
}
