"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@sose2025/web/public/logo.webp";

const navigation = [
    { name: "Produkt", href: "#" },
    // { name: 'Placeholder', href: '#' }
];

export default function Header() {
    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <Image alt="" height={512} width={512} src={Logo} className="h-8 w-auto" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400">
                        <span className="sr-only">Open main menu</span>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm/6 font-semibold text-white">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href="#" className="text-sm/6 font-semibold text-white">
                        Warenkorb <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
