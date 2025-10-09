import { useState } from "react";
import instance from "../../../../api/axios";
import { toast } from "react-toastify";

interface CategoryCreateModalProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  description: string;
  useCase: "create" | "edit";
}

interface ResGetToken {
  success: true;
  message: string;
  data: string;
}

const CategoryCreateModal = ({
  isOpen,
  onClose,
  categoryName,
  description,
  useCase,
  id,
}: CategoryCreateModalProps) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    categoryName: categoryName,
    description: description,
  });
  const [errors, setErrors] = useState<{
    categoryName?: string;
    description?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    console.log("inside handle submit");
    const newErrors: typeof errors = {};
    if (formData.categoryName.trim().length < 1) {
      newErrors.categoryName = "Category name is required";
    }
    if (formData.description.trim().length < 1) {
      newErrors.description = "Description is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setLoading(true);
      try {
        let res;
        if (useCase === "edit") {
          if (!id) {
            toast.error("Category ID is missing!");
            setLoading(false);
            return;
          }
          res = await instance.put<ResGetToken>(`/admin/category/${id}`, {
            categoryName: formData.categoryName,
            description: formData.description,
          });
        } else if (useCase === "create") {
          res = await instance.post<ResGetToken>("/admin/category", {
            categoryName: formData.categoryName,
            description: formData.description,
          });
        }

        setLoading(false);
        if (res?.data?.success) {
          toast(res?.data?.message);
          onClose();
        }
      } catch (error: any) {
        setLoading(false);
        if (error.response && error.response.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
        console.error("Error during API call:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl z-10">
            <svg
              className="animate-spin h-6 w-6 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        )}

        {/* 🔹 Added heading */}
        <h2 className="text-xl font-semibold text-center mb-5 text-gray-800">
          Create New Category
        </h2>

        <div className="mb-4">
          <input
            type="text"
            name="categoryName"
            onChange={handleChange}
            value={formData.categoryName}
            placeholder="Category Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
          />
          {errors.categoryName && (
            <p className="text-red-500 text-xs mt-1">{errors.categoryName}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="description"
            onChange={handleChange}
            value={formData.description}
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreateModal;
