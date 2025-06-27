"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";

/**
 * @component AdminEmailField
 * @description The Email Field of the AdminLoginPage
 */
function EmailField() {
    return (
        <div className="space-y-2">
            <label htmlFor="email" className="font-medium text-gray-700">
                E-Mail Adresse
            </label>
            <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="ente@beispiel.com"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition-all duration-300 placeholder:text-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
            />
        </div>
    );
}

/**
 * @component AdminPasswordField
 * @description The Password Field of the AdminLoginPage
 */
function PasswordField() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="font-medium text-gray-700">
                    Passwort
                </label>
                <a href="#" className="text-sm font-medium text-yellow-500 hover:text-yellow-600">
                    Passwort vergessen?
                </a>
            </div>
            <div className="relative">
                <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-12 transition-all duration-300 placeholder:text-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-yellow-500"
                    aria-label="Toggle password visibility">
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
            </div>
        </div>
    );
}

/**
 * @component TwoFA
 * @description The Two-Factor Authentication Field of the AdminLoginPage
 */
function TwoFA() {
    return (
        <div className="space-y-2">
            <label htmlFor="2fa-code" className="font-medium text-gray-700">
                Bestätigungscode
            </label>
            <input
                id="2fa-code"
                name="2fa-code"
                type="text"
                autoComplete="one-time-code"
                required
                placeholder="123456"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition-all duration-300 placeholder:text-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
            />
        </div>
    );
}

/**
 * @component AdminLoginButton
 * @description The Login Button of the AdminLoginPage
 */
function LoginButton() {
    return (
        <div>
            <button
                type="submit"
                onClick={(e) => e.preventDefault()}
                className="w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
                Anmelden
            </button>
        </div>
    );
}

/**
 * @component AdminLoginForm
 * @description The login form of the AdminLoginPage
 */
function LoginForm() {
    return (
        <form className="mt-8 space-y-6">
            <EmailField />
            <PasswordField />
            <TwoFA />
            <LoginButton />
        </form>
    );
}

export default LoginForm;
