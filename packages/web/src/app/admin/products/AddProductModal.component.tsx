"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ProductForm from "./ProductForm.component";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (formData: Partial<RubberDuck>) => void;
}

/**
 * @component AddProductModal
 * @description A modal dialog for adding a new product, using Headless UI.
 */
export default function AddProductModal({ isOpen, onClose, onAdd }: AddProductModalProps) {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 border-b border-gray-200 pb-4">
                                    Neues Produkt erstellen
                                </Dialog.Title>
                                <div className="mt-5">
                                    <ProductForm onSubmit={onAdd} onCancel={onClose} />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
