"use client";

import FormPageTemplate from "../../../../components/templates/FormPageTemplate";
import { DOCUMENT_TYPES } from "../../../../config/documentTypes";
import ProtectedRoute from "../../../../components/ProtectedRoute";
export default function EditSuratKeluar({ params }) {
  return (
    <ProtectedRoute>
      <FormPageTemplate
        title={DOCUMENT_TYPES.SURAT_KELUAR.title}
        documentType="SURAT_KELUAR"
        recordId={params.id}
        fields={[{ name: "index", label: "Index", required: true }]}
        headerType={"back"}
      />
    </ProtectedRoute>
  );
}
