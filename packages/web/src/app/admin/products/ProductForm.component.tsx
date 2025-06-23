"use client";

import { FormEvent, useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";
import Button from "./Button.component";
import Image from "next/image";

// Define specific types for form dropdowns to ensure type safety.
type DuckColor = "red" | "yellow" | "green" | "blue";
type DuckSize = "s" | "m" | "l" | "xl" | "xxl";

// Define the props interface for the component.
interface ProductFormProps {
    product?: RubberDuck | null; // Optional product for editing.
    onSubmit: (formData: Partial<RubberDuck>) => void; // Callback for form submission.
    onCancel: () => void; // Callback to cancel and close the form/modal.
}

// Define the initial state for a new, empty product form.
const initialFormData: Partial<RubberDuck> = {
    name: "",
    price: 0,
    color: "yellow",
    size: "m",
    material: "",
    producer: "",
    weight: 0,
    description: "",
};

/**
 * @component ProductForm
 * @description A reusable form for creating and editing products.
 */
export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
    // State to hold the form's input data.
    const [formData, setFormData] = useState<Partial<RubberDuck>>(initialFormData);
    // State to hold the URL for the image preview.
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Effect to populate the form when a product is passed for editing.
    useEffect(() => {
        if (product) {
            // Set form data from the existing product.
            setFormData({
                name: product.name,
                price: product.price,
                color: product.color,
                size: product.size,
                material: product.material,
                producer: product.producer,
                weight: product.weight,
                description: product.description,
            });
            // Generate and set the image preview URL from the product ID.
            setImagePreview(`https://picsum.photos/seed/${product.id}/400/400`);
        } else {
            // Reset form and preview when creating a new product.
            setFormData(initialFormData);
            setImagePreview(null);
        }
    }, [product]);

    // Generic handler for form input changes.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        let processedValue: string | number = value;
        // Process value based on input type.
        if (type === "number") {
            processedValue = parseFloat(value) || 0;
        } else if (name === "color") {
            // Assert type for color to match the specific DuckColor type.
            processedValue = value as DuckColor;
        } else if (name === "size") {
            // Assert type for size to match the specific DuckSize type.
            processedValue = value as DuckSize;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: processedValue,
        }));
    };

    // Handler to create a local preview URL for a newly selected file.
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Handler to remove the current image preview and show the upload field again.
    const handleRemoveImage = () => {
        setImagePreview(null);
        // Reset the file input value.
        const fileInput = document.getElementById("file-upload") as HTMLInputElement;
        if (fileInput) {
            fileInput.value = "";
        }
    };

    // Handler for the form's submit event.
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                {/* Name Input */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                {/* Image Upload Section */}
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Produktfoto</label>
                    <div className="mt-2">
                        {/* Conditional rendering: Show preview if an image exists. */}
                        {imagePreview ? (
                            <div>
                                <div className="w-full max-w-xs overflow-hidden rounded-lg">
                                    <Image
                                        src={imagePreview}
                                        width={400}
                                        height={400}
                                        alt="Produktvorschau"
                                        className="h-auto w-full object-cover"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="mt-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    Bild ändern
                                </button>
                            </div>
                        ) : (
                            // Otherwise, show the file upload dropzone.
                            <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                            <span>Datei hochladen</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleFileChange}
                                                accept="image/png, image/jpeg, image/gif"
                                            />
                                        </label>
                                        <p className="pl-1">oder hier hineinziehen</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF bis zu 10MB</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Price and Weight Inputs */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                            Preis (in Cent)
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div>
                        <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
                            Gewicht (in kg)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            name="weight"
                            id="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Color and Size Selects */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="color" className="block text-sm font-medium leading-6 text-gray-900">
                            Farbe
                        </label>
                        <select
                            id="color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option>yellow</option>
                            <option>red</option>
                            <option>green</option>
                            <option>blue</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="size" className="block text-sm font-medium leading-6 text-gray-900">
                            Größe
                        </label>
                        <select
                            id="size"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option>s</option>
                            <option>m</option>
                            <option>l</option>
                            <option>xl</option>
                            <option>xxl</option>
                        </select>
                    </div>
                </div>

                {/* Material and Producer Inputs */}
                <div>
                    <label htmlFor="material" className="block text-sm font-medium leading-6 text-gray-900">
                        Material
                    </label>
                    <input
                        type="text"
                        name="material"
                        id="material"
                        value={formData.material}
                        onChange={handleChange}
                        required
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label htmlFor="producer" className="block text-sm font-medium leading-6 text-gray-900">
                        Hersteller
                    </label>
                    <input
                        type="text"
                        name="producer"
                        id="producer"
                        value={formData.producer}
                        onChange={handleChange}
                        required
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                {/* Description Textarea */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                        Beschreibung
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
            </div>

            {/* Form Action Buttons */}
            <div className="mt-8 pt-5 border-t border-gray-200">
                <div className="flex justify-end gap-x-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Abbrechen
                    </button>
                    <Button type="submit">Speichern</Button>
                </div>
            </div>
        </form>
    );
}
