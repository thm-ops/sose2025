import OrderDetailPage from "./OrderDetail.component";

interface PageProps {
    params: Promise<{ orderId: string }>;
}

// Server Component
export default async function Page({ params }: PageProps) {
    const { orderId } = await params;

    return <OrderDetailPage orderId={orderId} />;
}
