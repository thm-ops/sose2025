"use client";

import {useMemo, useState} from "react";
import {rubberDuckData} from "@/data/data";
import RubberDuck from "@/lib/model/rubberduck/Rubberduck.type";
import ProductTable from "./ProductTable.component";
import PageHeader from "./PageHeader.component";
import AddProductModal from "./AddProductModal.component";
import EditProductModal from "./EditProductModal.component";
import DeleteProductModal from "./DeleteProductModal.component";
import AdminHeader from "@/app/admin/AdminHeader.component";

type SortKey = keyof RubberDuck;
type SortDirection = "asc" | "desc";

export default function ProductManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>("id");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    const [selectedProduct, setSelectedProduct] = useState<RubberDuck | null>(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleOpenEditModal = (product: RubberDuck) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleOpenDeleteModal = (product: RubberDuck) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleAddProduct = (formData: Partial<RubberDuck>) => {
        console.log("Adding product:", formData);
        setIsAddModalOpen(false);
    };

    const handleEditProduct = (formData: Partial<RubberDuck>) => {
        console.log("Editing product:", selectedProduct?.id, formData);
        setIsEditModalOpen(false);
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
                <div className="p-4 sm:p-6 lg:p-8">
                    <PageHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                                onAddProduct={() => setIsAddModalOpen(true)}/>
                    <main className="mt-8">
                        <ProductTable
                            products={sortedAndFilteredProducts}
                            sortKey={sortKey}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                            onEdit={handleOpenEditModal}
                            onDelete={handleOpenDeleteModal}
                        />
                    </main>
                </div>

                <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}
                                 onAdd={handleAddProduct}/>
                <EditProductModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onEdit={handleEditProduct}
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
