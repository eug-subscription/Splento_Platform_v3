export function DarkLightComparison() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Light */}
            <div className="p-6 rounded-xl font-sans bg-white">
                <p className="text-xs uppercase tracking-widest text-cyan-600 font-medium mb-2">Light mode</p>
                <h3 className="text-2xl font-bold text-midnight mb-2" style={{ lineHeight: 1.2 }}>
                    Crisp and clear
                </h3>
                <p className="text-grey-500" style={{ lineHeight: 1.6 }}>
                    Regular weight (400) provides optimal readability on light backgrounds.
                    Use semibold (600) for headings to create clear hierarchy.
                </p>
            </div>

            {/* Dark */}
            <div className="p-6 rounded-xl font-sans bg-midnight">
                <p className="text-xs uppercase tracking-widest text-splento-cyan font-medium mb-2">Dark mode</p>
                <h3 className="text-2xl font-semibold text-snow mb-2" style={{ lineHeight: 1.2 }}>
                    Softer contrast
                </h3>
                <p className="text-muted" style={{ lineHeight: 1.6 }}>
                    Consider using slightly lighter weights on dark backgrounds.
                    The same font can appear heavier due to light text halation.
                </p>
            </div>
        </div>
    );
}
