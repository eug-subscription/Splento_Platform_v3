import { Avatar, Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { Team } from "../../types/team";

interface TeamHeaderProps {
    team: Team;
    onInvite: () => void;
}

export function TeamHeader({ team, onInvite }: TeamHeaderProps) {
    const getPlanColor = (plan: string) => {
        switch (plan) {
            case 'Enterprise': return 'secondary';
            case 'Professional': return 'primary';
            default: return 'soft';
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-default-200">
            {/* Left: Team Identity */}
            <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 text-large border-small">
                    <Avatar.Image src={team.avatar} alt={team.name} />
                    <Avatar.Fallback>{team.name.charAt(0)}</Avatar.Fallback>
                </Avatar>

                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl font-bold leading-none">{team.name}</h1>
                        <Chip
                            size="sm"
                            variant={getPlanColor(team.plan) as any}
                            className="uppercase font-bold text-[10px] px-3"
                        >
                            {team.plan}
                        </Chip>
                    </div>

                    <div className="flex items-center text-default-500 text-sm">
                        <span>{team.memberCount} members</span>
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto">
                <Button
                    variant="ghost"
                    isIconOnly
                    aria-label="Switch Team"
                    className="hidden md:flex"
                >
                    <Icon icon="gravity-ui:arrows-rotate-right" className="text-xl" />
                </Button>

                <Button variant="secondary" onPress={onInvite}>
                    <Icon icon="gravity-ui:plus" />
                    Invite Member
                </Button>
            </div>
        </div>
    );
}
