'use client';

import QRCode from 'react-qr-code';

export default function BuyBeerPage() {
    const paypalLink = 'https://www.sandbox.paypal.com/ncp/payment/MGCAX388JARSY';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-6">
            <h1 className="text-3xl font-bold mb-4">Kauf ein Bier 🍺</h1>
            <p className="mb-2">Scanne den QR-Code oder klicke den Link unten:</p>

            <div className="bg-white shadow-md p-4 rounded-md mb-4">
                <QRCode value={paypalLink} size={200} />
            </div>

            <a
                href={paypalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-lg"
            >
                Zum PayPal-Link
            </a>
        </div>
    );
}
