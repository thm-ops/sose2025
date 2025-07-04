"use client";
import React, { FunctionComponent, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { PowerIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "@sose2025/web/public/logo.webp";
import Image from "next/image";
import Link from "next/link";

/**
 * @constant navigation
 * @type {Array<{name: string, href: string}>}
 * @description Contains the names and links of the navigation items displayed in the header.
 */
const navigation = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Bestellungen", href: "/admin/orders" },
    { name: "Produkte", href: "/admin/products" },
];

/**
 * @component AdminHeader
 * @description The header component for the admin dashboard, providing navigation and logout functionality.
 */
const AdminHeader: FunctionComponent = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <AdminHeaderLogo setMobileMenuOpen={setMobileMenuOpen} />
                <AdminHeaderItems />
                <AdminHeaderLogoutButton />
            </div>
            <AdminMobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        </header>
    );
};

/**
 * @component AdminHeaderLogo
 * @param setMobileMenuOpen - Function to set the mobile menu open state.
 * @description Displays the logo and a button to open the mobile menu.
 */
function AdminHeaderLogo({ setMobileMenuOpen }: { setMobileMenuOpen: (open: boolean) => void }) {
    return (
        <div className="flex flex-1 items-center gap-x-6">
            <Link href="/admin/dashboard">
                <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-3 p-3 md:hidden">
                    <Bars3Icon aria-hidden="true" className="size-5 text-gray-900" />
                </button>
                <Image alt="Logo" src={Logo} className="h-8 w-auto" />
            </Link>
        </div>
    );
}

/**
 * @component AdminHeaderLogoutButton
 * @description Displays a logout button with an icon.
 */
function AdminHeaderLogoutButton() {
    return (
        <div className="flex flex-1 items-center justify-end gap-x-8">
            <a
                href="#"
                className="-m-1.5 p-1.5 flex items-center gap-x-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:scale-105 transition-transform">
                <PowerIcon aria-hidden="true" className="size-6 text-gray-900" />
                <span className="">Abmelden</span>
            </a>
        </div>
    );
}

/**
 * @component AdminMobileMenuCloseButton
 * @param setMobileMenuOpen - Function to set the mobile menu open state.
 * @description Button to close the mobile menu.
 */
function AdminMobileMenuCloseButton({ setMobileMenuOpen }: { setMobileMenuOpen: (open: boolean) => void }) {
    return (
        <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 p-2.5 text-gray-700">
            <span className="sr-only">Menü schließen</span>
            <XMarkIcon aria-hidden="true" className="size-6" />
        </button>
    );
}

/**
 * @component AdminMobileMenu
 * @param mobileMenuOpen - State indicating if the mobile menu is open.
 * @param setMobileMenuOpen - Function to set the mobile menu open state.
 * @description The mobile menu component for the admin dashboard.
 */
function AdminMobileMenu({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean; setMobileMenuOpen: (open: boolean) => void }) {
    return (
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
                <div className="-ml-0.5 flex h-16 items-center gap-x-6">
                    <AdminMobileMenuCloseButton setMobileMenuOpen={setMobileMenuOpen} />
                    <div className="-ml-0.5">
                        <Link href="/admin/dashboard" className="-m-1.5 block p-1.5">
                            <span className="sr-only">Rubber Ducking</span>
                            <Image alt="Logo" src={Logo} className="h-8 w-auto" />
                        </Link>
                    </div>
                </div>
                <AdminMobileItems />
            </DialogPanel>
        </Dialog>
    );
}

/**
 * @component AdminMobileItems
 * @description Renders the navigation items for the mobile menu.
 */
function AdminMobileItems() {
    return (
        <div className="mt-2 space-y-2">
            {navigation.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    {item.name}
                </a>
            ))}
        </div>
    );
}

/**
 * @component AdminHeaderItems
 * @description Renders the navigation items for the desktop header.
 */
function AdminHeaderItems() {
    return (
        <nav className="hidden md:flex md:gap-x-11 md:text-sm/6 md:font-semibold md:text-gray-700">
            {navigation.map((item) => (
                <a key={item.name} href={item.href}>
                    {item.name}
                </a>
            ))}
        </nav>
    );
}

export default AdminHeader;
