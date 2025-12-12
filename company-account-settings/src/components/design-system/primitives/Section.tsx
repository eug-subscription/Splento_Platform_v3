import { Surface } from '@heroui/react';

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Surface
            className="p-6 rounded-2xl shadow-sm"
        >
            <h2 className="text-lg font-semibold mb-6 px-1">{title}</h2>
            <div>
                {children}
            </div>
        </Surface>
    );
}
