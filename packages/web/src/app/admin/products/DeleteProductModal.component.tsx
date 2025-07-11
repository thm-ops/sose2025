"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";

// Define the props for the DeleteProductModal component.
interface DeleteProductModalProps {
    isOpen: boolean; // Controls if the modal is visible.
    onClose: () => void; // Function to close the modal.
    onDelete: () => void; // Callback to execute the delete action.
    product: RubberDuck | null; // The product to be deleted.
}

export default function DeleteProductModal({ isOpen, onClose, onDelete, product }: DeleteProductModalProps) {
    // Guard clause: Don't render if no product is selected.
    if (!product) return null;

    return (
        // Headless UI Transition for modal animations.
        <Transition.Root show={isOpen} as={Fragment}>
            {/* Headless UI Dialog to manage the modal itself. */}
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
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            {/* The main modal panel, styled as a confirmation dialog. */}
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        {/* Warning icon container. */}
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        {/* Text content container. */}
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                Produkt löschen
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                {/* Dynamic confirmation message including the product name. */}
                                                <p className="text-sm text-gray-500">
                                                    Sind Sie sicher, dass Sie das Produkt &#34;{product.name}&#34; löschen möchten? Diese
                                                    Aktion kann nicht rückgängig gemacht werden.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Action buttons container. */}
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    {/* The "Delete" button, styled in red for warning. */}
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={onDelete}>
                                        Löschen
                                    </button>
                                    {/* The "Cancel" button. */}
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={onClose}>
                                        Abbrechen
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
