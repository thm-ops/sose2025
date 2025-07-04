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
import {PayPalOrder} from "@/types/paypal";

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
            const clientId = "AaSSId07SE-NneCnC6AntNjZS2Km5889IOj-3YC6KPv0gDE05aIUEHi5VyalbTKtHZGdkjyMWXW2LpEE";
            const secret = "EAcyPQY4Fq8K8wrx0PohVW-jtRfGKdyP7CjVhJNbJoz8o-IHPZwaXJyGJnS1dRKcysnJ5SupBSqd15xK";
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
     * Retrieves a PayPal order by its ID.
     *
     * This method fetches the details of an existing PayPal order using the provided order ID.
     *
     * @param {string} id - The PayPal order ID to retrieve.
     * @returns {Promise<Order>} A promise that resolves to the retrieved PayPal order.
     */
    async getOrder(id: string): Promise<Order> {
        const client: Client = PayPalApiService.getClient();
        const ordersController = new OrdersController(client);
        const order = await ordersController.getOrder({
            id: id,
            fields: "purchase_units"
        });
        return order.result;
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
    public static async createOrder(cart: Cart): Promise<Order> {
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
// In your PayPal service file
    static async captureOrder(orderId: string) {
        try {
            const client: Client = PayPalApiService.getClient();
            const ordersController = new OrdersController(client);

            const captureRequest = {
                id: orderId,
                // Make sure to include proper headers
                prefer: "return=representation"
            };

            const capture = await ordersController.captureOrder(captureRequest);
            return capture.result;
        } catch (error) {
            console.error('PayPal capture error:', error);
            throw error;
        }
    }

    // Dans votre service PayPal
    public static async getOrder(orderId: string): Promise<Order | null> {
        try {
            console.log('=== PAYPAL GET ORDER ===');
            console.log('Fetching order with ID:', orderId);

            const client = PayPalApiService.getClient();
            const ordersController = new OrdersController(client);

            const order = await ordersController.getOrder({
                id: orderId,
                fields: "purchase_units"
            });

            console.log('PayPal order response:', JSON.stringify(order.result, null, 2));

            return order.result;
        } catch (error) {
            console.error('PayPal get order error:', error);
            console.error('Error details:', {
                message: (error as any)?.message,
                statusCode: (error as any)?.statusCode,
                details: (error as any)?.details
            });
            return null;
        }
    }
    async captureOrder(id: string) {
        try {
            const client: Client = PayPalApiService.getClient();
            const ordersController = new OrdersController(client);

            const captureRequest = {
                id: id,
                prefer: "return=representation"
            };

            const capture = await ordersController.captureOrder(captureRequest);
            return capture.result;
        } catch (error) {
            console.error('PayPal capture error:', error);
            throw error;
        }
    }
}