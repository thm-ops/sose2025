/* eslint-disable camelcase */
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
import subscriptionType from "@/lib/model/subscription/Subscription.type";
import productType from "@/lib/model/product/Product.type";
import planType from "@/lib/model/subscription/Plan.type";

interface OAuthResponse {
    scope: string;
    access_token: string;
    token_type: string;
    app_id: string;
    expires_in: number;
    nonce: string;
}

interface ListProductResponse {
    total_items: number;
    total_pages: number;
    products: productType[];
}

interface ListPlanResponse {
    plans: planType[];
}

interface CreateProductResponse {
    id: string;
    name: string;
    description: string;
    type: string;
    category: string;
}

interface GetPlanIdResponse {
    id: string;
}

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

    /**
     * Creates an OAuthToken to use the v1 REST API
     *
     * @returns {Promise<string>} A Promise that resolves to the OAuthToken
     */
    public async getOAuthToken() {
        const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
        const secret = process.env.PAYPAL_SECRET;
        const response = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
            method: "POST",
            headers: {
                ContentType: "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
            },
            body: "grant_type=client_credentials",
        });
        if (!response.ok) {
            throw new Error(`Unable to get oauth token: ${response.status} ${response.statusText}`);
        }
        const data = (await response.json()) as OAuthResponse;
        return data.access_token;
    }

    /**
     * Creates a Product with the v1 REST API
     *
     * @param product The product that should be created
     * @returns {Promise<string>} A promise that resolves to the productId of the created product
     */
    public async createProduct(product: productType) {
        const OAuthToken = await this.getOAuthToken();
        const response = await fetch("https://api-m.sandbox.paypal.com/v1/catalogs/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Prefer: "return=representation",
                Authorization: `Bearer ${OAuthToken}`,
            },
            body: JSON.stringify({
                name: product.name,
                description: product.description,
                type: "PHYSICAL",
                category: "TOYS_AND_GAMES",
            }),
        });
        if (!response.ok) {
            throw new Error(`Unable to create product for ${product.name} ${response.statusText}`);
        }
        return ((await response.json()) as CreateProductResponse).id;
    }

    /**
     * Creates a new PayPal plan to make a subscription
     *
     * @param subscriptionProduct The product of which a subscription plan should be made
     * @param paypalProductId The PayPal ProductId of the product
     * @returns {Promise<string>} A promise that resolves to the planId of the created plan
     */
    public async createPlanId(subscriptionProduct: subscriptionType, paypalProductId: string) {
        const OAuthToken = await this.getOAuthToken();
        const response = await fetch("https://api-m.sandbox.paypal.com/v1/billing/plans", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${OAuthToken}`,
                Prefer: "return=representation",
            },
            body: JSON.stringify({
                product_id: paypalProductId,
                name: `${subscriptionProduct.name} Plan`,
                description: subscriptionProduct.description,
                status: "ACTIVE",
                billing_cycles: [
                    {
                        frequency: {
                            interval_unit: "MONTH",
                            interval_count: 1,
                        },
                        tenure_type: "REGULAR",
                        sequence: 1,
                        total_cycles: 0, // 0 means the plan repeats indefinitely until cancelled
                        pricing_scheme: {
                            fixed_price: {
                                value: subscriptionProduct.price,
                                currency_code: "EUR",
                            },
                        },
                    },
                ],
                payment_preferences: {
                    auto_bill_outstanding: true,
                    setup_fee: {
                        value: "0",
                        currency_code: "EUR",
                    },
                    setup_fee_failure_action: "CONTINUE",
                    payment_failure_threshold: 3,
                },
            }),
        });
        if (!response.ok) {
            throw new Error(`Unable to create Plan for ${subscriptionProduct.name} \n Error: ${response.status} ${response.statusText}`);
        }
        return ((await response.json()) as GetPlanIdResponse).id;
    }

    /**
     * Searches the product catalog for the product and calls createProduct if the product doesn't exist
     * @param product The product of which a productId is needed
     * @returns {Promise<string>} A promise that resolves to the productId of the product
     */
    public async getProductId(product: productType) {
        const OAuthToken = await this.getOAuthToken();
        const products = await fetch("https://api-m.sandbox.paypal.com/v1/catalogs/products?page_size=2&page=1&total_required=true", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${OAuthToken}`,
            },
        });
        if (!products.ok) {
            throw new Error(`Unable to list products`);
        }
        const data = (await products.json()) as ListProductResponse;
        let productId = null;
        for (let i = 0; i < data.products.length; i++) {
            if (data.products[i].name == product.name) {
                productId = data.products[i].id;
                break;
            }
        }
        if (productId == null) {
            productId = await this.createProduct(product);
        }
        return productId;
    }

    /**
     * Searches the existing plans for a plan containing the product and calls createPlanId if no plan exists
     * @param subscriptionProduct The product of which a PlanId is needed
     * @returns {Promise<string>} A promise that resolves to the planId of the plan
     */
    public async getPlanId(subscriptionProduct: subscriptionType) {
        const OAuthToken = await this.getOAuthToken();
        const productId = await this.getProductId(subscriptionProduct);

        const plans = await fetch("https://api-m.sandbox.paypal.com/v1/billing/plans?sort_by=create_time&sort_order=desc", {
            headers: {
                Authorization: `Bearer ${OAuthToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
                Prefer: "return=representation",
            },
        });
        if (!plans.ok) {
            throw new Error("Unable to list plans");
        }

        const plansData = (await plans.json()) as ListPlanResponse;
        let planId = null;
        for (let i = 0; i < plansData.plans.length; i++) {
            if (plansData.plans[i].name == subscriptionProduct.name + " Plan" && plansData.plans[i].status == "ACTIVE") {
                planId = plansData.plans[i].id;
            }
        }
        if (planId == null) {
            planId = await this.createPlanId(subscriptionProduct, productId);
        }
        return planId;
    }
}
