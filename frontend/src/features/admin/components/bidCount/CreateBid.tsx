import { useState } from "react";
import type { IBidCount } from "../../../../types/bid.type";
import { useBidCount } from "../../../../hooks/useBidCount";
import { showErrorToast } from "../../../../utils/showErrorToast";
import { validateBidPack } from "../../../../utils/validBidPack";
import { useCreateBidCount } from "../../../../hooks/useCreateBidCount";

export interface IBidCountFormData {
  bidCount: number;
  amount: number;
}

interface BidCountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BidCountModal = ({ isOpen, onClose }: BidCountModalProps) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<IBidCountFormData>({
    bidCount: 0,
    amount: 0,
  });
  const [errors, setErrors] = useState<{ amount?: string; bidCount?: string }>({
    amount: "",
    bidCount: "",
  });
  const { data: bidCounts, isLoading, isError, error } = useBidCount();
  const { mutateAsync } = useCreateBidCount()

  if (isError) {
    showErrorToast(error);
    return <></>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onSubmit = async () => {
    const bidCount = Number(formData.bidCount);
    const amount = Number(formData.amount);
    const newError: typeof errors = {};
    let validInput = true;
    if (bidCount < 1) {
      newError.bidCount = "bid count should be grater than 0";
      validInput = false;
    }
    if (amount < 1) {
      newError.amount = "amount should be grater than 0";
      validInput = false;
    }
    console.log("is valid input ",validInput)
    if (validInput) {
      console.log("inside valid input")
      const { isValid, reason } = validateBidPack(bidCounts!, formData);
      if (!isValid) {
        newError.amount = reason;
      }
    }

    if (Object.keys(newError).length > 0) {
      setErrors(newError);
    }else{
      await mutateAsync(formData)
      onClose()
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Add Bid Count
        </h2>

        {/* Bid Count Field */}
        <div className="mb-4">
          <label
            htmlFor="bidCount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bid Count
          </label>
          <input
            type="number"
            id="bidCount"
            name="bidCount"
            value={formData.bidCount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Enter bid count"
          />
          {errors.bidCount && (
            <p className="text-red-500 mt-1">{errors.bidCount}</p>
          )}
        </div>

        {/* Amount Field */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              ₹
            </span>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-7 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="0"
            />
          </div>
          {errors.amount && (
            <p className="text-red-500 mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onSubmit}
            type="button"
            className="px-4 py-2 rounded-md bg-cyan-500 text-slate-900 font-bold hover:bg-cyan-400"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidCountModal;
