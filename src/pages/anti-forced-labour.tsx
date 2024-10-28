// src/pages/anti-forced-labour.tsx

import React, { useEffect, useState } from 'react';
import { ComplianceDashboard } from '../components/AntiForcedLabour/ComplianceDashboard';
import { RiskFactorChart } from '../components/AntiForcedLabour/RiskFactorChart';
import AuditHistoryTable from '../components/AntiForcedLabour/AuditHistoryTable';
import { ComplianceForm } from '../components/AntiForcedLabour/ComplianceForm';
import PartnerLinks from '../components/AntiForcedLabour/PartnerLinks';
import AlertsPanel from '../components/AntiForcedLabour/AlertsPanel';
import '../styles/antiForcedLabour.css';
import { fetchAuditHistory, fetchPartners } from '../api/antiForcedLabourApi';
import { Audit, Partner, Outcome } from '../types/antiForcedLabourTypes';

const AntiForcedLabourPage: React.FC = () => {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for filter controls
  const [outcomeFilter, setOutcomeFilter] = useState<Outcome | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch audits and partners with error handling
        const auditData = await fetchAuditHistory(
          outcomeFilter !== 'All' ? outcomeFilter : undefined,
          startDate || undefined,
          endDate || undefined,
          sortOrder
        );
        const partnerData = await fetchPartners();
        setAudits(auditData);
        setPartners(partnerData);
      } catch (e) {
        setError('Failed to load data. Please try again later.');
        console.error('Error fetching data:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [outcomeFilter, sortOrder, startDate, endDate]);

  return (
    <div className="anti-forced-labour-page container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Anti-Forced Labour Compliance and Risk Management</h1>
      
      {/* Loading and Error States */}
      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Alerts Panel */}
      <AlertsPanel />

      {/* Compliance Dashboard and Risk Chart */}
      <ComplianceDashboard />
      <RiskFactorChart />

      {/* Filter and Sort Controls */}
      <div className="filter-controls mb-4 flex gap-4">
        <label>
          Outcome Filter:
          <select value={outcomeFilter} onChange={(e) => setOutcomeFilter(e.target.value as Outcome | 'All')}>
            <option value="All">All</option>
            <option value={Outcome.Pass}>Pass</option>
            <option value={Outcome.Fail}>Fail</option>
          </select>
        </label>
        <label>
          Sort by Date:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <label>
          Start Date:
          <input type="date" value={startDate || ''} onChange={(e) => setStartDate(e.target.value || null)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate || ''} onChange={(e) => setEndDate(e.target.value || null)} />
        </label>
      </div>

      {/* Audit History Table */}
      <AuditHistoryTable audits={audits} />

      {/* Compliance Form */}
      <ComplianceForm />

      {/* Partner Links */}
      <PartnerLinks partners={partners} />
    </div>
  );
};

export default AntiForcedLabourPage;
