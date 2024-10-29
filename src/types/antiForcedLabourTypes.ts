// src/types/antiForcedLabourTypes.ts

// Enums for standardized values

export enum Outcome {
  Pass = 'Pass',
  Fail = 'Fail',
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

// Enum for audit status options
export enum AuditStatus {
  Pending = 'Pending',
  Reviewed = 'Reviewed',
  InProgress = 'InProgress',
}

// Enum for types of audits conducted
export enum AuditType {
  Internal = 'Internal',
  External = 'External',
  ThirdParty = 'ThirdParty',
}

// Enum for possible actions on an alert
export enum AlertActions {
  Dismiss = 'Dismiss',
  Resolve = 'Resolve',
  Escalate = 'Escalate',
}

// Interface representing a single audit record in history
export interface AuditRecord {
  id: string;
  date: string;                   // ISO format date string
  location: string;
  auditor: string;
  outcome: Outcome;
  status: AuditStatus;
  type?: AuditType;
  details?: string;               // Optional additional information or comments
}

// Interface representing risk factors associated with forced labor compliance
export interface RiskFactor {
  id: string;
  type: string;                   // Type of risk (e.g., "Child Labor", "Unsafe Conditions")
  percentage: number;             // Percentage representing the risk level (0-100)
  description?: string;           // Optional description for additional details
}

// Interface representing alerts in the anti-forced labor module
export interface Alert {
  id: string;
  message: string;
  date: string;                   // ISO format date string
  priority: AlertPriority;
  category: AlertCategory;
  isDismissed: boolean;
  actions?: AlertActions[];       // Optional actions available for this alert
}

// Interface for partner organizations and resources links
export interface Partner {
  id: string;
  name: string;
  url: string;
  description?: string;           // Optional brief description of the partner organization
}

// Interface for compliance form data related to audit submissions
export interface ComplianceFormData {
  companyName: string;
  industry: string;
  country: string;
  auditDate: string;
  riskLevel: RiskFactor[];
  auditRecords: AuditRecord[];
}

// Generic interface for paginated API results
export interface PaginatedResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalRecords: number;
}

// Props for the AuditHistoryTable component
export interface AuditHistoryTableProps {
  audits: PaginatedResult<AuditRecord>;   // Updated to handle paginated results of audits
}

// Props for the PartnerLinks component
export interface PartnerLinksProps {
  partners: Partner[];
}

// Type for additional filter options available in the UI
export type FilterOptions = 'All' | 'Pass' | 'Fail';

// Alias type if "Audit" is required separately from "AuditRecord"
export type Audit = AuditRecord;

