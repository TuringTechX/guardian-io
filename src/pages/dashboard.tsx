// src/pages/dashboard.tsx

import React, { useEffect, useState, useMemo, useCallback, useContext } from 'react';
import LineChart from '../components/Dashboard/Charts/LineChart';
import { PieChart } from '../components/Dashboard/Charts/PieChart';
import { BarChart } from '../components/Dashboard/Charts/BarChart';
import ProgressBar from '../components/UIElements/ProgressBar';
import Dropdown from '../components/Dropdown/Dropdown';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import NotificationBanner from '../components/UIElements/NotificationBanner';
import { useSupplyChainContext } from '../context/SupplyChainContext';
import { ESGContext } from '../context/ESGContext';
import { WebSocketAPI } from '../services/WebSocketAPI';

const Dashboard: React.FC = () => {
  const { suppliers, isLoading, refreshData } = useSupplyChainContext();
  const { esgMetrics, fetchESGMetrics } = useContext(ESGContext);

  const [selectedMetric, setSelectedMetric] = useState('ESG');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('All');
  const [complianceStatus, setComplianceStatus] = useState('All');
  const [realTimeData, setRealTimeData] = useState<any[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // WebSocket connection setup for real-time updates
  useEffect(() => {
    let socket: WebSocket | null = null;

    const connectWebSocket = () => {
      socket = WebSocketAPI.connect();

      socket.onopen = () => {
        setNotification('WebSocket connected');
        setRetryCount(0);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setRealTimeData((prevData) => mergeRealTimeData([...prevData, data], prevData));
      };

      socket.onerror = () => {
        setNotification('WebSocket connection error. Retrying...');
      };

      socket.onclose = () => {
        setNotification('WebSocket disconnected. Reconnecting...');
        reconnect();
      };
    };

    const reconnect = () => {
      setRetryCount((prev) => prev + 1);
      const delay = Math.min(1000 * Math.pow(2, retryCount), 30000);
      setTimeout(() => connectWebSocket(), delay);
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [retryCount]);

  // Memoize fetched data and merge it with real-time data
  const esgDataMemo = useMemo(() => mergeRealTimeData(realTimeData, esgMetrics), [esgMetrics, realTimeData]);

  const supplierDataMemo = useMemo(() => mergeRealTimeData(realTimeData, suppliers), [suppliers, realTimeData]);

  // Handlers for dropdown and input changes
  const handleMetricChange = useCallback((metric: string) => setSelectedMetric(metric), []);
  const handleRegionChange = useCallback((region: string) => setSelectedRegion(region), []);
  const handleRiskLevelChange = useCallback((riskLevel: string) => setSelectedRiskLevel(riskLevel), []);
  const handleComplianceChange = useCallback((status: string) => setComplianceStatus(status), []);
  const handleDateRangeChange = useCallback((range: { start: string, end: string }) => setDateRange(range), []);

  // Fetch initial data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([refreshData(), fetchESGMetrics()]);
      } catch (error) {
        setNotification('Error fetching data. Please try again.');
      }
    };
    fetchData();
  }, [refreshData, fetchESGMetrics]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard-container">
      {notification && <NotificationBanner message={notification} />}

      <header className="dashboard-header">
        <h1 className="dashboard-title">Platform Dashboard</h1>

        {/* Dropdowns for user selections */}
        <Dropdown options={['ESG', 'Supply Chain', 'Sustainability']} selected={selectedMetric} onChange={handleMetricChange} />
        <Dropdown options={['All', 'North America', 'Europe', 'Asia']} selected={selectedRegion} onChange={handleRegionChange} />
        <Dropdown options={['All', 'High', 'Medium', 'Low']} selected={selectedRiskLevel} onChange={handleRiskLevelChange} />
        <Dropdown options={['All', 'Compliant', 'Non-Compliant']} selected={complianceStatus} onChange={handleComplianceChange} />

        {/* Date range picker */}
        <input type="date" value={dateRange.start} onChange={(e) => handleDateRangeChange({ ...dateRange, start: e.target.value })} />
        <input type="date" value={dateRange.end} onChange={(e) => handleDateRangeChange({ ...dateRange, end: e.target.value })} />
      </header>

      <section className="dashboard-content grid grid-cols-1 md:grid-cols-3 gap-6">
        {selectedMetric === 'ESG' && (
          <div className="metric-section esg-metrics">
            <h2>ESG Overview</h2>
            <div className="charts-container grid grid-cols-2 gap-4">
              <PieChart data={esgDataMemo.distribution} />
              <BarChart data={esgDataMemo.ratings} />
            </div>
            <ProgressBar progress={esgDataMemo.progress || 0} max={100} label="ESG Goal Progress" />
          </div>
        )}

        {selectedMetric === 'Supply Chain' && (
          <div className="metric-section supply-chain-metrics">
            <h2>Supply Chain Transparency</h2>
            <LineChart data={supplierDataMemo.timeline} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;

// Helper Functions
function mergeRealTimeData(realTimeData: any[], originalData: any) {
  const mergedData = { ...originalData };
  realTimeData.forEach((update) => {
    Object.keys(update).forEach((key) => {
      if (mergedData[key]) {
        mergedData[key] = update[key];
      }
    });
  });
  return mergedData;
}
