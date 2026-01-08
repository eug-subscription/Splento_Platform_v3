import { Alert, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface SecurityAlertBannerProps {
    membersWithout2FA: number;
    onFix2FA: () => void;
}

export function SecurityAlertBanner({ membersWithout2FA, onFix2FA }: SecurityAlertBannerProps) {
    if (membersWithout2FA === 0) return null;

    return (
        <Alert status="warning" className="items-center">
            <Alert.Indicator>
                <Icon icon="gravity-ui:triangle-exclamation" className="size-5" />
            </Alert.Indicator>
            <Alert.Content>
                <Alert.Title>Security Action Required</Alert.Title>
                <Alert.Description>
                    {membersWithout2FA} {membersWithout2FA === 1 ? 'member does' : 'members do'} not have two-factor authentication enabled.
                </Alert.Description>
            </Alert.Content>
            <div className="ml-auto">
                <Button variant="primary" size="sm" onPress={onFix2FA}>
                    Enforce 2FA
                </Button>
            </div>
        </Alert>
    );
}
