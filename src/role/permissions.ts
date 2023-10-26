enum Permissions {
  // User Permissions
  ViewUserProfile = 'view-user-profile',
  EditUserProfile = 'edit-user-profile',

  // Admin Permissions
  ManageUsers = 'manage-users',
  ManageContent = 'manage-content',
  ConfigureSettings = 'configure-settings',

  // Superadmin Permissions
  ManageAdmins = 'manage-admins',
  ManageRoles = 'manage-roles',
  AccessAdvancedSettings = 'access-advanced-settings',

  // Seller Permissions
  ManageStore = 'manage-store',
  ManageProducts = 'manage-products',
  ProcessOrders = 'process-orders',

  // Moderator Permissions
  ModerateContent = 'moderate-content',

  // Customer Support Permissions
  ViewUserDetails = 'view-user-details',
  ProvideSupport = 'provide-support',
  ResolveSupportTickets = 'resolve-support-tickets',

  // Content Creator Permissions
  CreateContent = 'create-content',
  ManageContentItems = 'manage-content-items',

  // Analytics Permissions
  ViewAnalytics = 'view-analytics',
  GenerateReports = 'generate-reports',

  // Guest Permissions
  ViewPublicContent = 'view-public-content',

  // Premium User Permissions
  AccessPremiumContent = 'access-premium-content',
  UseEnhancedFeatures = 'use-enhanced-features',
  PrioritySupport = 'priority-support',

  // VIP Permissions
  VIPAccess = 'vip-access',

  // Editor Permissions
  EditContent = 'edit-content',

  // Billing/Finance Permissions
  ManageFinancialRecords = 'manage-financial-records',
  ProcessPayments = 'process-payments',
  GenerateInvoices = 'generate-invoices',

  // Inventory Manager Permissions
  ManageInventory = 'manage-inventory',

  // Compliance Officer Permissions
  MonitorCompliance = 'monitor-compliance',
  ReportComplianceIssues = 'report-compliance-issues',
}
// Export the enum for use in your application
export { Permissions };
