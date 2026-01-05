import type { Session, IpRule, IpRuleType } from '@/types/security';
import type { ApiKey, Webhook, WebhookEvent } from '@/types/developers';
import type { ActivityLogEntry } from '@/types/activity';
import type { Member, FeatureArea, PermissionLevel } from '@/types/team';
import type { BillingType, TeamPlan } from '@/types/billing';
import type { TeamSettings, AdminTransferRequest, TeamDeletionRequest, TeamDeletionImpact, DataExportRequest } from '@/types/settings';

export type ModalType =
    | 'enforce_2fa'
    | 'revoke_session'
    | 'revoke_all_sessions'
    | 'add_ip_rule'
    | 'edit_ip_rule'
    | 'delete_ip_rule'
    | 'confirm_ip_allowlist_enable'
    | 'invite_member'
    | 'bulk_import'
    | 'member_profile'
    | 'date_range_picker'
    | 'buy_credits'
    | 'update_payment'
    | 'edit_billing_details'
    | 'change_plan'
    | 'switch_billing_model'
    | 'create_api_key'
    | 'revoke_api_key'
    | 'api_key_created'
    | 'create_webhook'
    | 'edit_webhook'
    | 'delete_webhook'
    | 'webhook_created'
    | 'admin_transfer'
    | 'delete_team'
    | 'request_data_export'
    | 'activity_detail';

// --- Form Data Types ---

export interface InviteMemberFormData {
    mode: 'invite' | 'create';
    email: string;
    name?: string;
    role: string;
    customRoleName?: string;
    permissions: Record<FeatureArea, PermissionLevel>;
}

export interface WebhookFormData {
    name: string;
    url: string;
    events: WebhookEvent[];
}

export interface IpRuleFormData {
    label: string;
    value: string;
    type: IpRuleType;
}

export interface SuccessCallbackData<T = unknown> {
    onSuccess: (data: T) => void;
}

export interface ConfirmCallbackData {
    onConfirm: () => void | Promise<void>;
}

// --- Modal Data Interfaces ---

export interface Enforce2FAModalData {
    membersWithout2FA: number;
    onConfirm: () => void;
}

export interface RevokeSessionModalData {
    session: Session;
    onConfirm: () => void;
}

export interface IpRuleModalData {
    rule?: IpRule;
    onConfirm: (data: IpRuleFormData) => void;
}

export interface MemberProfileModalData {
    member: Member;
    onUpdatePermissions: (permissions: Record<FeatureArea, PermissionLevel>) => void;
}

export interface InviteMemberModalData {
    onSubmit: (data: InviteMemberFormData) => Promise<void>;
}

export interface BulkImportModalData {
    onSubmit: (file: File) => Promise<void>;
}

export interface PlanModalData {
    currentPlan: TeamPlan;
}

export interface BillingModelModalData {
    currentModel: BillingType;
}

export interface WebhookModalData {
    webhook?: Webhook | null;
    onSubmit: (id: string, data: WebhookFormData) => Promise<void>;
}

export interface AdminTransferModalData {
    onSubmit: (data: AdminTransferRequest) => Promise<void>;
}

export interface DeleteTeamModalData {
    team: TeamSettings;
    impact: TeamDeletionImpact;
    onSubmit: (data: TeamDeletionRequest) => Promise<void>;
}

export interface DateRangePickerModalData {
    initialRange?: { start: Date; end: Date };
    onApply: (range: { start: Date; end: Date }) => void;
}

export interface RequestDataExportModalData {
    onSubmit: (data: DataExportRequest) => Promise<void>;
}

export interface ActivityDetailModalData {
    entry: ActivityLogEntry;
}

export interface ApiKeyCreatedModalData {
    apiKey: ApiKey;
    secretKey: string;
}

export interface WebhookCreatedModalData {
    webhook: Webhook;
    signingSecret: string;
}

export interface DeleteWebhookModalData {
    webhook: Webhook;
    onConfirm: () => Promise<void>;
}

export interface CreateWebhookModalData {
    onSubmit: (data: WebhookFormData) => Promise<void>;
}

export interface RevokeApiKeyModalData {
    apiKey: ApiKey;
    onConfirm: () => Promise<void>;
}

export interface CreateApiKeyModalData {
    onSuccess: (data: ApiKeyCreatedModalData) => void;
}

// --- Discriminated Union for Modal Data ---

export type ModalData =
    | { type: 'enforce_2fa'; data: Enforce2FAModalData }
    | { type: 'revoke_session'; data: RevokeSessionModalData }
    | { type: 'revoke_all_sessions'; data: { onConfirm: () => Promise<void> } }
    | { type: 'add_ip_rule'; data: IpRuleModalData }
    | { type: 'edit_ip_rule'; data: IpRuleModalData }
    | { type: 'delete_ip_rule'; data: { rule: IpRule; onConfirm: (id: string) => void } }
    | { type: 'confirm_ip_allowlist_enable'; data: { onConfirm: () => void } }
    | { type: 'invite_member'; data: InviteMemberModalData }
    | { type: 'bulk_import'; data: BulkImportModalData }
    | { type: 'member_profile'; data: MemberProfileModalData }
    | { type: 'date_range_picker'; data: DateRangePickerModalData }
    | { type: 'buy_credits'; data?: { currentBalance?: number } }
    | { type: 'update_payment'; data?: { onSuccess?: () => void } }
    | { type: 'edit_billing_details'; data?: { onSuccess?: () => void } }
    | { type: 'change_plan'; data: PlanModalData }
    | { type: 'switch_billing_model'; data: BillingModelModalData }
    | { type: 'create_api_key'; data: CreateApiKeyModalData }
    | { type: 'revoke_api_key'; data: RevokeApiKeyModalData }
    | { type: 'api_key_created'; data: ApiKeyCreatedModalData }
    | { type: 'create_webhook'; data: CreateWebhookModalData }
    | { type: 'edit_webhook'; data: WebhookModalData }
    | { type: 'delete_webhook'; data: DeleteWebhookModalData }
    | { type: 'webhook_created'; data: WebhookCreatedModalData }
    | { type: 'admin_transfer'; data: AdminTransferModalData }
    | { type: 'delete_team'; data: DeleteTeamModalData }
    | { type: 'request_data_export'; data: RequestDataExportModalData }
    | { type: 'activity_detail'; data: ActivityDetailModalData };

export type OpenModalFn = <T extends ModalType>(
    type: T,
    data?: Extract<ModalData, { type: T }>['data']
) => void;

export interface ModalContextType {
    activeModal: ModalType | null;
    modalData: ModalData['data'] | null;
    openModal: OpenModalFn;
    closeModal: () => void;
}
