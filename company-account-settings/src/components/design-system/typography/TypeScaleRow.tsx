import type { TypeScaleItem } from '../data/typography';

export function TypeScaleRow({ item }: { item: TypeScaleItem }) {
    return (
        <div className="border-b last:border-b-0 py-4 border-grey-200 dark:border-border">
            <div className="flex items-baseline gap-6 font-sans">
                <div className="w-32 shrink-0">
                    <p className="text-xs font-medium text-grey-500 dark:text-muted">{item.name}</p>
                    <p className="text-xs font-mono mt-1 text-grey-500 dark:text-muted">
                        {item.size} / {item.lineHeight}
                    </p>
                </div>
                <div className="flex-1 overflow-hidden">
                    <p
                        className="text-midnight dark:text-snow"
                        style={{
                            fontSize: item.size,
                            lineHeight: item.lineHeight,
                            fontWeight: item.weight,
                            letterSpacing: item.tracking,
                        }}
                    >
                        The quick brown fox
                    </p>
                </div>
                <div className="w-40 shrink-0 text-right">
                    <p className="text-xs text-grey-500 dark:text-muted">{item.use}</p>
                </div>
            </div>
        </div>
    );
}
