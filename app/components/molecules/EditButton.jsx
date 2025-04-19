import Link from "next/link";
import React from "react";

const EditButton = ({ id, userId, currentUserId, documentType }) => {
  const documentTypeLower = documentType.toLowerCase().replace("_", "");

  return (
    <>
      <Link href={`/dashboard/${documentTypeLower}/edit/${id}`}>
        <button
          className="bg-blue-500 text-white p-1 rounded"
          disabled={userId !== currentUserId}
        >
          Edit
        </button>
      </Link>
    </>
  );
};

export default EditButton;
