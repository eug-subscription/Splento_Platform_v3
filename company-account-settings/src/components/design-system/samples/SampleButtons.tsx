import { Button } from '@heroui/react';
import { tv } from 'tailwind-variants';

const buttonStyles = tv({
    variants: {
        mode: {
            outline: "border border-grey-200 dark:border-grey-700 shadow-none text-midnight dark:text-snow",
        }
    }
});

export function SampleButtons() {
    return (
        <div className="flex flex-wrap gap-3 p-4 rounded-xl items-center bg-grey-50 dark:bg-grey-950">
            <Button
                variant="primary"
                size="md"
                className="rounded-lg text-sm font-medium transition-colors"
            >
                Primary
            </Button>
            <Button
                variant="secondary"
                size="md"
                className="rounded-lg text-sm font-medium transition-colors"
            >
                Secondary
            </Button>
            <Button
                variant="danger"
                size="md"
                className="rounded-lg text-sm font-medium transition-colors"
            >
                Danger
            </Button>
            <Button
                variant="ghost"
                size="md"
                className={`rounded-lg text-sm font-medium transition-colors ${buttonStyles({ mode: 'outline' })}`}
            >
                Outline
            </Button>
            <Button
                variant="ghost"
                size="md"
                className="rounded-lg text-sm font-medium transition-colors text-splento-cyan"
            >
                Ghost
            </Button>
        </div>
    );
}
