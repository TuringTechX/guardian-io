// guardian-io/src/api/alertApi.ts

import { Alert } from '../types/alertTypes';

export async function fetchAlerts(): Promise<Alert[]> {
  const response = await fetch('/api/alerts');
  return response.json();
}

export async function dismissAlert(id: string): Promise<void> {
  await fetch(`/api/alerts/${id}`, { method: 'DELETE' });
}
