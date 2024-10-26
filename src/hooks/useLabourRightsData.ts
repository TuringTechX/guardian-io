// src/hooks/useLabourRightsData.ts

import { useState, useEffect } from 'react';
import { labourRightsService } from '../services/labourRightsService';

export const useLabourRightsData = () => {
  const [auditData, setAuditData] = useState([]);
  const [riskScores, setRiskScores] = useState([]);

  useEffect(() => {
    labourRightsService.fetchAuditData().then(setAuditData);
    labourRightsService.fetchRiskScores().then(setRiskScores);
  }, []);

  return { auditData, riskScores };
};
