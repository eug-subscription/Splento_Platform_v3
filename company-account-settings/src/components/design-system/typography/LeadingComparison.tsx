export function LeadingComparison() {
    const examples = [
        { leading: '1.0', label: 'Tight', use: 'Display text', sample: 'Giant headlines demand tight leading' },
        { leading: '1.25', label: 'Snug', use: 'Headings', sample: 'Section headings benefit from snug leading' },
        { leading: '1.6', label: 'Relaxed', use: 'Body text', sample: 'Body text needs room to breathe for comfortable reading across multiple lines of content' },
    ];

    return (
        <div className="space-y-6">
            {examples.map((ex) => (
                <div key={ex.leading} className="flex gap-6">
                    <div className="w-24 shrink-0">
                        <p className="text-2xl font-bold text-midnight dark:text-snow">{ex.leading}</p>
                        <p className="text-xs text-grey-500 dark:text-muted">{ex.label}</p>
                        <p className="text-xs text-splento-cyan">{ex.use}</p>
                    </div>
                    <div
                        className="flex-1 p-4 rounded-lg bg-snow dark:bg-grey-800"
                    >
                        <p
                            className={`${ex.leading === '1.0' ? 'text-2xl font-bold' : ex.leading === '1.25' ? 'text-xl font-semibold' : 'text-base'} text-midnight dark:text-snow`}
                            style={{
                                lineHeight: ex.leading,
                            }}
                        >
                            {ex.sample}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
