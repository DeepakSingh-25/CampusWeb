import { ContractCompaniesCompanyManagementPage } from './company-management/company-management.component';
import { ContractCompaniesContractsPostsPage } from './contracts-posts/contracts-posts.component';
import { ContractCompaniesStaffPoolPage } from './staff-pool/staff-pool.component';
import { ContractCompaniesDailyDeploymentPage } from './daily-deployment/daily-deployment.component';
import { ContractCompaniesClaimsBillsPage } from './claims-bills/claims-bills.component';
import { ContractCompaniesPaymentSettlementPage } from './payment-settlement/payment-settlement.component';
import { ContractCompaniesSetupPage } from './setup/setup.component';
import { ContractCompaniesReportsPage } from './reports/reports.component';
import { ContractCompaniesHistoryAuditPage } from './history-audit/history-audit.component';

export const ContractCompaniesPages = {
  "Company Management": ContractCompaniesCompanyManagementPage,
  "Contracts & Posts": ContractCompaniesContractsPostsPage,
  "Staff Pool": ContractCompaniesStaffPoolPage,
  "Daily Deployment": ContractCompaniesDailyDeploymentPage,
  "Claims / Bills": ContractCompaniesClaimsBillsPage,
  "Payment / Settlement": ContractCompaniesPaymentSettlementPage,
  "Setup": ContractCompaniesSetupPage,
  "Reports": ContractCompaniesReportsPage,
  "History / Audit": ContractCompaniesHistoryAuditPage
};
