export function DataChart() {
    const data = [
        { value: 65, color: 'bg-splento-cyan', name: 'Cyan' },
        { value: 45, color: 'bg-electric-blue', name: 'Blue' },
        { value: 80, color: 'bg-success', name: 'Green' },
        { value: 55, color: 'bg-warning', name: 'Amber' },
        { value: 70, color: 'bg-danger', name: 'Red' },
        { value: 40, color: 'bg-lavender', name: 'Purple' },
        { value: 85, color: 'bg-sunset', name: 'Orange' },
        { value: 50, color: 'bg-mint', name: 'Mint' },
    ];
    const maxVal = Math.max(...data.map(d => d.value));

    return (
        <div className="p-4 rounded-xl shadow-sm h-full bg-white dark:bg-grey-800">
            <p className="text-sm font-medium mb-4 text-midnight dark:text-snow">Data Visualisation Palette</p>
            <div className="flex items-end gap-2" style={{ height: '128px' }}>
                {data.map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div
                            className={`w-full rounded-t-md transition-all hover:opacity-80 ${item.color}`}
                            style={{
                                height: `${(item.value / maxVal) * 100}%`,
                                minHeight: '8px'
                            }}
                        />
                        <span className="text-xs text-grey-400 whitespace-nowrap">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
