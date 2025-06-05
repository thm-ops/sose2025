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

export class PayPalApiService {
    private static instance: Client;

    constructor() {
        PayPalApiService.getClient();
    }

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

    public async createOrder(cart: Cart): Promise<Order> {
        const client = PayPalApiService.getClient();
        const ordersController = new OrdersController(client);

        function formatPrice(cents: number): string {
            return (
                Math.floor(cents / 100).toString() +
                "." +
                Math.round(cents % 100)
                    .toString()
                    .padStart(2, "0")
            );
        }

        const items: Item[] = [];
        let total = 0;
        for (const entry of cart) {
            const item = rubberDuckData.find((x) => x.id == entry.id);
            if (item) {
                total += Math.round(item.price * entry.qty * 100);
                items.push({
                    name: item.name,
                    quantity: entry.qty.toString(),
                    description: item.description,
                    category: ItemCategory.PhysicalGoods,
                    imageUrl: "https://picsum.photos/seed/" + item.id.toString() + "/800/800.jpg",
                    unitAmount: {
                        currencyCode: "EUR",
                        value: formatPrice(item.price * 100),
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
                            value: formatPrice(total),
                            breakdown: {
                                itemTotal: {
                                    currencyCode: "EUR",
                                    value: formatPrice(total),
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
