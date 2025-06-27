import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

/**
 * @component Button
 * @description A general-purpose button component styled with Tailwind UI for the admin page.
 */
export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            {...props}>
            {children}
        </button>
    );
}
