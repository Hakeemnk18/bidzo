import { useEffect, useState } from "react";

import { data, useNavigate, useSearchParams } from "react-router-dom";
import instance from "../../../../api/axios";
import type { ApiResponse } from "../../../../types/user.types";
import { toast } from "react-toastify";
import { showErrorToast } from "../../../../utils/showErrorToast";
import type {
  IAuctionFormData,
  IResProductNameDTO,
} from "../../../../types/auction.type";

const CreateAuctionForm = () => {

  const [formData, setFormData] = useState<IAuctionFormData>({
    product: "",
    basePrice: "",
    reservePrice: "",
    startAt: new Date(),
    endAt: new Date(),
    auctionType: "NORMAL",
  });

  // --- MODIFIED: Errors state to match new fields ---
  const [errors, setErrors] = useState<{
    product?: string;
    basePrice?: string;
    reservePrice?: string;
    startAt?: string;
    endAt?: string;
  }>({});

  const [products, setProducts] = useState<
    { id: string; productName: string }[]
  >([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await instance.get<IResProductNameDTO>(
        "/seller/auction/allProducts"
      );
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.log("error in fetch product name", error);
      showErrorToast(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    const { product, basePrice, reservePrice, startAt, endAt } = formData;
    const today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1);

    if (!product.trim()) {
      newErrors.product = "Product selection is required.";
    }
    if (!basePrice.trim()) {
      newErrors.basePrice = "Base price is required.";
    } else if (isNaN(Number(basePrice)) || Number(basePrice) <= 0) {
      newErrors.basePrice = "Base price must be a positive number.";
    }
    if (!reservePrice.trim()) {
      newErrors.reservePrice = "Reserve price is required.";
    } else if (isNaN(Number(reservePrice)) || Number(reservePrice) <= 0) {
      newErrors.reservePrice = "Reserve price must be a positive number.";
    }
    if (!startAt || isNaN(new Date(startAt).getTime())) {
      newErrors.startAt = "Start date is required.";
    }
    if(new Date(startAt) < new Date(tomorrow)){
      newErrors.startAt = "Start date must be tomorrow or later";
    }
    if (!endAt || isNaN(new Date(endAt).getTime())) {
      newErrors.endAt = "Start date is required.";
    }
    if (new Date(endAt) <= new Date(startAt)) {
      newErrors.endAt = "End date must be after the start date.";
    }

    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors)
      setErrors(newErrors);
      return;
    } else {
      try {
        const res = await instance.post<ApiResponse>("/seller/auction", {
          ...formData,
        });
        console.log("form submitted")
        if (res.data.success) {
          toast("Auction created successfully!");
          navigate("/seller/auction/management");
        }
      } catch (error: any) {
        console.log("error in auction submit form ", error);
        showErrorToast(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        <div className="md:w-1/2 bg-blue-100 p-4 flex justify-center items-center">
          <img
            src="/images/Gemini_Generated_Image_dt7yu2dt7yu2dt7y-removebg-preview.png"
            alt="Auction"
            className="max-w-full"
          />
        </div>

        <div className="md:w-1/2 p-8 w-full">
          <form className="p-4 w-full" onSubmit={handleSubmit}>
            <h2 className="text-center text-lg font-bold mb-4">
              Create Auction
            </h2>

            {/* --- MODIFIED: Form fields --- */}

            {/* Product Select */}
            <div className="w-full mb-4">
              <select
                name="product"
                value={formData.product}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.product ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select a Product</option>
                {products.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.productName}
                  </option>
                ))}
              </select>
              {errors.product && (
                <p className="text-red-500 text-xs mt-1">{errors.product}</p>
              )}
            </div>

            {/* Base Price */}
            <div className="w-full mb-4">
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                placeholder="Base Price (₹)"
                className={`w-full px-4 py-2 border ${
                  errors.basePrice ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.basePrice && (
                <p className="text-red-500 text-xs mt-1">{errors.basePrice}</p>
              )}
            </div>

            {/* Reserve Price */}
            <div className="w-full mb-4">
              <input
                type="number"
                name="reservePrice"
                value={formData.reservePrice}
                onChange={handleChange}
                placeholder="Reserve Price (₹)"
                className={`w-full px-4 py-2 border ${
                  errors.reservePrice ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.reservePrice && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.reservePrice}
                </p>
              )}
            </div>

            {/* Start At */}
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="datetime-local"
                name="startAt"
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.startAt ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.startAt && (
                <p className="text-red-500 text-xs mt-1">{errors.startAt}</p>
              )}
            </div>

            {/* End At */}
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="datetime-local"
                name="endAt"
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.endAt ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.endAt && (
                <p className="text-red-500 text-xs mt-1">{errors.endAt}</p>
              )}
            </div>

            {/* Auction Type */}
            <div className="w-full mb-4">
              <select
                hidden={true}
                name="auctionType"
                value={formData.auctionType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="NORMAL">Normal Auction</option>
                <option value="LIVE">Live Auction</option>
              </select>
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

export default CreateAuctionForm;
