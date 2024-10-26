// src/services/sustainabilityService.ts

import { Metric, LifeCycleAssessment } from '../types/sustainabilityTypes';
import { apiHelper } from '../utils/apiHelper';

export const fetchSustainabilityMetrics = async (): Promise<Metric[]> => {
  const response = await apiHelper.get('/sustainability/metrics');
  return response.data;
};

export const fetchLifeCycleAssessments = async (): Promise<LifeCycleAssessment[]> => {
  const response = await apiHelper.get('/sustainability/lifecycle-assessments');
  return response.data;
};
