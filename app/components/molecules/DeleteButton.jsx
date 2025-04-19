"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

const DeleteButton = ({ userId, currentUserId, id, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (userId !== currentUserId) return;

    // Show confirmation toast
    const confirmation = await toast.info(
      <div>
        <p className="font-medium">Yakin menghapus data ini?</p>
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={() => toast.dismiss(confirmation)}
            className="px-3 py-1 bg-dark rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(confirmation);
              await performDelete();
            }}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        draggable: false,
        closeOnClick: false,
      }
    );

    return;
  };

  const performDelete = async () => {
    setIsDeleting(true);
    const toastId = toast.loading("Deleting record...");

    try {
      const response = await fetch(`/api/records/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete record");

      toast.update(toastId, {
        render: "Record deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      onDeleteSuccess?.();
    } catch (error) {
      console.error("Delete error:", error);
      toast.update(toastId, {
        render: "Failed to delete record",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      className={`bg-red-500 text-white p-1 rounded ml-2 ${
        isDeleting ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={userId !== currentUserId || isDeleting}
      onClick={handleDelete}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteButton;