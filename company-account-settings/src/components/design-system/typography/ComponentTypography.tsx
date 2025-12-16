import { Button, TextField, Label, Input, Description } from '@heroui/react';

export function ComponentTypography() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {/* Card */}
            <div
                className="p-4 rounded-xl border bg-surface border-grey-200 dark:border-grey-700"
            >
                <p className="text-xs font-medium uppercase tracking-wider mb-1 text-splento-cyan">
                    Card
                </p>
                <h4 className="text-lg font-semibold mb-1 text-midnight dark:text-snow">
                    Card title here
                </h4>
                <p className="text-sm mb-3 text-grey-500 dark:text-grey-400">
                    Supporting description text that explains the card content.
                </p>
                <p className="text-xs text-grey-500 dark:text-grey-400">
                    Meta · Info · Details
                </p>
            </div>

            {/* Form */}
            <div
                className="p-4 rounded-xl border bg-surface border-grey-200 dark:border-grey-700"
            >
                <p className="text-xs font-medium uppercase tracking-wider mb-3 text-splento-cyan">
                    Form
                </p>
                <TextField name="email" type="email">
                    <Label className="text-sm font-medium text-midnight dark:text-snow">Email address</Label>
                    <Input
                        placeholder="you@example.com"
                        className="mb-2"
                    />
                    <Description className="text-xs text-grey-500 dark:text-grey-400">We'll never share your email.</Description>
                </TextField>
            </div>

            {/* Button */}
            <div
                className="p-4 rounded-xl border bg-surface border-grey-200 dark:border-grey-700"
            >
                <p className="text-xs font-medium uppercase tracking-wider mb-3 text-splento-cyan">
                    Buttons
                </p>
                <div className="space-y-2">
                    <Button
                        variant="primary"
                        size="md"
                        className="w-full font-semibold"
                    >
                        Primary action
                    </Button>
                    <Button
                        variant="secondary"
                        size="md"
                        className="w-full font-medium"
                    >
                        Secondary action
                    </Button>
                    <Button
                        variant="ghost"
                        size="md"
                        className="w-full font-medium text-splento-cyan hover:bg-splento-cyan/10"
                    >
                        Tertiary action
                    </Button>
                </div>
            </div>
        </div>
    );
}
