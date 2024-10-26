// src/components/AntiForcedLabour/ComplianceForm.tsx

import React from 'react';

export const ComplianceForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <form className="compliance-form" onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-4">Submit Compliance Data</h3>
      <label>
        Audit Date
        <input type="date" name="date" required />
      </label>
      <label>
        Outcome
        <select name="outcome">
          <option value="pass">Pass</option>
          <option value="fail">Fail</option>
        </select>
      </label>
      <button type="submit" className="btn-submit">
        Submit
      </button>
    </form>
  );
};
