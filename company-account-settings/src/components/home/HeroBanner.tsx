import { Button, Card, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { IMAGES } from '../../data/homepage.mock';

/**
 * Hero Banner Component
 * Displays the main promotional banner with gradient background,
 * feature announcement, and primary CTAs
 * 
 * Follows AccountSettings patterns:
 * - Direct Hero UI v3 imports
 * - Compound component syntax (Card.Header, Card.Content)
 * - onPress events
 * - Semantic variants (primary, secondary)
 */
export function HeroBanner() {
    return (
        <Card variant="default" className="relative overflow-hidden rounded-large border-none bg-gradient-to-br from-purple-600 via-violet-600 to-blue-600 dark:from-purple-900 dark:via-violet-900 dark:to-blue-900">
            <Card.Content className="relative z-10 flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
                {/* Left Content */}
                <div className="flex-1 space-y-4">
                    <Chip className="bg-white/20 text-white backdrop-blur-sm">
                        New Feature v3.0
                    </Chip>

                    <h1 className="text-3xl font-bold text-white md:text-4xl">
                        AI-Powered Photo Studio
                    </h1>

                    <p className="max-w-lg text-base text-white/90">
                        Describe your vision, upload your assets, and let our GenAI engine create professional marketing material in seconds.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant="primary"
                            size="lg"
                            className="bg-white text-purple-700 hover:bg-default-100"
                            onPress={() => { }}
                        >
                            <Icon icon="gravity-ui:sparkle" className="size-5" />
                            Open Studio
                        </Button>

                        <Button
                            variant="secondary"
                            size="lg"
                            className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                            onPress={() => { }}
                        >
                            View Documentation
                        </Button>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative flex-shrink-0 md:w-80">
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 shadow-2xl">
                        <img
                            src={IMAGES.HERO_BANNER}
                            alt="AI-Powered Photo Studio Preview"
                            className="h-full w-full object-cover opacity-90"
                            loading="eager"
                        />
                    </div>
                </div>
            </Card.Content>
        </Card>
    );
}
