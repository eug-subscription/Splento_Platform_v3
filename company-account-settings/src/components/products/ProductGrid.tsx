import { useMemo } from 'react';
import { Icon } from '@iconify/react';
import { ProductCard } from './ProductCard';
import type { Product, FilterOption } from '../../types/products';

interface ProductGridProps {
    products: Product[];
    activeFilter: FilterOption;
    searchQuery: string;
}

export function ProductGrid({ products, activeFilter, searchQuery }: ProductGridProps) {
    const sortedProducts = useMemo(() => {
        const filtered = products.filter((product) => {
            if (activeFilter !== 'all' && product.serviceType !== activeFilter) {
                return false;
            }
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    product.title.toLowerCase().includes(query) ||
                    product.subtitle.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query)
                );
            }
            return true;
        });

        return [...filtered].sort((a, b) => {
            if (a.isPopular && !b.isPopular) return -1;
            if (!a.isPopular && b.isPopular) return 1;
            return (a.sortOrder ?? 999) - (b.sortOrder ?? 999);
        });
    }, [products, activeFilter, searchQuery]);

    if (sortedProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 rounded-full bg-muted/20 p-4">
                    <Icon icon="gravity-ui:magnifier" className="size-8 text-muted" />
                </div>
                <h3 className="text-xl font-semibold">No services found</h3>
                <p className="mt-2 max-w-md text-muted">
                    We couldn't find any services matching your filters. Try adjusting your search terms or filter selection.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

