// src/types/antiForcedLabourTypes.ts

// Enums for standardizing types
export enum Outcome {
  Pass = 'pass',
  Fail = 'fail',
}

export enum AlertPriority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum AlertCategory {
  Compliance = 'Compliance',
  Safety = 'Safety',
  Other = 'Other',
}

// New enum for audit status options
export enum AuditStatus {
  Pending = 'Pending',
  Reviewed = 'Reviewed',
  InProgress = 'InProgress',
}

// Enum for different types of audits
export enum AuditType {
  Internal = 'Internal',
  External = 'External',
  ThirdParty = 'ThirdParty',
}

// Record for audit history with detailed compliance information
export interface AuditRecord {
  id: string;
  date: string;                    // Date in ISO format
  location: string;
  auditor: string;                  // Name of the auditor
  outcome: Outcome;
  status: AuditStatus;              // Status of the audit
  type?: AuditType;                 // Type of audit, if applicable
  details?: string;                 // Optional field for audit comments or extra details
}

// Risk factor details related to forced labor
export interface RiskFactor {
  id: string;
  type: string;                     // Type of risk (e.g., "Child Labor", "Unsafe Conditions")
  percentage: number;               // Risk percentage (e.g., 25 for 25%)
  description?: string;             // Optional description of the risk factor
}

// Alert data structure for the anti-forced labor compliance module
export interface Alert {
  id: string;
  message: string;
  date: string;                     // Date in ISO format
  priority: AlertPriority;
  category: AlertCategory;
  isDismissed: boolean;
  actions?: AlertActions[];         // Optional actions for alert management
}

// Enum for possible actions on an alert
export enum AlertActions {
  Dismiss = 'Dismiss',
  Resolve = 'Resolve',
  Escalate = 'Escalate',
}

// Partner information and resources links
export interface Partner {
  id: string;                        // Unique identifier for partner
  name: string;
  url: string;
  description?: string;              // Optional field for a brief description of the partner organization
}

// Compliance form data for audit submissions
export interface ComplianceFormData {
  companyName: string;
  industry: string;
  country: string;
  auditDate: string;
  riskLevel: RiskFactor[];           // Array of associated risk factors
  auditRecords: AuditRecord[];       // Array of past audit records for this compliance form
}

// Paginated result structure for API responses
export interface PaginatedResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalRecords: number;
}

// Props for the AuditHistoryTable component
export interface AuditHistoryTableProps {
  audits: AuditRecord[];             // Array of audit records
}

// Props for the PartnerLinks component
export interface PartnerLinksProps {
  partners: Partner[];               // Array of partner links and descriptions
}

// Additional utilities for filtering and options
export type FilterOptions = 'All' | 'Pass' | 'Fail';

// Alias type if "Audit" is required separately from "AuditRecord"
export type Audit = AuditRecord;
