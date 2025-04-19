"use client";

import FormPageTemplate from "../../../components/templates/FormPageTemplate";
import { DOCUMENT_TYPES } from "../../../config/documentTypes";
import ProtectedRoute from "../../../components/ProtectedRoute";
export default function CreateSuratMasuk() {
  return (
    <ProtectedRoute>
      <FormPageTemplate
        title={DOCUMENT_TYPES.SURAT_MASUK.title}
        documentType="SURAT_MASUK"
        fields={[{ name: "index", label: "Index", required: true }]}
      />
    </ProtectedRoute>
  );
}
