import { Button, Card } from '@heroui/react';
import { Icon } from '@iconify/react';

export function SampleCreatorCard() {
    return (
        <Card className="border-0 shadow-sm p-5 overflow-hidden relative flex-row gap-5 items-center dark:bg-grey-800 dark:border dark:border-white/5">
            <div className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden hidden sm:block">
                <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop"
                    alt="Creator"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            <Card.Content className="flex-1 flex flex-col justify-between h-full py-1">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-foreground leading-tight">Become a Splento Creator!</h3>
                        <Button isIconOnly size="sm" variant="ghost" className="text-foreground/40 hover:text-foreground -mr-2 -mt-2">
                            <Icon icon="gravity-ui:xmark" className="size-4" />
                        </Button>
                    </div>
                    <p className="text-sm text-foreground/60 mt-2 line-clamp-2">
                        Lorem ipsum dolor sit amet consectetur. Sed arcu donec id aliquam dolor sed amet faucibus etiam.
                    </p>
                </div>

                <div className="flex items-end justify-between mt-2">
                    <div>
                        <p className="text-sm font-bold text-foreground">Only 10 spots</p>
                        <p className="text-xs text-foreground/40">Submission ends Oct 10.</p>
                    </div>
                    <Button size="sm" variant="primary" className="font-medium text-xs px-5">
                        Apply Now
                    </Button>
                </div>
            </Card.Content>
        </Card>
    );
}
