// src/components/CrimeReportForm.tsx

import React, { useState } from 'react';

interface CrimeReportFormProps {
  onSubmit: (report: any) => void;
}

export const CrimeReportForm: React.FC<CrimeReportFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState(1);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const report = { title, description, severity, latitude, longitude, date: new Date().toISOString() };
    onSubmit(report);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="number" value={severity} onChange={(e) => setSeverity(parseInt(e.target.value))} min="1" max="5" required />
      <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude" required />
      <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude" required />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Submit Report</button>
    </form>
  );
};
