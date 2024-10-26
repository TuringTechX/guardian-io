// src/utils/labourRightsHelper.ts

export const calculateCompliancePercentage = (passedAudits: number, totalAudits: number) => {
    return (passedAudits / totalAudits) * 100;
  };
  