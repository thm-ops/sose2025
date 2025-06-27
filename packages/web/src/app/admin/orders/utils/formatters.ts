export const formatPrice = (priceInCents: number): string =>
    (priceInCents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });

export const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString("de-DE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
