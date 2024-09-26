import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { formValidator, generateFormFields } from '../../utils/formHelper';
import { ComplianceField } from '../../types/complianceTypes';

interface ComplianceFormProps {
  data: ComplianceField[];
  onSubmit: (data: any) => void;
}

export const ComplianceForm: React.FC<ComplianceFormProps> = ({ data, onSubmit }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [formFields, setFormFields] = useState<ComplianceField[]>([]);

  useEffect(() => {
    setFormFields(generateFormFields(data));
  }, [data]);

  const onSubmitHandler = (formData: any) => {
    if (formValidator(formData, formFields)) {
      onSubmit(formData);
      reset(); // Clear form on successful submission
    }
  };

  return (
    <div className="compliance-form p-4 border rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Compliance Form</h2>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {formFields.map((field) => (
          <div key={field.id} className="mb-4">
            <label className="block font-bold mb-1" htmlFor={field.id}>
              {field.label}
            </label>
            <input
              name={field.name}
              type={field.type}
              ref={register({ required: field.required })}
              className="w-full p-2 border rounded"
            />
            {errors[field.name] && (
              <span className="text-red-600 text-sm">This field is required</span>
            )}
          </div>
        ))}
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};
