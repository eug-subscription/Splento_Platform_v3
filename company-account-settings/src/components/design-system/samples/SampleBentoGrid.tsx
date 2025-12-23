import { Button, Card, Chip, Alert } from '@heroui/react';
import { Icon } from '@iconify/react';

export function SampleBentoGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(100px,auto)]">

            {/* 1. AI Processing Card */}
            <Card className="md:col-span-12 lg:col-span-5 p-5 justify-between border-0 shadow-sm relative overflow-hidden group min-h-[200px] dark:bg-grey-800 dark:border dark:border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-start justify-between relative z-10">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full gradient-ocean-depth flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
                            <Icon icon="gravity-ui:magic-wand" className="text-white size-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-foreground">AI Enhancement</h3>
                            <p className="text-xs text-foreground/60">Processing Batch #2049</p>
                        </div>
                    </div>
                    <Chip size="sm" variant="soft" color="warning" className="uppercase font-bold tracking-wider text-[10px] h-6 px-2">
                        Processing
                    </Chip>
                </div>

                <div className="space-y-1.5 mt-4 relative z-10">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-foreground/70">Upscaling images...</span>
                        <span className="text-cyan-600 dark:text-cyan-400">84%</span>
                    </div>
                    {/* Fixed: Overflow hidden ensures bar doesn't look cut off wrongly */}
                    <div className="h-1.5 w-full bg-default-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 w-[84%] animate-pulse rounded-full" />
                    </div>
                </div>

                <div className="flex gap-3 mt-4 relative z-10">
                    <Button size="sm" className="button--ai-gradient font-medium px-4 h-8 text-xs">
                        View Details
                    </Button>
                    <Button size="sm" variant="secondary" className="h-8 text-xs bg-default-100 dark:bg-white/10 dark:text-white">
                        Cancel
                    </Button>
                </div>
            </Card>

            {/* 2. ACME Creator Card */}
            {/* 2. Buttons & Chips (Swapped) */}
            <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-4">
                {/* Buttons Row */}
                <div className="flex flex-wrap gap-3 p-4 rounded-xl items-center bg-grey-50 dark:bg-grey-950/50 border border-transparent dark:border-white/5 h-full">
                    <Button variant="primary" size="md" className="rounded-lg text-sm font-medium">Primary</Button>
                    <Button variant="secondary" size="md" className="rounded-lg text-sm font-medium">Secondary</Button>
                    <Button variant="danger" size="md" className="rounded-lg text-sm font-medium">Danger</Button>
                    <Button variant="ghost" size="md" className="rounded-lg text-sm font-medium border border-grey-200 dark:border-grey-700 shadow-none text-midnight dark:text-snow">Outline</Button>
                    <Button variant="ghost" size="md" className="rounded-lg text-sm font-medium text-splento-cyan">Ghost</Button>
                </div>

                {/* Chips Row */}
                <div className="flex flex-wrap gap-2 p-4 rounded-xl items-center bg-grey-50 dark:bg-grey-950/50 border border-transparent dark:border-white/5 h-full">
                    <Chip size="sm" variant="soft" color="default" className="text-xs font-medium px-3">Default</Chip>
                    <Chip size="sm" variant="soft" className="text-xs font-medium px-3 bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300">Primary</Chip>
                    <Chip size="sm" variant="soft" color="success" className="text-xs font-medium px-3">✓ Success</Chip>
                    <Chip size="sm" variant="soft" color="warning" className="text-xs font-medium px-3">⚠ Warning</Chip>
                    <Chip size="sm" variant="soft" color="danger" className="text-xs font-medium px-3">✕ Error</Chip>
                    <Chip size="sm" variant="primary" color="accent" className="text-xs font-medium px-3 border-0">Premium</Chip>
                </div>
            </div>

            {/* 3. Metric Card */}
            <Card className="md:col-span-6 lg:col-span-3 p-5 flex flex-col justify-between border-0 shadow-sm hover:-translate-y-1 transition-transform duration-300 min-h-[160px] dark:bg-grey-800 dark:border dark:border-white/5">
                <div className="mb-2">
                    <p className="text-xs font-medium text-foreground/50 uppercase tracking-widest">Total Orders</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-bold text-foreground tracking-tight">1,247</span>
                    </div>
                </div>
                <div>
                    <Chip size="sm" variant="soft" color="success" className="gap-1 px-2 h-7 bg-success/10 text-success dark:bg-success/20">
                        <span className="font-bold text-xs">+12.3%</span>
                    </Chip>
                </div>
            </Card>

            {/* 4. "Neo" Home Robot Card - Fixed Image URL */}
            <Card className="md:col-span-6 lg:col-span-4 row-span-2 border-0 shadow-none p-0 overflow-hidden relative group min-h-[340px] dark:border dark:border-white/10 bg-grey-100 dark:bg-grey-800">
                <img
                    src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop"
                    alt="Neo Robot"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Footer using Backdrop Blur */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-2 pl-4 rounded-xl flex items-center justify-between text-white shadow-lg z-10">
                    <div>
                        <p className="text-xs text-white/70 font-medium">Available soon</p>
                        <p className="text-sm font-bold">Neo Robot</p>
                    </div>
                    <Button size="sm" className="bg-white text-black font-semibold text-xs h-8 hover:bg-white/90">
                        Notify me
                    </Button>
                </div>

                <div className="absolute top-4 left-4 z-10">
                    <div className="px-2 py-1 rounded-md bg-black/20 backdrop-blur-md border border-white/10">
                        <p className="text-white/90 text-[10px] font-bold uppercase tracking-widest">New Arrival</p>
                    </div>
                </div>
            </Card>

            {/* 5. Detailed Alerts Stack */}
            <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-3">
                {/* Update Available */}
                <Alert status="accent" className="border-0 shadow-sm bg-surface dark:bg-grey-800 dark:border dark:border-white/5 p-3 items-center">
                    <Alert.Indicator className="text-primary mt-0">
                        <Icon icon="gravity-ui:circle-info" className="size-5" />
                    </Alert.Indicator>
                    <Alert.Content className="flex-1 min-w-0">
                        <Alert.Title className="text-sm font-semibold text-foreground">Update available</Alert.Title>
                        <Alert.Description className="text-xs text-foreground/60 truncate">
                            New version 3.2.0 is available.
                        </Alert.Description>
                    </Alert.Content>
                    <Button size="sm" variant="primary" className="h-7 text-xs px-3 min-w-0">
                        Refresh
                    </Button>
                </Alert>

                {/* Connection Error */}
                <Alert status="danger" className="border-0 shadow-sm bg-surface dark:bg-grey-800 dark:border dark:border-white/5 p-3">
                    <Alert.Indicator className="text-danger mt-0.5">
                        <Icon icon="gravity-ui:circle-exclamation" className="size-5" />
                    </Alert.Indicator>
                    <Alert.Content>
                        <Alert.Title className="text-sm font-semibold text-foreground">Connection Failed</Alert.Title>
                        <Alert.Description className="text-xs text-foreground/60 mt-1">
                            Please check your internet connection.
                        </Alert.Description>
                    </Alert.Content>
                    <Button size="sm" variant="danger" className="h-7 text-xs px-3 min-w-0 self-start mt-0.5">
                        Retry
                    </Button>
                </Alert>

                {/* Success Toast style */}
                <Alert status="success" className="border-0 shadow-sm bg-surface dark:bg-grey-800 dark:border dark:border-white/5 p-3 items-center">
                    <Alert.Indicator className="text-success">
                        <Icon icon="gravity-ui:circle-check" className="size-5" />
                    </Alert.Indicator>
                    <Alert.Content>
                        <Alert.Title className="text-sm font-semibold text-foreground">Profile updated</Alert.Title>
                    </Alert.Content>
                    <Button isIconOnly size="sm" variant="ghost" className="text-foreground/40 hover:text-foreground h-6 w-6 min-w-0">
                        <Icon icon="gravity-ui:xmark" className="size-3.5" />
                    </Button>
                </Alert>
            </div>
        </div >
    );
}
