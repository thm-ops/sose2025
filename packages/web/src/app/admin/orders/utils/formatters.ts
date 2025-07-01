export const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString("de-DE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
