import { Card as HCard, type CardProps as HCardProps } from "@heroui/react";

export interface CardProps extends HCardProps { }

export function Card({ children, ...props }: CardProps) {
    return <HCard {...props}>{children}</HCard>;
}

// Attach sub-components for convenience if desired, or export them separately
Card.Header = HCard.Header;
Card.Body = HCard.Content;
Card.Footer = HCard.Footer;
// Custom Title component often used in Cards
export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={`text-lg font-semibold ${className}`} {...props}>{children}</h3>;
}
Card.Title = CardTitle;
// Map Content to Body if that was the usage, or keep as Body
Card.Content = HCard.Content;
