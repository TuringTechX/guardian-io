// src/pages/dashboard.tsx

import React, { useEffect, useState, useMemo, useCallback, useContext } from 'react';
import LineChart from '../components/Charts/LineChart';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import ProgressBar from '../components/ProgressBar';
import Dropdown from '../components/Dropdown';
import Tooltip from '../components/Tooltip';
import LoadingSpinner from '../components/LoadingSpinner';
import NotificationBanner from '../components/NotificationBanner'; // For WebSocket status notifications
import { useSupplyChainData } from '../hooks/useSupplyChainData';
import { useESGReporting } from '../hooks/useESGReporting';
import { SupplyChainContext } from '../context/SupplyChainContext';
import { ESGContext } from '../context/ESGContext';
import { WebSocketAPI } from '../services/WebSocketAPI';  // WebSocket connection setup

const Dashboard: React.FC = () => {
  const { supplyChainData, fetchSupplyChainData } = useContext(SupplyChainContext);
  const { esgMetrics, fetchESGMetrics } = useContext(ESGContext);
  const [selectedMetric, setSelectedMetric] = useState('ESG');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('All');
  const [complianceStatus, setComplianceStatus] = useState('All');
  const [realTimeData, setRealTimeData] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [notification, setNotification] = useState<string | null>(null); // For WebSocket status

  // Initialize WebSocket connection for real-time updates
  useEffect(() => {
    let socket: WebSocket | null = null;
    const connectWebSocket = () => {
      socket = WebSocketAPI.connect();

      socket.onopen = () => {
        setIsConnected(true);
        setNotification('WebSocket connected');
        setRetryCount(0);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setRealTimeData((prevData) => mergeRealTimeData([...prevData, data]));
      };

      socket.onerror = () => {
        console.error('WebSocket error');
        setIsConnected(false);
        setNotification('WebSocket connection error. Retrying...');
        reconnect();
      };

      socket.onclose = () => {
        setIsConnected(false);
        setNotification('WebSocket disconnected. Reconnecting...');
        reconnect();
      };
    };

    const reconnect = () => {
      setRetryCount((prevRetryCount) => prevRetryCount + 1);
      const delay = Math.min(1000 * Math.pow(2, retryCount), 30000); // Exponential backoff
      setTimeout(() => {
        connectWebSocket();
      }, delay);
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [retryCount]);

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Memoize fetched data and merge it with real-time data
  const esgDataMemo = useMemo(() => {
    return mergeRealTimeData(realTimeData, esgMetrics);
  }, [esgMetrics, realTimeData]);

  const supplyChainDataMemo = useMemo(() => {
    return mergeRealTimeData(realTimeData, supplyChainData);
  }, [supplyChainData, realTimeData]);

  // Efficient function for metric selection, avoiding unnecessary re-renders
  const handleMetricChange = useCallback((metric: string) => {
    setSelectedMetric(metric);
  }, []);

  // Handle region, risk level, compliance status filter change
  const handleRegionChange = useCallback((region: string) => {
    setSelectedRegion(region);
  }, []);

  const handleRiskLevelChange = useCallback((riskLevel: string) => {
    setSelectedRiskLevel(riskLevel);
  }, []);

  const handleComplianceChange = useCallback((status: string) => {
    setComplianceStatus(status);
  }, []);

  // Handle date range filter change
  const handleDateRangeChange = useCallback((range: { start: string, end: string }) => {
    setDateRange(range);
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchSupplyChainData(), fetchESGMetrics()]);
      setIsLoading(false);
    };
    fetchData();
  }, [fetchSupplyChainData, fetchESGMetrics]);

  // Filtering data based on multiple criteria: date range, region, risk level, and compliance
  const filteredSupplyChainData = useMemo(() => {
    return filterDataByCriteria(supplyChainDataMemo.timeline, dateRange, selectedRegion, selectedRiskLevel, complianceStatus);
  }, [supplyChainDataMemo.timeline, dateRange, selectedRegion, selectedRiskLevel, complianceStatus]);

  // Calculate analytics based on filtered data
  const analyticsData = useMemo(() => {
    return calculateAnalytics(filteredSupplyChainData);
  }, [filteredSupplyChainData]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard-container">
      {/* WebSocket Notification */}
      {notification && <NotificationBanner message={notification} />}

      <header className="dashboard-header">
        <h1 className="dashboard-title">Platform Dashboard</h1>
        <Dropdown
          options={['ESG', 'Supply Chain', 'Sustainability']}
          selected={selectedMetric}
          onChange={handleMetricChange}
        />
        {/* Region Filter */}
        <Dropdown
          options={['All', 'North America', 'Europe', 'Asia', 'South America']}
          selected={selectedRegion}
          onChange={handleRegionChange}
        />
        {/* Risk Level Filter */}
        <Dropdown
          options={['All', 'High', 'Medium', 'Low']}
          selected={selectedRiskLevel}
          onChange={handleRiskLevelChange}
        />
        {/* Compliance Status Filter */}
        <Dropdown
          options={['All', 'Compliant', 'Non-Compliant']}
          selected={complianceStatus}
          onChange={handleComplianceChange}
        />
        {/* Date Range Filter */}
        <input type="date" onChange={(e) => handleDateRangeChange({ ...dateRange, start: e.target.value })} />
        <input type="date" onChange={(e) => handleDateRangeChange({ ...dateRange, end: e.target.value })} />
      </header>

      <section className="dashboard-content grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ESG Metrics Section */}
        {selectedMetric === 'ESG' && (
          <div className="metric-section esg-metrics">
            <h2>ESG Overview</h2>
            <div className="charts-container grid grid-cols-2 gap-4">
              <PieChart data={esgDataMemo.distribution} title="ESG Distribution" />
              <BarChart data={esgDataMemo.ratings} title="ESG Ratings by Category" />
            </div>
            <div className="progress-section">
              <ProgressBar value={esgDataMemo.progress} max={100} label="ESG Goal Progress" />
              <Tooltip message="ESG goals based on 2024 targets." />
            </div>
          </div>
        )}

        {/* Supply Chain Transparency Section */}
        {selectedMetric === 'Supply Chain' && (
          <div className="metric-section supply-chain-metrics">
            <h2>Supply Chain Transparency</h2>
            <LineChart data={filteredSupplyChainData} title="Transparency Over Time" />
            <BarChart data={supplyChainDataMemo.risks} title="Risk Assessment by Region" />
            <div className="progress-section">
              <ProgressBar value={supplyChainDataMemo.complianceProgress} max={100} label="Compliance Progress" />
            </div>
          </div>
        )}

        {/* Sustainability Section */}
        {selectedMetric === 'Sustainability' && (
          <div className="metric-section sustainability-metrics">
            <h2>Sustainability Metrics</h2>
            <LineChart data={supplyChainDataMemo.co2Reduction} title="CO2 Reduction Over Time" />
            <PieChart data={supplyChainDataMemo.energyUsage} title="Energy Usage Breakdown" />
            <div className="progress-section">
              <ProgressBar value={supplyChainDataMemo.sustainabilityScore} max={100} label="Sustainability Score" />
            </div>
          </div>
        )}

        {/* Analytics Section */}
        <div className="analytics-section">
          <h2>Analytics Summary</h2>
          <ul>
            <li>Average Risk Level: {analyticsData.averageRiskLevel}</li>
            <li>Compliance Percentage: {analyticsData.compliancePercentage}%</li>
            <li>Total Data Points: {analyticsData.totalDataPoints}</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

// Helper functions

/**
 * Merges real-time data with the existing dataset.
 */
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

/**
 * Filters data by selected date range, region, risk level, and compliance status.
 */
function filterDataByCriteria(data: any[], dateRange: { start: string, end: string }, region: string, riskLevel: string, complianceStatus: string) {
  const { start, end } = dateRange;

  // Filter by region
  const regionFiltered = region !== 'All' ? data.filter(item => item.region === region) : data;

  // Filter by date range
  const startDate = start ? new Date(start) : new Date(0);
  const endDate = end ? new Date(end) : new Date();
  const dateFiltered = regionFiltered.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });

  // Filter by risk level
  const riskFiltered = riskLevel !== 'All' ? dateFiltered.filter(item => item.riskLevel === riskLevel) : dateFiltered;

  // Filter by compliance status
  const complianceFiltered = complianceStatus !== 'All' ? riskFiltered.filter(item => item.complianceStatus === complianceStatus) : riskFiltered;

  return complianceFiltered;
}

/**
 * Calculates analytics (e.g., average risk level, compliance percentage) from filtered data.
 */
function calculateAnalytics(data: any[]) {
  const totalDataPoints = data.length;
  const totalRiskLevels = { High: 0, Medium: 0, Low: 0 };
  const compliantCount = data.filter(item => item.complianceStatus === 'Compliant').length;

  data.forEach(item => {
    totalRiskLevels[item.riskLevel]++;
  });

  const averageRiskLevel = Object.keys(totalRiskLevels).reduce((a, b) => totalRiskLevels[a] > totalRiskLevels[b] ? a : b);

  const compliancePercentage = ((compliantCount / totalDataPoints) * 100).toFixed(2);

  return {
    averageRiskLevel,
    compliancePercentage,
    totalDataPoints
  };
}
