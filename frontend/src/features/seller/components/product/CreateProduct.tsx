import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../../api/axios";
import type { ApiResponse } from "../../../../types/user.types";
import { toast } from "react-toastify";
import { showErrorToast } from "../../../../utils/showErrorToast";
import type { IProductFormData } from "../../../../types/product.type";
import axios from "axios";
import type {
  IResCategory,
  IResCategoryNameDTO,
} from "../../../../types/category.type";


const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const MAX_IMAGE_SIZE = Number(import.meta.env.VITE_MAX_IMAGE_SIZE);
const ALLOWED_MIMES = import.meta.env.VITE_ALLOWED_MIMES.split(',');
const UPLOAD_PRESET = import.meta.env.VITE_IMAGE_UPLOAD_PRESET




interface IResCloudinaryURL {
    secure_url: string
}

const CreateProductForm = () => {
  const [formData, setFormData] = useState<IProductFormData>({
    name: "",
    description: "",
    category: "",
    productImage: "",
    document: null as File | null,
  });

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    category?: string;
    document?: string;
  }>({});
  const [categories, setCategories] = useState<
    { _id: string; categoryName: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await instance.get<IResCategoryNameDTO>(
        "/seller/category/name"
      );
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log("error in fetch plan name", error);
      showErrorToast(error);
    }
  };

  //fetch category names
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setErrors((prev) => ({ ...prev, document: "" }));
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        setErrors((prev) => ({
          ...prev,
          document: "Image size must be under 5MB.",
        }));
        return;
      }
      if (!ALLOWED_MIMES.includes(file.type)) {
        
        
        setErrors((prev) => ({
          ...prev,
          document: "Only JPEG, PNG, or WEBP images are allowed.",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, document: file }));
      setErrors((prev) => ({ ...prev, document: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    const { name, category, description, productImage, document } = formData;

    if (!name.trim()) newErrors.name = "Plan name is required";

    if (!name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (!category.trim()) {
      newErrors.category = "Category selection is required.";
    }

    if (!description.trim()) {
      newErrors.description = "Product description is required.";
    } else if (description.trim().length < 4) {
      newErrors.description =
        "Description must be at least 20 characters long.";
    }

    if (!document) {
      newErrors.document = "Product image is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      const file = formData.document as File;

      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("upload_preset", UPLOAD_PRESET);
      

      try {
        const uploadRes = await axios.post<IResCloudinaryURL>(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formDataUpload
        );
        const uploadedUrl = uploadRes.data.secure_url;
        formData.productImage = uploadedUrl;
        
      } catch (error) {
        toast.error("Failed to upload document to Cloudinary");
        console.log("Cloudinary upload error", error);
        return;
      }
      try {
        const res = await instance.post<ApiResponse>("/seller/product", {
          ...formData,
        });
        if (res.data.success) {
          toast("form submitted");
          navigate("/seller/product/management");
        }
      } catch (error: any) {
        console.log("error in plan submit form ", error);
        showErrorToast(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Left: Image */}
        <div className="md:w-1/2 bg-blue-100 p-4 flex justify-center items-center">
          <img
            src="/images/Gemini_Generated_Image_dt7yu2dt7yu2dt7y-removebg-preview.png"
            alt="Plan"
            className="max-w-full"
          />
        </div>

        {/* Right: Form */}
        <div className="md:w-1/2 p-8 w-full">
          <form className="p-4 w-full" onSubmit={handleSubmit}>
            <h2 className="text-center text-lg font-bold mb-4">
              Create Product
            </h2>

            {/* target */}
            <div className="w-full mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className={`w-full px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Plan Name */}
            <div className="w-full mb-4">
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className={`w-full px-4 py-2 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Yearly Amount */}
            <div className="w-full mb-4">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Plan category</option>
                {categories.map((item) => (
                  <option key={item._id} value={item._id}>{item.categoryName}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>

            {/* Monthly Amount */}
            <div className="w-full mb-4">
              <input
                type="file"
                name="document"
                onChange={handleFileChange}
                placeholder="Monthly Amount"
                className={`w-full px-4 py-2 border ${
                  errors.document ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.document && (
                <p className="text-red-500 text-xs mt-1">{errors.document}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductForm;
