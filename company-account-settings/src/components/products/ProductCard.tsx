import { Button, Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { Product } from '../../types/products';
import { ServiceTypeBadge } from './ServiceTypeBadge';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const isAI = product.serviceType === 'ai';

    return (
        <Card className="group rounded-large border-none bg-content1 shadow-sm transition-shadow hover:shadow-md">
            {/* Image as Card header area */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-large">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.src = '/placeholder-product.jpg';
                    }}
                />
                <div className="pointer-events-none absolute inset-x-3 top-3 flex justify-between">
                    {product.isPopular && (
                        <span className="rounded bg-warning px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-warning-foreground shadow-sm">
                            Popular
                        </span>
                    )}
                    <ServiceTypeBadge type={product.serviceType} className="ml-auto" />
                </div>
            </div>

            <Card.Header className="gap-1 px-4 pt-4">
                <Card.Title className="text-lg font-semibold leading-tight">
                    {product.title}
                </Card.Title>
                <Card.Description>{product.subtitle}</Card.Description>
            </Card.Header>

            <Card.Content className="px-4 pb-2">
                {product.description && (
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {product.description}
                    </p>
                )}
            </Card.Content>

            <Card.Footer className="px-4 pb-4">
                <Button
                    asChild
                    variant={isAI ? 'primary' : 'secondary'}
                    className={`w-full font-medium ${isAI ? 'button--ai-gradient' : ''}`}
                >
                    <a
                        href={product.ctaUrl}
                        aria-label={`${product.ctaLabel} - ${product.title}`}
                    >
                        {isAI && <Icon icon="gravity-ui:thunderbolt" className="size-4" />}
                        {product.ctaLabel}
                    </a>
                </Button>
            </Card.Footer>
        </Card>
    );
}
