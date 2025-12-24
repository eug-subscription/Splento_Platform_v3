/**
 * Sample Commands Data for Command Palette
 * 
 * Enterprise dashboard commands for navigation, actions, and settings.
 */

import type { CommandItem } from "../types/command-palette";
import { router } from "../router";

export const enterpriseCommands: CommandItem[] = [
    // ==================== Navigation ====================
    {
        id: "home",
        label: "Go to Home",
        description: "Navigate to dashboard",
        icon: "gravity-ui:house",
        shortcut: { key: "H", modifier: "command" },
        section: "Navigation",
        action: () => {
            router.navigate({ to: "/dashboard" });
        },
        keywords: ["dashboard", "main"],
    },
    {
        id: "settings",
        label: "Company Settings",
        description: "Manage company account settings",
        icon: "gravity-ui:gear",
        shortcut: { key: ",", modifier: "command" },
        section: "Navigation",
        action: () => {
            router.navigate({ to: "/settings" });
        },
        keywords: ["preferences", "config", "configuration", "account"],
    },
    {
        id: "billing",
        label: "Billing & Credits",
        description: "View credits and manage billing",
        icon: "gravity-ui:credit-card",
        shortcut: { key: "B", modifier: "command" },
        section: "Navigation",
        action: () => {
            router.navigate({ to: "/settings" });
        },
        keywords: ["payments", "subscription", "credits"],
    },
    {
        id: "team",
        label: "Team Members",
        description: "Manage team and permissions",
        icon: "gravity-ui:persons",
        section: "Navigation",
        action: () => {
            router.navigate({ to: "/team" });
        },
        keywords: ["users", "permissions", "managers"],
    },

    // ==================== Actions ====================
    {
        id: "new-project",
        label: "Create New Project",
        description: "Start a new photography project",
        icon: "gravity-ui:plus",
        shortcut: { key: "N", modifier: "command" },
        section: "Actions",
        action: () => {
            // openModal("create-project")
        },
        keywords: ["add", "create", "new"],
    },
    {
        id: "upload",
        label: "Upload Photos",
        description: "Upload images to your project",
        icon: "gravity-ui:arrow-up-from-line",
        shortcut: { key: "U", modifier: "command" },
        section: "Actions",
        action: () => {
            // openFileDialog()
        },
        keywords: ["import", "add files", "images"],
    },
    {
        id: "generate-ai",
        label: "Generate with AI",
        description: "Create content using AI tools",
        icon: "gravity-ui:sparkles",
        shortcut: { key: "G", modifier: "command" },
        section: "Actions",
        action: () => {
            // openAIGenerator()
        },
        keywords: ["ai", "artificial intelligence", "create", "generate"],
    },
    {
        id: "export",
        label: "Export Projects",
        description: "Download projects as ZIP or CSV",
        icon: "gravity-ui:arrow-down-to-line",
        shortcut: { key: "E", modifier: "command" },
        section: "Actions",
        action: () => {
            // exportData()
        },
        keywords: ["download", "save", "backup"],
    },
    {
        id: "buy-credits",
        label: "Buy Credits",
        description: "Purchase additional credits",
        icon: "gravity-ui:coins",
        section: "Actions",
        action: () => {
            router.navigate({ to: "/settings" }); // Mapping to settings/billing for now
        },
        keywords: ["purchase", "top up", "add credits"],
    },

    // ==================== Help ====================
    {
        id: "docs",
        label: "Documentation",
        description: "Read the user guide",
        icon: "gravity-ui:book-open",
        section: "Help",
        action: () => {
            window.open("https://docs.example.com", "_blank");
        },
        keywords: ["guide", "manual", "help"],
    },
    {
        id: "shortcuts",
        label: "Keyboard Shortcuts",
        description: "View all available shortcuts",
        icon: "gravity-ui:keyboard",
        shortcut: { key: "?", modifier: "shift" },
        section: "Help",
        action: () => {
            // openModal("shortcuts")
        },
        keywords: ["hotkeys", "commands"],
    },
    {
        id: "support",
        label: "Contact Support",
        description: "Get help from our team",
        icon: "gravity-ui:comment",
        section: "Help",
        action: () => {
            // openChat()
        },
        keywords: ["contact", "help", "chat"],
    },
    {
        id: "feedback",
        label: "Send Feedback",
        description: "Share your thoughts and suggestions",
        icon: "gravity-ui:thumbs-up",
        section: "Help",
        action: () => {
            // openFeedbackForm()
        },
        keywords: ["suggest", "report", "idea"],
    },

    // ==================== System ====================
    {
        id: "theme-toggle",
        label: "Toggle Theme",
        description: "Switch between light and dark mode",
        icon: "gravity-ui:sun",
        shortcut: { key: "T", modifier: "command" },
        section: "System",
        action: () => {
            const html = document.documentElement;
            const currentTheme = html.classList.contains("dark") ? "dark" : "light";
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            html.classList.remove(currentTheme);
            html.classList.add(newTheme);
            html.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
        },
        keywords: ["dark mode", "light mode", "appearance"],
    },
    {
        id: "logout",
        label: "Log Out",
        description: "Sign out of your account",
        icon: "gravity-ui:arrow-right-from-square",
        section: "System",
        action: () => {
            // logout()
        },
        keywords: ["sign out", "exit"],
    },
];
