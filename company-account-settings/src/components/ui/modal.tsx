import { Modal as HModal, type ModalProps as HModalProps } from "@heroui/react";

export type ModalProps = HModalProps;

export function Modal(props: ModalProps) {
    return <HModal {...props} />;
}

Modal.Container = HModal.Container;
Modal.Dialog = HModal.Dialog;
Modal.CloseTrigger = HModal.CloseTrigger;
Modal.Header = HModal.Header;
Modal.Body = HModal.Body;
Modal.Footer = HModal.Footer;

// Custom Icon wrapper if needed, or just re-export
Modal.Icon = function ModalIcon({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`flex items-center justify-center rounded-full p-2 ${className}`} {...props}>{children}</div>;
};

Modal.Heading = function ModalHeading({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={`text-lg font-semibold ${className}`} {...props}>{children}</h3>;
};
