// src/hooks/useAntiForcedLabourData.ts

import { useState, useEffect } from 'react';
import { antiForcedLabourService } from '../services/antiForcedLabourService';

export const useAntiForcedLabourData = () => {
  const [auditData, setAuditData] = useState([]);
  const [riskData, setRiskData] = useState([]);

  useEffect(() => {
    antiForcedLabourService.fetchAuditData().then(setAuditData);
    antiForcedLabourService.fetchRiskData().then(setRiskData);
  }, []);

  return { auditData, riskData };
};
