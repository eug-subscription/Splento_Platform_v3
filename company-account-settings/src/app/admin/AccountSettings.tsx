import { Button } from "@heroui/react";
import { useAccountSettings } from './hooks/useAccountSettings';
import { CompanyInfoSection } from './sections/CompanyInfoSection';
import { BillingSection } from './sections/BillingSection';
import { ManagersSection } from './sections/ManagersSection';
import { FileProcessingSection } from './sections/FileProcessingSection';
import { MailSettingsSection } from './sections/MailSettingsSection';
import { TagsSection } from './sections/TagsSection';
import { SocialLinksSection } from './sections/SocialLinksSection';
import { DisplaySettingsSection } from './sections/DisplaySettingsSection';

export function AccountSettings() {
    const {
        managers, newManager, setNewManager,
        companyInfo, setCompanyInfo,
        autorenameMode, setAutorenameMode,
        unpaidInvoicesLimit, setUnpaidInvoicesLimit,
        mailSettings, setMailSettings,
        fileNamePrefixes, setFileNamePrefixes,
        prebookingSettings, setPrebookingSettings,
        otherSettings, setOtherSettings,
        billingAddress, setBillingAddress,
        socialLinks, setSocialLinks,
        tags, tagInput, setTagInput,
        handlers
    } = useAccountSettings();

    // Helper to get initials for Avatar
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-background py-10 font-sans text-foreground">
            <div className="max-w-5xl mx-auto px-4 md:px-8">
                {/* ========== PAGE HEADER ========== */}
                <div className="flex flex-row justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-semibold text-foreground">
                            Company Account
                        </h1>
                        <p className="text-sm text-foreground/50 mt-1">Manage company details, preferences, and team members.</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <Button variant="secondary">Discard</Button>
                        <Button variant="primary" onPress={handlers.handleSave}>
                            Save
                        </Button>
                    </div>
                </div>

                {/* ========== 2-COLUMN GRID LAYOUT ========== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* ========== LEFT COLUMN (Span 2) ========== */}
                    <div className="lg:col-span-2 space-y-6">
                        <CompanyInfoSection companyInfo={companyInfo} setCompanyInfo={setCompanyInfo} />
                        <BillingSection
                            unpaidInvoicesLimit={unpaidInvoicesLimit}
                            setUnpaidInvoicesLimit={setUnpaidInvoicesLimit}
                            billingAddress={billingAddress}
                            setBillingAddress={setBillingAddress}
                        />
                        <FileProcessingSection
                            autorenameMode={autorenameMode}
                            setAutorenameMode={setAutorenameMode}
                            fileNamePrefixes={fileNamePrefixes}
                            setFileNamePrefixes={setFileNamePrefixes}
                            prebookingSettings={prebookingSettings}
                            setPrebookingSettings={setPrebookingSettings}
                        />
                        <ManagersSection
                            managers={managers}
                            newManager={newManager}
                            setNewManager={setNewManager}
                            handlers={handlers}
                            getInitials={getInitials}
                        />
                    </div>

                    {/* ========== RIGHT COLUMN (Span 1) ========== */}
                    <div className="space-y-6">
                        <MailSettingsSection mailSettings={mailSettings} setMailSettings={setMailSettings} />
                        <DisplaySettingsSection otherSettings={otherSettings} setOtherSettings={setOtherSettings} />
                        <TagsSection
                            tags={tags}
                            tagInput={tagInput}
                            setTagInput={setTagInput}
                            handlers={handlers}
                        />
                        <SocialLinksSection socialLinks={socialLinks} setSocialLinks={setSocialLinks} />
                    </div>
                </div>
            </div>
        </div>
    );
}
