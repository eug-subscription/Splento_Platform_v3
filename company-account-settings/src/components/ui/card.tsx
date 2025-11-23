import { Card as HCard, type CardProps as HCardProps } from "@heroui/react";

export type CardProps = HCardProps;

export function Card({ children, ...props }: CardProps) {
    return <HCard {...props}>{children}</HCard>;
}

// Attach sub-components using dot notation
Card.Header = HCard.Header;
Card.Body = HCard.Content;
Card.Footer = HCard.Footer;
Card.Content = HCard.Content;

// Custom Title component defined inline
Card.Title = function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={`text-lg font-semibold ${className}`} {...props}>{children}</h3>;
};
