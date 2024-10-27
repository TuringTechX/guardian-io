// src/pages/dashboard.tsx
import React, { useEffect, useState, useMemo, useCallback, useContext } from 'react';
import LineChart from '../components/Dashboard/Charts/LineChart';
import { PieChart } from '../components/Dashboard/Charts/PieChart';
import { BarChart } from '../components/Dashboard/Charts/BarChart';
import ProgressBar from '../components/UIElements/ProgressBar';
import Dropdown from '../components/Dropdown/Dropdown'; 
import Tooltip from '../components/UIElements/Tooltip';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import NotificationBanner from '../components/UIElements/NotificationBanner'; 
import { useSupplyChainData } from '../hooks/useSupplyChainData';
import { useESGReporting } from '../hooks/useESGReporting';
import { SupplyChainContext } from '../context/SupplyChainContext';
import { ESGContext } from '../context/ESGContext';
import { WebSocketAPI } from '../services/WebSocketAP

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
  const [notification, setNotification] = useState<string | null>(null); 

  // Initialize WebSocket connection for real-time updates
  useEffect(() => {
    let socket: WebSocket | null = null;
    const connectWebSocket = () => {
      socket = WebSocketAPI.connect();

      socket.onopen = () => {
        setIsConnected(true);
        setNotification('WebSocket connected');
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setRealTimeData((prevData) => mergeRealTimeData([...prevData, data]));
      };

      socket.onerror = () => {
        setIsConnected(false);
        setNotification('WebSocket connection error. Retrying...');
      };

      socket.onclose = () => {
        setIsConnected(false);
        setNotification('WebSocket disconnected. Reconnecting...');
        reconnect();
      };
    };

    const reconnect = () => {
      const delay = Math.min(1000 * Math.pow(2, retryCount), 30000); 
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

  // Memoize fetched data and merge it with real-time data
  const esgDataMemo = useMemo(() => {
    return mergeRealTimeData(realTimeData, esgMetrics);
  }, [esgMetrics, realTimeData]);

  const supplyChainDataMemo = useMemo(() => {
    return mergeRealTimeData(realTimeData, supplyChainData);
  }, [supplyChainData, realTimeData]);

  const handleMetricChange = useCallback((metric: string) => {
    setSelectedMetric(metric);
  }, []);

  const handleRegionChange = useCallback((region: string) => {
    setSelectedRegion(region);
  }, []);

  const handleRiskLevelChange = useCallback((riskLevel: string) => {
    setSelectedRiskLevel(riskLevel);
  }, []);

  const handleComplianceChange = useCallback((status: string) => {
    setComplianceStatus(status);
  }, []);

  const handleDateRangeChange = useCallback((range: { start: string, end: string }) => {
    setDateRange(range);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchSupplyChainData(), fetchESGMetrics()]);
      setIsLoading(false);
    };
    fetchData();
  }, [fetchSupplyChainData, fetchESGMetrics]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard-container">
      {notification && <NotificationBanner message={notification} />}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Platform Dashboard</h1>
        <Dropdown options={['ESG', 'Supply Chain', 'Sustainability']} selected={selectedMetric} onChange={handleMetricChange} />
        <Dropdown options={['All', 'North America', 'Europe', 'Asia']} selected={selectedRegion} onChange={handleRegionChange} />
        <Dropdown options={['All', 'High', 'Medium', 'Low']} selected={selectedRiskLevel} onChange={handleRiskLevelChange} />
        <Dropdown options={['All', 'Compliant', 'Non-Compliant']} selected={complianceStatus} onChange={handleComplianceChange} />
        <input type="date" onChange={(e) => handleDateRangeChange({ ...dateRange, start: e.target.value })} />
        <input type="date" onChange={(e) => handleDateRangeChange({ ...dateRange, end: e.target.value })} />
      </header>
      <section className="dashboard-content grid grid-cols-1 md:grid-cols-3 gap-6">
        {selectedMetric === 'ESG' && (
          <div className="metric-section esg-metrics">
            <h2>ESG Overview</h2>
            <div className="charts-container grid grid-cols-2 gap-4">
              <PieChart data={esgDataMemo.distribution} title="ESG Distribution" />
              <BarChart data={esgDataMemo.ratings} title="ESG Ratings by Category" />
            </div>
            <ProgressBar value={esgDataMemo.progress} max={100} label="ESG Goal Progress" />
          </div>
        )}
        {selectedMetric === 'Supply Chain' && (
          <div className="metric-section supply-chain-metrics">
            <h2>Supply Chain Transparency</h2>
            <LineChart data={supplyChainDataMemo.timeline} title="Transparency Over Time" />
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;

// Helper functions

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

function calculateAnalytics(data: any[]) {
  const totalDataPoints = data.length;
  const compliantCount = data.filter(item => item.complianceStatus === 'Compliant').length;
  const compliancePercentage = ((compliantCount / totalDataPoints) * 100).toFixed(2);
  return {
    compliancePercentage,
    totalDataPoints
  };
}
