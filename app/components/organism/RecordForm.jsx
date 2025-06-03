// components/organisms/RecordForm.jsx
"use client";

import { useState, useEffect } from "react";
import TextInput from "../atoms/Form/TextInput";
import DateInput from "../atoms/Form/DateInput";
import ClassificationDropdown from "../molecules/ClassificationDropdown";
import SubmitButton from "../atoms/Form/SubmitButton";
import { toast } from "react-toastify";

const RecordForm = ({
  documentType,
  recordId = null,
  onSuccess,
  fields = [],
  classifications = [],
}) => {
  const [formData, setFormData] = useState({
    origin: "",
    summary: "",
    date: "",
    classificationCode: "",
    classificationTitle: "",
    ...fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
  });
  const [isLoading, setIsLoading] = useState(!!recordId);

  useEffect(() => {
    if (recordId) {
      const fetchRecord = async () => {
        try {
          const response = await fetch(`/api/records/${recordId}`);
          if (!response.ok) throw new Error("Failed to fetch record a");
          const data = await response.json();
          
          setFormData({
            origin: data.origin || "",
            summary: data.summary || "",
            date: data.date ? new Date(data.date).toISOString().split('T')[0] : "",
            classificationCode: data.classificationCode || "",
            classificationTitle: data.classification?.title || "",
            ...fields.reduce((acc, field) => ({ 
              ...acc, 
              [field.name]: data[field.name] || "" 
            }), {}),
          });
        } catch (error) {
          toast.error("Failed to load record data aa");
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchRecord();
    }
  }, [recordId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClassificationSelect = (classification) => {
    setFormData(prev => ({
      ...prev,
      classificationCode: classification.code,
      classificationTitle: classification.title,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = recordId ? "PUT" : "POST";
    const url = recordId ? `/api/records/${recordId}` : "/api/records";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, documentType }),
      });

      if (!response.ok) throw new Error(response.statusText);
      
      toast.success(`Record ${recordId ? "updated" : "created"} successfully`);
      onSuccess();
    } catch (error) {
      toast.error(`Failed to ${recordId ? "update" : "create"} record`);
      console.error(error);
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <TextInput
          key={field.name}
          label={field.label}
          name={field.name}
          value={formData[field.name]}
          onChange={handleInputChange}
          required={field.required}
        />
      ))}

      <TextInput
        label="Asal"
        name="origin"
        value={formData.origin}
        onChange={handleInputChange}
        required
      />

      <TextInput
        label="Ringkasan"
        name="summary"
        value={formData.summary}
        onChange={handleInputChange}
        required
      />

      <DateInput
        label="Tanggal"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        required
      />

      <ClassificationDropdown
        value={formData.classificationTitle}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          classificationTitle: e.target.value
        }))}
        onSelect={handleClassificationSelect}
        classifications={classifications}
      />

      <SubmitButton className="mt-6" />
    </form>
  );
};

export default RecordForm;