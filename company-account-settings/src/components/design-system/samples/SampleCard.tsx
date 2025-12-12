import { Button } from '@heroui/react';

export function SampleCard() {
    return (
        <div
            className="rounded-xl p-4 shadow-lg max-w-sm w-full border border-border bg-surface dark:text-snow"
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full gradient-ocean-depth" />
                <div>
                    <p className="font-medium text-midnight dark:text-snow">AI Generation</p>
                    <p className="text-sm text-grey-500 dark:text-grey-400">Processing 24 images</p>
                </div>
            </div>
            <div
                className="h-2 rounded-full overflow-hidden mb-3 bg-grey-200 dark:bg-grey-700"
                role="progressbar"
                aria-valuenow={65}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="AI generation progress"
            >
                <div className="h-full rounded-full bg-splento-cyan" style={{ width: '65%' }} />
            </div>
            <div className="flex gap-2">
                <Button
                    variant="primary"
                    size="md"
                    className="flex-1 rounded-lg text-sm font-medium"
                >
                    View Progress
                </Button>
                <Button
                    variant="secondary"
                    size="md"
                    className="rounded-lg text-sm font-medium"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}
