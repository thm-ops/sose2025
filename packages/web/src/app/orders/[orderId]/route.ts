// src/app/api/orders/[orderId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PayPalApiService } from '@/lib/paypal';
import { orderCache } from '../../paypal/route'; // Importer le cache partagé

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ orderId: string }> }
) {
    try {
        const { orderId } = await context.params;

        if (!orderId) {
            return NextResponse.json(
                { error: 'Order ID is required' },
                { status: 400 }
            );
        }

        // First check the cache
        const cachedOrder = orderCache.get(orderId);
        if (cachedOrder) {
            console.log('Found order in cache:', cachedOrder);

            // Calculate amounts from cache
            const subtotal = cachedOrder.subtotal || 0;
            const shipping = cachedOrder.shipping || 500; // 5€ par défaut
            const tax = cachedOrder.tax || (subtotal * 0.19);
            const total = cachedOrder.total || (subtotal + shipping + tax);

            const orderResponse = {
                id: orderId,
                status: cachedOrder.status || 'COMPLETED',
                purchaseUnits: [{
                    amount: {
                        currencyCode: 'EUR',
                        value: (total / 100).toFixed(2)
                    },
                    items: cachedOrder.cart && Array.isArray(cachedOrder.cart)
                        ? cachedOrder.cart.map((item) => ({
                            name: `Product ${item.id}`,
                            quantity: item.qty.toString(),
                            unitAmount: {
                                currencyCode: 'EUR',
                                value: (item.price / 100).toFixed(2)
                            },
                            sku: item.id.toString()
                        }))
                        : []
                }],
                createTime: cachedOrder.createdAt,
                payer: cachedOrder.paypalOrder?.payer,
                // Ajouter les détails de facturation
                orderDetails: {
                    subtotal: subtotal,
                    shipping: shipping,
                    tax: tax,
                    total: total
                }
            };

            return NextResponse.json({ order: orderResponse });
        }
        // Trying to recover from PayPal
        try {
            const order = await PayPalApiService.getOrder(orderId);

            if (order) {
                console.log('Order found in PayPal:', order);
                return NextResponse.json({ order });
            }
        } catch (error) {
            console.log('Could not fetch from PayPal (order might be captured):', error);
        }

        console.log('Using mock order data for:', orderId);
        const mockOrder = {
            id: orderId,
            status: 'COMPLETED',
            purchaseUnits: [{
                amount: {
                    currencyCode: 'EUR',
                    value: '25.00'
                },
                items: [{
                    name: 'Premium Rubber Duck',
                    quantity: '1',
                    unitAmount: {
                        currencyCode: 'EUR',
                        value: '25.00'
                    },
                    sku: '1'
                }]
            }],
            payer: {
                name: {
                    givenName: 'Test',
                    surname: 'User'
                },
                emailAddress: 'test@example.com'
            },
            createTime: new Date().toISOString()
        };

        return NextResponse.json({ order: mockOrder });
    } catch (error) {
        console.error('Error fetching order:', error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        return NextResponse.json(
            { error: 'Failed to fetch order details', details: errorMessage },
            { status: 500 }
        );
    }
}