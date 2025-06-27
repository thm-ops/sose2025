import OrderEditPage from "./OrderEdit.component";

interface PageProps {
    params: Promise<{ orderId: string }>;
}

export default async function Page({ params }: PageProps) {
    const { orderId } = await params;

    return <OrderEditPage orderId={orderId} />;
}
