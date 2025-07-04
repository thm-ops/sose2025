"use client";

import { useMemo, useState } from "react";
import { rubberDuckData } from "@/data/data";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";
import ProductTable from "./ProductTable.component";
import PageHeader from "./PageHeader.component";
import AddProductModal from "./AddProductModal.component";
import DeleteProductModal from "./DeleteProductModal.component";
import AdminHeader from "@/app/admin/AdminHeader.component";

type SortKey = keyof RubberDuck;
type SortDirection = "asc" | "desc";

export default function ProductManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>("id");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    const [selectedProduct, setSelectedProduct] = useState<RubberDuck | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleOpenModal = (product: RubberDuck | null) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = (product: RubberDuck) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleSaveProduct = (formData: Partial<RubberDuck>) => {
        if (selectedProduct) {
            console.log("Editing product:", selectedProduct.id, formData);
        } else {
            console.log("Adding product:", formData);
        }
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleDeleteProduct = () => {
        if (!selectedProduct) return;
        console.log("Simulating delete for product:", selectedProduct.id);
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
    };

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }
    };

    // Memoized list of products that is filtered and sorted based on state.
    const sortedAndFilteredProducts = useMemo(() => {
        return rubberDuckData
            .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                const aValue = a[sortKey];
                const bValue = b[sortKey];
                if (aValue === undefined || bValue === undefined) return 0;
                if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
                if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
                return 0;
            });
    }, [searchTerm, sortKey, sortDirection]);

    return (
        <div>
            <AdminHeader />
            <div className="min-h-screen pt-[64px] bg-gray-50">
                {/* This container now has max-width and is centered */}
                <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                    <PageHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} onAddProduct={() => handleOpenModal(null)} />
                    <main className="mt-8">
                        <ProductTable
                            products={sortedAndFilteredProducts}
                            sortKey={sortKey}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                            onEdit={handleOpenModal}
                            onDelete={handleOpenDeleteModal}
                        />
                    </main>
                </div>

                <AddProductModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSaveProduct}
                    product={selectedProduct}
                />
                <DeleteProductModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onDelete={handleDeleteProduct}
                    product={selectedProduct}
                />
            </div>
        </div>
    );
}
