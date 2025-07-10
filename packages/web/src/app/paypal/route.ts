// src/app/api/paypal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PayPalApiService } from '@/lib/paypal';

interface CartItem {
    id: number;
    qty: number;
    price: number;
}

interface CachedOrder {
    paypalOrder?: any;
    cart?: CartItem[];
    subtotal?: number;
    shipping?: number;
    tax?: number;
    total?: number;
    createdAt?: string;
    status?: string;
    captureResult?: any;
    capturedAt?: string;
}

// Typed cache (shared between routes)
const orderCache = new Map<string, CachedOrder>();

export async function POST(request: NextRequest) {
    console.log('=== PAYPAL API CALLED ===');

    try {
        const body = await request.json();
        const { action, ...data } = body;

        console.log('Action:', action);
        console.log('Data:', data);

        if (action === 'create-order') {
            const { cart, subtotal, shipping, tax, total } = data;

            if (!cart || cart.length === 0) {
                return NextResponse.json(
                    { error: 'Cart is empty' },
                    { status: 400 }
                );
            }

            const order = await PayPalApiService.createOrder(cart as CartItem[]);

            // Save order details with basket info
            const orderData = {
                paypalOrder: order,
                cart: cart as CartItem[],
                subtotal: subtotal as number,
                shipping: shipping as number,
                tax: tax as number,
                total: total as number,
                createdAt: new Date().toISOString(),
                status: 'CREATED'
            };

            console.log('Caching order data:', orderData);
            orderCache.set(<string>order.id, orderData);

            return NextResponse.json({
                id: order.id,
                status: order.status
            });
        }

        if (action === 'capture-order') {
            const { orderId } = data;

            console.log('Capturing order with ID:', orderId);

            if (!orderId) {
                return NextResponse.json(
                    { error: 'Order ID is required' },
                    { status: 400 }
                );
            }

            // Captur order
            const captureResult = await PayPalApiService.captureOrder(orderId as string);

            // Update cache with full details
            const cachedOrder = orderCache.get(orderId as string);
            if (cachedOrder) {
                orderCache.set(orderId as string, {
                    ...cachedOrder,
                    captureResult: captureResult,
                    status: 'COMPLETED',
                    capturedAt: new Date().toISOString()
                });
            }

            return NextResponse.json({
                success: true,
                capture: captureResult
            });
        }

        return NextResponse.json(
            { error: 'Invalid action', receivedAction: action },
            { status: 400 }
        );
    } catch (error) {
        console.error('PayPal API error:', error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        return NextResponse.json(
            { error: 'Server error', details: errorMessage },
            { status: 500 }
        );
    }
}

// Export cache for use in other routes
export { orderCache };