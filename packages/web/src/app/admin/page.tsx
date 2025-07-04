"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../../public/logo.webp";
import LoginForm from "@/app/admin/AdminLoginForm.component";

/**
 * @component AdminLoginPage
 * @description The main component for the admin login page
 */
export default function App() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 font-sans">
            <div className="relative mx-4 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl shadow-gray-300/60 md:p-12">
                {/* Logo */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 transform rounded-full bg-indigo-500 p-4 shadow-lg">
                    <Image alt="Logo" src={Logo} className="h-20 w-auto" />
                </div>

                {/* Captions */}
                <div className="pt-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Admin Dashboard</h1>
                    <p className="pt-2 text-sm text-gray-500">Bitte melden Sie sich an.</p>
                </div>

                <LoginForm />

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} Rubber Ducking. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
