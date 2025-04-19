"use client";

import ProtectedRoute from "../../../../components/ProtectedRoute";
import FormPageTemplate from "../../../../components/templates/FormPageTemplate";
import { DOCUMENT_TYPES } from "../../../../config/documentTypes";

export default function EditBeritaAcara({ params }) {
  return (
    <ProtectedRoute>
      <FormPageTemplate
        title={DOCUMENT_TYPES.BERITA_ACARA.title}
        documentType="BERITA_ACARA"
        recordId={params.id}
        headerType={"back"}
      />
    </ProtectedRoute>
  );
}
