// src/api/antiForcedLabourApi.ts

import { AuditRecord as Audit, Partner, Outcome, AuditStatus, AuditType, PaginatedResult } from '../types/antiForcedLabourTypes';

// Updated mock data for audits with `status`, `type`, and partners with `id`
const auditHistory: Audit[] = [
    { id: '1', date: '2023-05-21', location: 'Factory A', auditor: 'Auditor A', outcome: Outcome.Pass, status: AuditStatus.Reviewed, type: AuditType.Internal, details: 'Compliant with all standards.' },
    { id: '2', date: '2023-08-12', location: 'Factory B', auditor: 'Auditor B', outcome: Outcome.Fail, status: AuditStatus.Pending, type: AuditType.External, details: 'Non-compliant: Unsafe working conditions.' },
    { id: '3', date: '2023-09-30', location: 'Factory C', auditor: 'Auditor C', outcome: Outcome.Pass, status: AuditStatus.Reviewed, type: AuditType.ThirdParty, details: 'Compliant after improvements.' },
    { id: '4', date: '2023-10-10', location: 'Factory D', auditor: 'Auditor D', outcome: Outcome.Fail, status: AuditStatus.Pending, type: AuditType.External, details: 'Non-compliant: Child labor detected.' },
];

const partnerOrganizations: Partner[] = [
    { id: 'p1', name: 'Fair Labor Association', url: 'https://www.fairlabor.org', description: 'Promotes fair labor practices globally.' },
    { id: 'p2', name: 'Anti-Slavery International', url: 'https://www.antislavery.org', description: 'Fights to end all forms of slavery.' },
    { id: 'p3', name: 'Human Rights Watch', url: 'https://www.hrw.org', description: 'Defends human rights worldwide.' },
    { id: 'p4', name: 'International Labour Organization', url: 'https://www.ilo.org', description: 'Sets international labor standards.' },
];

// Fetch paginated and filtered audit history with sorting
export async function fetchAuditHistory(
    outcomeFilter?: Outcome,
    statusFilter?: AuditStatus,
    startDate?: string,
    endDate?: string,
    sortByDate: 'asc' | 'desc' = 'asc',
    page: number = 1,
    pageSize: number = 2
): Promise<PaginatedResult<Audit>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            let results = [...auditHistory];

            // Filter by outcome
            if (outcomeFilter) {
                results = results.filter((audit) => audit.outcome === outcomeFilter);
            }

            // Filter by audit status
            if (statusFilter) {
                results = results.filter((audit) => audit.status === statusFilter);
            }

            // Filter by date range
            if (startDate || endDate) {
                const start = startDate ? new Date(startDate).getTime() : -Infinity;
                const end = endDate ? new Date(endDate).getTime() : Infinity;
                results = results.filter((audit) => {
                    const auditDate = new Date(audit.date).getTime();
                    return auditDate >= start && auditDate <= end;
                });
            }

            // Sort by date
            results.sort((a, b) => {
                return sortByDate === 'asc'
                    ? new Date(a.date).getTime() - new Date(b.date).getTime()
                    : new Date(b.date).getTime() - new Date(a.date).getTime();
            });

            // Pagination logic
            const totalRecords = results.length;
            const totalPages = Math.ceil(totalRecords / pageSize);
            const paginatedData = results.slice((page - 1) * pageSize, page * pageSize);

            resolve({
                data: paginatedData,
                currentPage: page,
                totalPages: totalPages,
                totalRecords: totalRecords,
            });
        }, 500); // Simulated network delay
    });
}

// Fetch paginated partner organizations with optional search
export async function fetchPartners(
    searchQuery?: string,
    page: number = 1,
    pageSize: number = 2
): Promise<PaginatedResult<Partner>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            let results = [...partnerOrganizations];

            // Filter by search query
            if (searchQuery) {
                results = results.filter((partner) =>
                    partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (partner.description && partner.description.toLowerCase().includes(searchQuery.toLowerCase()))
                );
            }

            // Pagination logic
            const totalRecords = results.length;
            const totalPages = Math.ceil(totalRecords / pageSize);
            const paginatedData = results.slice((page - 1) * pageSize, page * pageSize);

            resolve({
                data: paginatedData,
                currentPage: page,
                totalPages: totalPages,
                totalRecords: totalRecords,
            });
        }, 300); // Simulated network delay
    });
}
