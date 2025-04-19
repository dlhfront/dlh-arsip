"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import FormPageTemplate from "../../../components/templates/FormPageTemplate";
import { DOCUMENT_TYPES } from "../../../config/documentTypes";

export default function CreateSuratKeluar() {
  return (
    <ProtectedRoute>
      <FormPageTemplate
        title={DOCUMENT_TYPES.SURAT_KELUAR.title}
        documentType="SURAT_KELUAR"
        fields={[{ name: "index", label: "Index", required: true }]}
      />
    </ProtectedRoute>
  );
}
