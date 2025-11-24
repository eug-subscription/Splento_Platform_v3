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

Modal.Icon = HModal.Icon;

Modal.Heading = HModal.Heading;
