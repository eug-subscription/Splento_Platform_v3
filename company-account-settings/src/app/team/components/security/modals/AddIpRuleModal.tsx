import { Modal, Button, TextField, Label, Input, RadioGroup, Radio } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import type { IpRuleType } from "@/types/security";

interface AddIpRuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: { label: string; value: string; type: IpRuleType }) => void;
}

export function AddIpRuleModal({ isOpen, onClose, onConfirm }: AddIpRuleModalProps) {
    const [label, setLabel] = useState("");
    const [value, setValue] = useState("");
    const [type, setType] = useState<IpRuleType>("single");

    const handleConfirm = () => {
        if (label && value) {
            onConfirm({ label, value, type });
            setLabel("");
            setValue("");
            setType("single");
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog className="max-w-md w-full rounded-3xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="flex items-center gap-2">
                                <Icon icon="gravity-ui:plus" className="text-accent h-5 w-5" />
                                <span className="text-lg font-semibold">Add IP Rule</span>
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="space-y-6 py-4">
                            <div className="space-y-4">
                                <TextField value={label} onChange={setLabel} isRequired autoFocus>
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

                            <div className="bg-default-50 p-4 rounded-2xl border border-default-200">
                                <p className="text-[10px] text-default-400 font-bold uppercase tracking-wider mb-2">Examples</p>
                                <ul className="text-xs text-default-500 space-y-1.5 list-disc pl-4">
                                    <li>Single: <code className="bg-default-100 px-1 rounded">192.168.1.1</code></li>
                                    <li>Range: <code className="bg-default-100 px-1 rounded">10.0.0.0/8</code> (Corporate Network)</li>
                                </ul>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="flex gap-3 pt-4 pb-6 px-6">
                            <Button variant="tertiary" onPress={onClose} className="flex-1">
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onPress={handleConfirm}
                                isDisabled={!label || !value}
                                className="flex-1 rounded-full px-8 font-medium shadow-lg shadow-accent/20"
                            >
                                Add Rule
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
