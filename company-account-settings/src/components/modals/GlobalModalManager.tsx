import { lazy, Suspense } from 'react';
import { useModal } from '@/hooks/useModal';
import type {
    Enforce2FAModalData,
    RevokeSessionModalData,
    IpRuleModalData,
    MemberProfileModalData,
    ActivityDetailModalData,
    ApiKeyCreatedModalData,
    WebhookCreatedModalData,
    DeleteWebhookModalData,
    InviteMemberModalData,
    BulkImportModalData,
    DateRangePickerModalData,
    PlanModalData,
    BillingModelModalData,
    SuccessCallbackData,
    ConfirmCallbackData,
    WebhookModalData,
    AdminTransferModalData,
    DeleteTeamModalData,
    RequestDataExportModalData,
    CreateWebhookModalData
} from '@/types/modals';

// --- Lazy Loads ---

// Security Modals
const Enforce2FAModal = lazy(() => import('@/app/team/components/security/modals/Enforce2FAModal').then(m => ({ default: m.Enforce2FAModal })));
const RevokeSessionModal = lazy(() => import('@/app/team/components/security/modals/RevokeSessionModal').then(m => ({ default: m.RevokeSessionModal })));
const RevokeAllSessionsModal = lazy(() => import('@/app/team/components/security/modals/RevokeAllSessionsModal').then(m => ({ default: m.RevokeAllSessionsModal })));
const AddIpRuleModal = lazy(() => import('@/app/team/components/security/modals/AddIpRuleModal').then(m => ({ default: m.AddIpRuleModal })));
const EditIpRuleModal = lazy(() => import('@/app/team/components/security/modals/EditIpRuleModal').then(m => ({ default: m.EditIpRuleModal })));

// Team / Member Modals
const InviteMemberModal = lazy(() => import('@/app/team/components/modals/InviteMemberModal').then(m => ({ default: m.InviteMemberModal })));
const BulkImportModal = lazy(() => import('@/app/team/components/modals/BulkImportModal').then(m => ({ default: m.BulkImportModal })));
const MemberProfileModal = lazy(() => import('@/app/team/components/modals/MemberProfileModal').then(m => ({ default: m.MemberProfileModal })));
const DateRangePickerModal = lazy(() => import('@/app/team/components/modals/DateRangePickerModal').then(m => ({ default: m.DateRangePickerModal })));
const ActivityDetailModal = lazy(() => import('@/app/team/components/activity/modals/ActivityDetailModal').then(m => ({ default: m.ActivityDetailModal })));

// Billing Modals
const BuyCreditsModal = lazy(() => import('@/app/admin/billing/modals/BuyCreditsModal').then(m => ({ default: m.BuyCreditsModal })));
const UpdatePaymentMethodModal = lazy(() => import('@/app/admin/billing/modals/UpdatePaymentMethodModal').then(m => ({ default: m.UpdatePaymentMethodModal })));
const ChangePlanModal = lazy(() => import('@/app/admin/billing/modals/ChangePlanModal').then(m => ({ default: m.ChangePlanModal })));
const SwitchBillingModelModal = lazy(() => import('@/app/admin/billing/modals/SwitchBillingModelModal').then(m => ({ default: m.SwitchBillingModelModal })));

// Developer Modals
const CreateApiKeyModal = lazy(() => import('@/app/admin/developers/modals/CreateApiKeyModal').then(m => ({ default: m.CreateApiKeyModal })));
const ApiKeyCreatedModal = lazy(() => import('@/app/admin/developers/modals/ApiKeyCreatedModal').then(m => ({ default: m.ApiKeyCreatedModal })));
const RevokeApiKeyModal = lazy(() => import('@/app/admin/developers/modals/RevokeApiKeyModal').then(m => ({ default: m.RevokeApiKeyModal })));
const AddWebhookModal = lazy(() => import('@/app/admin/developers/modals/AddWebhookModal').then(m => ({ default: m.AddWebhookModal })));
const EditWebhookModal = lazy(() => import('@/app/admin/developers/modals/EditWebhookModal').then(m => ({ default: m.EditWebhookModal })));
const WebhookCreatedModal = lazy(() => import('@/app/admin/developers/modals/WebhookCreatedModal').then(m => ({ default: m.WebhookCreatedModal })));
const DeleteWebhookModal = lazy(() => import('@/app/admin/developers/modals/DeleteWebhookModal').then(m => ({ default: m.DeleteWebhookModal })));

// Settings Modals
const AdminTransferModal = lazy(() => import('@/app/team/components/settings/modals/AdminTransferModal').then(m => ({ default: m.AdminTransferModal })));
const DeleteTeamModal = lazy(() => import('@/app/team/components/settings/modals/DeleteTeamModal').then(m => ({ default: m.DeleteTeamModal })));
const RequestDataExportModal = lazy(() => import('@/app/team/components/settings/modals/RequestDataExportModal').then(m => ({ default: m.RequestDataExportModal })));

export function GlobalModalManager() {
    const { activeModal, modalData, closeModal } = useModal();

    if (!activeModal) return null;

    return (
        <Suspense fallback={null}>
            {/* Security Modals */}
            {activeModal === 'enforce_2fa' && (
                <Enforce2FAModal
                    isOpen={true}
                    onClose={closeModal}
                    membersWithout2FA={(modalData as Enforce2FAModalData).membersWithout2FA}
                    onConfirm={(modalData as Enforce2FAModalData).onConfirm}
                />
            )}
            {activeModal === 'revoke_session' && (
                <RevokeSessionModal
                    isOpen={true}
                    onClose={closeModal}
                    session={(modalData as RevokeSessionModalData).session}
                    onConfirm={(modalData as RevokeSessionModalData).onConfirm}
                />
            )}
            {activeModal === 'revoke_all_sessions' && (
                <RevokeAllSessionsModal
                    isOpen={true}
                    onClose={closeModal}
                    onConfirm={(modalData as ConfirmCallbackData).onConfirm}
                />
            )}
            {activeModal === 'add_ip_rule' && (
                <AddIpRuleModal
                    isOpen={true}
                    onClose={closeModal}
                    onConfirm={(modalData as IpRuleModalData).onConfirm}
                />
            )}
            {activeModal === 'edit_ip_rule' && (
                <EditIpRuleModal
                    isOpen={true}
                    onClose={closeModal}
                    rule={(modalData as IpRuleModalData).rule!}
                    onConfirm={(modalData as IpRuleModalData).onConfirm}
                />
            )}

            {/* Team / Member Modals */}
            {activeModal === 'invite_member' && (
                <InviteMemberModal
                    isOpen={true}
                    onClose={closeModal}
                    onSubmit={(modalData as InviteMemberModalData).onSubmit}
                />
            )}
            {activeModal === 'bulk_import' && (
                <BulkImportModal
                    isOpen={true}
                    onClose={closeModal}
                    onSubmit={(modalData as BulkImportModalData).onSubmit}
                />
            )}
            {activeModal === 'member_profile' && (
                <MemberProfileModal
                    isOpen={true}
                    onClose={closeModal}
                    member={(modalData as MemberProfileModalData).member}
                    onUpdatePermissions={(modalData as MemberProfileModalData).onUpdatePermissions}
                />
            )}
            {activeModal === 'date_range_picker' && (
                <DateRangePickerModal
                    isOpen={true}
                    onClose={closeModal}
                    initialRange={(modalData as DateRangePickerModalData).initialRange}
                    onApply={(modalData as DateRangePickerModalData).onApply}
                />
            )}
            {activeModal === 'activity_detail' && (
                <ActivityDetailModal
                    isOpen={true}
                    onClose={closeModal}
                    entry={(modalData as ActivityDetailModalData).entry}
                />
            )}

            {/* Billing Modals */}
            {activeModal === 'buy_credits' && (
                <BuyCreditsModal
                    isOpen={true}
                    onClose={closeModal}
                />
            )}
            {activeModal === 'update_payment' && (
                <UpdatePaymentMethodModal
                    isOpen={true}
                    onClose={closeModal}
                />
            )}
            {activeModal === 'change_plan' && (
                <ChangePlanModal
                    isOpen={true}
                    onClose={closeModal}
                    currentPlan={(modalData as PlanModalData).currentPlan}
                />
            )}
            {activeModal === 'switch_billing_model' && (
                <SwitchBillingModelModal
                    isOpen={true}
                    onClose={closeModal}
                    currentModel={(modalData as BillingModelModalData).currentModel}
                />
            )}

            {/* Developer Modals */}
            {activeModal === 'create_api_key' && (
                <CreateApiKeyModal
                    isOpen={true}
                    onClose={closeModal}
                    onSuccess={(modalData as SuccessCallbackData).onSuccess}
                />
            )}
            {activeModal === 'api_key_created' && (
                <ApiKeyCreatedModal
                    isOpen={true}
                    onClose={closeModal}
                    apiKey={(modalData as ApiKeyCreatedModalData).apiKey}
                    secretKey={(modalData as ApiKeyCreatedModalData).secretKey}
                />
            )}
            {activeModal === 'revoke_api_key' && (
                <RevokeApiKeyModal
                    isOpen={true}
                    onClose={closeModal}
                    onConfirm={(modalData as ConfirmCallbackData).onConfirm}
                />
            )}
            {activeModal === 'create_webhook' && (
                <AddWebhookModal
                    isOpen={true}
                    onClose={closeModal}
                    onSubmit={(modalData as CreateWebhookModalData).onSubmit}
                />
            )}
            {activeModal === 'edit_webhook' && (
                <EditWebhookModal
                    isOpen={true}
                    onClose={closeModal}
                    webhook={(modalData as WebhookModalData).webhook!}
                    onSubmit={(modalData as WebhookModalData).onSubmit}
                />
            )}
            {activeModal === 'webhook_created' && (
                <WebhookCreatedModal
                    isOpen={true}
                    onClose={closeModal}
                    webhook={(modalData as WebhookCreatedModalData).webhook}
                    signingSecret={(modalData as WebhookCreatedModalData).signingSecret}
                />
            )}
            {activeModal === 'delete_webhook' && (
                <DeleteWebhookModal
                    isOpen={true}
                    onClose={closeModal}
                    webhook={(modalData as DeleteWebhookModalData).webhook}
                    onConfirm={(modalData as DeleteWebhookModalData).onConfirm}
                />
            )}

            {/* Settings Modals */}
            {activeModal === 'admin_transfer' && (
                <AdminTransferModal
                    isOpen={true}
                    onClose={closeModal}
                    onSubmit={(modalData as AdminTransferModalData).onSubmit}
                />
            )}
            {activeModal === 'delete_team' && (
                <DeleteTeamModal
                    isOpen={true}
                    onClose={closeModal}
                    team={(modalData as DeleteTeamModalData).team}
                    impact={(modalData as DeleteTeamModalData).impact}
                    onSubmit={(modalData as DeleteTeamModalData).onSubmit}
                />
            )}
            {activeModal === 'request_data_export' && (
                <RequestDataExportModal
                    isOpen={true}
                    onClose={closeModal}
                    onSubmit={(modalData as RequestDataExportModalData).onSubmit}
                />
            )}
        </Suspense>
    );
}
