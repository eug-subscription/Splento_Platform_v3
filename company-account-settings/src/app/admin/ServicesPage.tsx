import { useState } from 'react';
import { ProductSearch } from '../../components/products/ProductSearch';
import { ProductFilters } from '../../components/products/ProductFilters';
import { ProductGrid } from '../../components/products/ProductGrid';
import { PRODUCTS } from '../../data/products.mock';
import type { FilterOption } from '../../types/products';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';

export function ServicesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

    return (
        <div className="min-h-screen bg-background py-10 font-sans text-foreground">
            <div className="container mx-auto max-w-7xl space-y-8 px-4 md:px-8">
                {/* Page Header */}
                <div className="relative flex flex-col items-center space-y-4 text-center">
                    <div className="absolute right-0 top-0 hidden md:block">
                        <ThemeSwitcher />
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-foreground">
                        Services
                    </h1>
                    <p className="max-w-2xl text-lg text-muted">
                        Professional photography, AI tools, and hybrid solutions to elevate your visual content.
                    </p>

                    <div className="pt-2 md:hidden">
                        <ThemeSwitcher />
                    </div>
                </div>

                {/* Search */}
                <ProductSearch value={searchQuery} onChange={setSearchQuery} />

                {/* Filters */}
                <ProductFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

                {/* Grid */}
                <ProductGrid
                    products={PRODUCTS}
                    activeFilter={activeFilter}
                    searchQuery={searchQuery}
                />
            </div>
        </div>
    );
}
