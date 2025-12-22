import { Button, Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import { cn } from '@heroui/react';

interface UnsavedChangesBarProps {
    isVisible: boolean;
    onDiscard: () => void;
    onSave: () => void;
    isSaving: boolean;
}

export function UnsavedChangesBar({
    isVisible,
    onDiscard,
    onSave,
    isSaving
}: UnsavedChangesBarProps) {
    return (
        <div
            className={cn(
                "fixed bottom-0 left-0 right-0 lg:left-[280px] z-40 transition-all duration-500 ease-in-out p-4 md:p-6 translate-y-full opacity-0",
                isVisible && "translate-y-0 opacity-100"
            )}
        >
            <Card className="max-w-4xl mx-auto shadow-[0_-8px_30px_rgb(0,0,0,0.12)] border border-accent/20 bg-accent/90 backdrop-blur-md text-white">
                <Card.Content className="p-4 flex flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                            <Icon icon="gravity-ui:triangle-exclamation" className="text-xl" />
                        </div>
                        <div>
                            <p className="font-bold text-sm md:text-base leading-tight">Unsaved Permission Changes</p>
                            <p className="text-xs text-white/80 hidden md:block">You have modified access levels. Apply changes to persist them.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            className="text-white border-white/30 hover:bg-white/10 text-xs h-9"
                            onPress={onDiscard}
                            isDisabled={isSaving}
                        >
                            Discard
                        </Button>
                        <Button
                            variant="secondary"
                            className="bg-white text-accent font-bold px-6 text-xs h-9 shadow-lg"
                            onPress={onSave}
                            isPending={isSaving}
                        >
                            Save Changes
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </div>
    );
}
