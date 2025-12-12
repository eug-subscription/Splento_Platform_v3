export function ParagraphExample() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Optimal */}
            <div>
                <p className="text-xs font-medium text-success mb-2">✓ Optimal line length (60 chars)</p>
                <p
                    className="text-base text-midnight dark:text-snow"
                    style={{
                        lineHeight: 1.6,
                        maxWidth: '32ch',
                    }}
                >
                    Good typography makes reading effortless. The ideal line length helps
                    the eye track smoothly from one line to the next.
                </p>
            </div>

            {/* Too wide */}
            <div>
                <p className="text-xs font-medium text-danger mb-2">✕ Too wide (90+ chars)</p>
                <p
                    className="text-base text-grey-500 dark:text-muted"
                    style={{
                        lineHeight: 1.6,
                    }}
                >
                    When lines are too long, the eye struggles to track back to the beginning of the next line, causing fatigue and reducing comprehension. This is why newspapers use narrow columns and why books have generous margins.
                </p>
            </div>
        </div>
    );
}
