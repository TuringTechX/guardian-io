// src/mocks/mockData/dashboardData.ts
export default {
    metrics: {
      totalSuppliers: 50,
      activeSuppliers: 40,
    },
    charts: {
      lineChart: [/* some data */],
      barChart: [/* some data */],
    },
  };
  
  // src/mocks/mockData/complianceData.ts
  export default {
    status: 'passed',
    progress: 80,
  };
  
  // src/mocks/mockData/riskData.ts
  export default {
    risks: [
      { id: 'risk1', score: 75 },
      { id: 'risk2', score: 60 },
    ],
  };
  