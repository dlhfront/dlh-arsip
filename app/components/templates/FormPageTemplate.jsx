// components/templates/FormPageTemplate.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../organism/PageHeader";
import RecordForm from "../organism/RecordForm";

const FormPageTemplate = ({
  title,
  documentType,
  recordId = null,
  fields = [],
}) => {
  const router = useRouter();
  const [classifications, setClassifications] = useState([]);

  useEffect(() => {
    const fetchClassifications = async () => {
      try {
        const response = await fetch("/api/classifications");
        if (!response.ok) throw new Error("Failed to fetch classifications");
        const data = await response.json();
        setClassifications(data);
      } catch (error) {
        console.error("Error fetching classifications:", error);
      }
    };
    fetchClassifications();
  }, []);

  const handleSuccess = () => {
    router.push(`/dashboard/${documentType.toLowerCase().replace("_", "")}`);
  };

  return (
    <div className="p-4 ">
      <PageHeader
        title={`${recordId ? "Edit" : "Create New"} | ${title}`}
        backLink={`/dashboard/${documentType.toLowerCase().replace("_", "")}`}
      />
      
      <div className="bg-white rounded-lg shadow p-6 mt-4 w-1/2 ">
        <RecordForm
          documentType={documentType}
          recordId={recordId}
          onSuccess={handleSuccess}
          fields={fields}
          classifications={classifications}
        />
      </div>
    </div>
  );
};

export default FormPageTemplate;