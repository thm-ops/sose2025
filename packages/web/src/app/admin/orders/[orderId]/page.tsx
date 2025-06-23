import OrderDetailPage from "./OrderDetail.component";

interface PageProps {
    params: {
        orderId: string;
    };
}

// Server Component
export default function Page({ params }: PageProps) {
    const { orderId } = params;

    return <OrderDetailPage orderId={orderId} />;
}
