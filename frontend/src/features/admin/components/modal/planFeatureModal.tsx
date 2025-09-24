import type { IFeaturesOptions } from "../../../../types/plan,types";

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  features: IFeaturesOptions[] | []
}

const FeatureModal = ({ isOpen, onClose, features }: FeatureModalProps) => {

  if (!isOpen) return null;

  console.log(features)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <div className="bg-gradient-to-r from-[#161c3f] to-[#292b4d] rounded-xl shadow-lg p-6 w-full max-w-sm relative">
        <div className="absolute top-3 right-3">
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            X
          </button>
        </div>
        <div className="overflow-x-auto mt-10">
          <table className="w-full border-collapse border border-gray-500 text-sm text-left text-gray-200">
            <thead className="bg-[#1f2447] text-gray-100">
              <tr>
                <th className="border border-gray-500 px-4 py-2">Feature</th>
                <th className="border border-gray-500 px-4 py-2">Type</th>
                <th className="border border-gray-500 px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {
                features.map((item) => {
                  return (
                    <tr className="hover:bg-[#2e3157]">
                      <td className="border border-gray-500 px-4 py-2">{item.feature}</td>
                      <td className="border border-gray-500 px-4 py-2">{item.type}</td>
                      <td className="border border-gray-500 px-4 py-2">{item.value}</td>
                    </tr>
                  )
                })
              } 
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeatureModal;