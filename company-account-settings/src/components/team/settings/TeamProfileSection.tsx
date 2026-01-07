import { useState, useRef, type ChangeEvent } from 'react';
import { Card, Avatar, TextField, Button, TextArea, Input, Label, Description } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { TeamSettings } from '@/types/settings';
import { SETTINGS_VALIDATION } from '@/data/settings-constants';
import { toastError, toastSuccess } from '@/components/ui/toast';

interface TeamProfileSectionProps {
    team: TeamSettings;
    onUpdateTeam: (updates: Partial<TeamSettings>) => Promise<void>;
}

export function TeamProfileSection({ team, onUpdateTeam }: TeamProfileSectionProps) {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [nameValue, setNameValue] = useState(team.name);
    const [descriptionValue, setDescriptionValue] = useState(team.description || '');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleLogoChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file
        if (file.size > SETTINGS_VALIDATION.LOGO.MAX_FILE_SIZE) {
            toastError('Logo must be smaller than 2MB');
            return;
        }

        // @ts-expect-error - HeroUI validation constant comparison
        if (!SETTINGS_VALIDATION.LOGO.ALLOWED_TYPES.includes(file.type)) {
            toastError('Please upload a PNG or JPEG image');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            await onUpdateTeam({ logo: event.target?.result as string });
            toastSuccess('Team logo updated');
        };
        reader.readAsDataURL(file);
    };

    const handleSaveName = async () => {
        if (nameValue.length < SETTINGS_VALIDATION.TEAM_NAME.MIN_LENGTH || nameValue.length > SETTINGS_VALIDATION.TEAM_NAME.MAX_LENGTH) {
            toastError(`Team name must be between ${SETTINGS_VALIDATION.TEAM_NAME.MIN_LENGTH} and ${SETTINGS_VALIDATION.TEAM_NAME.MAX_LENGTH} characters`);
            return;
        }
        await onUpdateTeam({ name: nameValue });
        setIsEditingName(false);
        toastSuccess('Team name updated');
    };

    const handleSaveDescription = async () => {
        if (descriptionValue.length > SETTINGS_VALIDATION.DESCRIPTION.MAX_LENGTH) {
            toastError(`Description must not exceed ${SETTINGS_VALIDATION.DESCRIPTION.MAX_LENGTH} characters`);
            return;
        }
        await onUpdateTeam({ description: descriptionValue });
        setIsEditingDescription(false);
        toastSuccess('Description updated');
    };

    return (
        <Card className="h-full">
            <Card.Header className="pb-3">
                <Card.Title className="text-base font-semibold">Team Profile</Card.Title>
                <Card.Description className="text-sm text-default-500">
                    Manage your team's public identity and branding
                </Card.Description>
            </Card.Header>

            <Card.Content>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Logo - Click to upload */}
                    <div className="relative group">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={SETTINGS_VALIDATION.LOGO.ALLOWED_TYPES.join(',')}
                            onChange={handleLogoChange}
                            className="hidden"
                            aria-label="Upload team logo"
                        />
                        <Button
                            variant="ghost"
                            isIconOnly
                            onPress={() => fileInputRef.current?.click()}
                            className="relative size-24 md:size-32 rounded-full overflow-hidden transition-all duration-300 ring-offset-4 ring-offset-background hover:ring-2 hover:ring-accent focus:outline-none focus:ring-2 focus:ring-accent group"
                            aria-label="Change team logo"
                        >
                            <Avatar className="size-full rounded-full text-4xl border-2 border-default-100 dark:border-default-50 shadow-sm">
                                <Avatar.Image src={team.logo || ''} alt={team.name} />
                                <Avatar.Fallback className="rounded-full shadow-inner">{team.name.charAt(0)}</Avatar.Fallback>
                            </Avatar>
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 gap-1 rounded-full">
                                <Icon icon="gravity-ui:camera" className="size-6 text-white" />
                                <span className="text-[10px] text-white font-bold uppercase tracking-wider">Change</span>
                            </div>
                        </Button>
                    </div>

                    {/* Profile Info - Inline Editing */}
                    <div className="flex-1 w-full space-y-6">
                        {/* Name */}
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
                                Team Name
                            </Label>
                            {isEditingName ? (
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 animate-in fade-in slide-in-from-top-1">
                                    <TextField
                                        className="flex-1 w-full"
                                        value={nameValue}
                                        onChange={setNameValue}
                                    >
                                        <Input
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleSaveName();
                                                if (e.key === 'Escape') {
                                                    setNameValue(team.name);
                                                    setIsEditingName(false);
                                                }
                                            }}
                                            autoFocus
                                            className="text-lg font-semibold"
                                        />
                                        <Description className="text-[10px] opacity-60 px-1">
                                            Press <kbd className="font-sans">Enter</kbd> to save, <kbd className="font-sans">Esc</kbd> to cancel
                                        </Description>
                                    </TextField>
                                    <div className="flex items-center gap-2">
                                        <Button variant="primary" size="sm" className="px-4" onPress={handleSaveName}>
                                            Save
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="px-4"
                                            onPress={() => {
                                                setNameValue(team.name);
                                                setIsEditingName(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    variant="ghost"
                                    onPress={() => setIsEditingName(true)}
                                    className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground hover:text-accent transition-colors group px-1 py-1 rounded-lg"
                                >
                                    {team.name}
                                    <Icon icon="gravity-ui:pencil" className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity" />
                                </Button>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
                                Description
                            </Label>
                            {isEditingDescription ? (
                                <div className="space-y-3 animate-in fade-in slide-in-from-top-1">
                                    <TextField
                                        value={descriptionValue}
                                        onChange={setDescriptionValue}
                                    >
                                        <TextArea
                                            rows={4}
                                            className="w-full text-sm leading-relaxed"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Escape') {
                                                    setDescriptionValue(team.description || '');
                                                    setIsEditingDescription(false);
                                                }
                                                // Support Cmd+Enter / Ctrl+Enter to save for multiline
                                                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                                                    handleSaveDescription();
                                                }
                                            }}
                                            autoFocus
                                        />
                                        <div className="flex justify-between items-center px-1">
                                            <div className="flex flex-col gap-0.5">
                                                <Description className="text-[10px]">
                                                    Briefly describe your team's purpose
                                                </Description>
                                                <Description className="text-[10px] opacity-60">
                                                    Press <kbd className="font-sans">Esc</kbd> to cancel
                                                </Description>
                                            </div>
                                            <div className={`text-[10px] font-medium transition-colors ${descriptionValue.length > SETTINGS_VALIDATION.DESCRIPTION.MAX_LENGTH ? 'text-danger' : 'text-muted-foreground/50'}`}>
                                                {descriptionValue.length} / {SETTINGS_VALIDATION.DESCRIPTION.MAX_LENGTH}
                                            </div>
                                        </div>
                                    </TextField>
                                    <div className="flex gap-2">
                                        <Button variant="primary" size="sm" className="px-4" onPress={handleSaveDescription}>
                                            Save
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="px-4"
                                            onPress={() => {
                                                setDescriptionValue(team.description || '');
                                                setIsEditingDescription(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    variant="ghost"
                                    onPress={() => setIsEditingDescription(true)}
                                    className="w-full text-left text-sm leading-relaxed text-muted-foreground hover:text-foreground transition-all group px-1 py-1 bg-transparent border border-transparent hover:border-default-200 rounded-xl min-h-[5rem] justify-start"
                                >
                                    <div className="flex justify-between items-start gap-4 w-full">
                                        <span className={!team.description ? 'italic opacity-60' : ''}>
                                            {team.description || 'Add a project description to help your team stay aligned...'}
                                        </span>
                                        <Icon icon="gravity-ui:pencil" className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity flex-shrink-0" />
                                    </div>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </Card.Content>
        </Card>
    );
}
