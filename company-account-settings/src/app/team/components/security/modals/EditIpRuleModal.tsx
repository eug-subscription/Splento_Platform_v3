import { Modal, Button, TextField, Label, Input, RadioGroup, Radio } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import type { IpRule, IpRuleType } from "@/types/security";

interface EditIpRuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: { label: string; value: string; type: IpRuleType }) => void;
    rule: IpRule | null;
}

export function EditIpRuleModal({ isOpen, onClose, onConfirm, rule }: EditIpRuleModalProps) {
    const [label, setLabel] = useState("");
    const [value, setValue] = useState("");
    const [type, setType] = useState<IpRuleType>("single");

    useEffect(() => {
        if (!rule) return;

        const handle = requestAnimationFrame(() => {
            setLabel(rule.label);
            setValue(rule.value);
            setType(rule.type);
        });
        return () => cancelAnimationFrame(handle);
    }, [rule]);

    const handleConfirm = () => {
        if (label && value) {
            onConfirm({ label, value, type });
        }
    };

    if (!rule) return null;

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog className="max-w-md w-full rounded-3xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="flex items-center gap-2">
                                <Icon icon="gravity-ui:pencil" className="text-accent h-5 w-5" />
                                <span className="text-lg font-semibold">Edit IP Rule</span>
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="space-y-6 py-4">
                            <div className="space-y-4">
                                <TextField value={label} onChange={setLabel} isRequired>
                                    <Label>Rule Label</Label>
                                    <Input placeholder="e.g. Office Main" />
                                </TextField>

                                <RadioGroup
                                    value={type}
                                    onChange={(val) => setType(val as IpRuleType)}
                                    orientation="horizontal"
                                >
                                    <Label>Rule Type</Label>
                                    <div className="flex gap-4">
                                        <Radio value="single">
                                            <Radio.Control>
                                                <Radio.Indicator />
                                            </Radio.Control>
                                            <Radio.Content>
                                                <Label>Single IP</Label>
                                            </Radio.Content>
                                        </Radio>
                                        <Radio value="range">
                                            <Radio.Control>
                                                <Radio.Indicator />
                                            </Radio.Control>
                                            <Radio.Content>
                                                <Label>IP Range (CIDR)</Label>
                                            </Radio.Content>
                                        </Radio>
                                    </div>
                                </RadioGroup>

                                <TextField value={value} onChange={setValue} isRequired>
                                    <Label>{type === 'range' ? "CIDR Range" : "IP Address"}</Label>
                                    <Input placeholder={type === 'range' ? "192.168.1.0/24" : "192.168.1.1"} />
                                </TextField>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="flex gap-3 pt-4 pb-6 px-6">
                            <Button variant="tertiary" onPress={onClose} className="flex-1">
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onPress={handleConfirm}
                                isDisabled={!label || !value || (label === rule.label && value === rule.value && type === rule.type)}
                                className="flex-1 rounded-full px-8 font-medium shadow-lg shadow-accent/20"
                            >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
