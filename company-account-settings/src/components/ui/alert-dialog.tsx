import { AlertDialog as HAlertDialog, type AlertDialogProps as HAlertDialogProps } from "@heroui/react";

export interface AlertDialogProps extends HAlertDialogProps { }

export function AlertDialog(props: AlertDialogProps) {
    return <HAlertDialog {...props} />;
}

AlertDialog.Container = HAlertDialog.Container;
AlertDialog.Dialog = HAlertDialog.Dialog;
AlertDialog.CloseTrigger = HAlertDialog.CloseTrigger;
AlertDialog.Header = HAlertDialog.Header;
AlertDialog.Body = HAlertDialog.Body;
AlertDialog.Footer = HAlertDialog.Footer;

// Custom Icon wrapper
AlertDialog.Icon = function AlertDialogIcon({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { status?: 'danger' | 'success' | 'warning' | 'info' | 'accent' }) {
    // We can use the status prop to style the icon background if needed, or pass it through if HAlertDialog.Icon supports it.
    // However, HeroUI's AlertDialog.Icon might be a specific component.
    // Let's check if HAlertDialog has an Icon component.
    // If not, we build our own.
    // The user example shows <AlertDialog.Icon status="danger" />.
    // If HAlertDialog.Icon exists, we should use it or wrap it.
    // Assuming HAlertDialog doesn't have it explicitly exported as a static property on the class/function in the types I see in modal.tsx (it has Modal.Icon as custom).
    // So I will create a custom one.

    // Map status to colors
    const statusColors = {
        danger: "bg-danger/10 text-danger",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        info: "bg-info/10 text-info",
        accent: "bg-primary/10 text-primary"
    };

    const statusClass = props.status ? statusColors[props.status] : "bg-default-100 text-foreground";

    return <div className={`flex items-center justify-center rounded-full p-2 w-fit ${statusClass} ${className}`} {...props}>{children}</div>;
};

AlertDialog.Heading = function AlertDialogHeading({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={`text-lg font-semibold ${className}`} {...props}>{children}</h3>;
};
