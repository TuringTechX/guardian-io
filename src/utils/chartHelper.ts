// src/utils/chartHelper.ts

import { Metric } from '../types/sustainabilityTypes';

export const prepareChartData = (metrics: Metric[]) => {
  return metrics.map((metric) => ({
    x: metric.name,
    y: metric.value,
  }));
};
