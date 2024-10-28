// guardian-io/src/components/AntiForcedLabour/AlertsPanel.tsx

import React, { useEffect, useState } from 'react';
import { fetchAlerts, dismissAlert } from '../../api/alertApi';
import { Alert, AlertCategory } from '../../types/alertTypes';
import './alertsPanel.css';

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<AlertCategory | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch alerts on component load
  useEffect(() => {
    async function loadAlerts() {
      const data = await fetchAlerts();
      setAlerts(data);
    }
    loadAlerts();
  }, []);

  // Filter alerts by category
  const filteredAlerts = alerts.filter(
    (alert) => filter === 'All' || alert.category === filter
  );

  // Sort alerts by date based on sortOrder
  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    return sortOrder === 'asc'
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Handle dismissing an alert
  const handleDismiss = async (id: string) => {
    await dismissAlert(id);
    setAlerts((prev) => prev.map(alert => 
      alert.id === id ? { ...alert, isDismissed: true } : alert
    ));
  };

  return (
    <div className="alerts-panel">
      <h2>Anti-Forced Labour Alerts</h2>
      
      {/* Filter and Sort Controls */}
      <div className="controls">
        <label>
          Category:
          <select value={filter} onChange={(e) => setFilter(e.target.value as AlertCategory | 'All')}>
            <option value="All">All</option>
            {Object.values(AlertCategory).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>

        <label>
          Sort by Date:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      {/* Alert List */}
      <div className="alert-list">
        {sortedAlerts.map((alert) =>
          !alert.isDismissed ? (
            <div key={alert.id} className={`alert-item ${alert.priority.toLowerCase()}`}>
              <p>{alert.message}</p>
              <small>{new Date(alert.date).toLocaleString()}</small>
              <span>Priority: {alert.priority}</span>
              <button onClick={() => handleDismiss(alert.id)}>Dismiss</button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
