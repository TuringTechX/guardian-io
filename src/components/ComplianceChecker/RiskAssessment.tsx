import React, { useEffect, useState } from 'react';

interface RiskAssessmentProps {
  riskScore: number | null;
}

export const RiskAssessment: React.FC<RiskAssessmentProps> = ({ riskScore }) => {
  const [riskLevel, setRiskLevel] = useState<string>('Unknown');

  useEffect(() => {
    if (riskScore !== null) {
      if (riskScore < 30) setRiskLevel('Low');
      else if (riskScore < 60) setRiskLevel('Moderate');
      else setRiskLevel('High');
    }
  }, [riskScore]);

  return (
    <div className="risk-assessment p-4 border rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Risk Assessment</h2>
      <div className="risk-score">
        <p className="text-3xl font-bold">{riskScore ?? 'Calculating...'}</p>
        <p className="text-lg">Risk Level: {riskLevel}</p>
      </div>
    </div>
  );
};
