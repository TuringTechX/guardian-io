// src/utils/exportHelper.ts
import { saveAs } from 'file-saver';

export const exportData = (data: any) => {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'wildlife-crime-report.csv');
};

const convertToCSV = (data: any) => {
  // Logic to convert JSON to CSV
};
