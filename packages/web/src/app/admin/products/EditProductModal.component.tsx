"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";
import ProductForm from "./ProductForm.component";

// Define the props interface for the EditProductModal component.
interface EditProductModalProps {
    isOpen: boolean; // Controls if the modal is visible.
    onClose: () => void; // Function to close the modal.
    onEdit: (formData: Partial<RubberDuck>) => void; // Callback for form submission.
    product: RubberDuck | null; // The product data to be edited.
}

/**
 * @component EditProductModal
 * @description A modal dialog for editing an existing product, using Headless UI.
 */
export default function EditProductModal({ isOpen, onClose, onEdit, product }: EditProductModalProps) {
    // Guard clause: Don't render the modal if no product is selected.
    if (!product) return null;

    return (
        // Headless UI Transition component to animate the modal's appearance.
        <Transition.Root show={isOpen} as={Fragment}>
            {/* Headless UI Dialog to manage the modal state and accessibility. */}
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                {/* Modal backdrop overlay. */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        {/* Transition for the modal panel itself. */}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            {/* The main modal panel, which contains the content. */}
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                                {/* The title of the modal. */}
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 border-b border-gray-200 pb-4">
                                    Produkt bearbeiten
                                </Dialog.Title>
                                <div className="mt-5">
                                    {/* Render the reusable ProductForm, passing the product data and handlers. */}
                                    <ProductForm product={product} onSubmit={onEdit} onCancel={onClose} />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
