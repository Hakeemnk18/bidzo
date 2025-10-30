import type { PopulatedAuctionWithImage } from "../../../../types/auction.type";
import { calculateTimeLeft } from "../../../../utils/dateFormat";

interface ProductCardProps {
  item: PopulatedAuctionWithImage;
}

// Format currency

const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
});

const getStatusClasses = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return 'bg-green-800 text-white';
      case 'running':
        return 'bg-yellow-500 text-gray-900'; 
      case 'ended':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-700 text-gray-200'; 
    }
  };




export const ProductCard = ({ item }: ProductCardProps ) => {
  
  
  const statusBadgeClasses = `
    absolute top-1 left-1 
    text-xs font-bold uppercase 
    px-3 py-1 
    rounded-full shadow-lg z-10
    ${getStatusClasses(item.status)} 
  `;
  return (
    <div className="relative bg-slate-800/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden text-white transform transition-all duration-300 hover:scale-105">
      {item.status && (
        <div className={statusBadgeClasses}>
          {item.status}
        </div>
      )}
      <img src={item.product.productImage} alt={item.product.name} className="w-full h-48 object-cover" />
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{item.product.name}</h3>
        
        <div className="flex justify-between text-sm text-gray-300 mb-4">
          <span>{item.bidCount} Bids</span>
          <span>{calculateTimeLeft(item.endAt)}</span>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
              <span className="block text-sm text-gray-400 mb-2">
              Starting: {formatter.format(item.basePrice)}
            </span>
            <span className="block text-xl font-bold text-cyan-400">
              {formatter.format(item.currentBid)}
            </span>
            {/* Here is the new line for the base price */}
          
          </div>
          
          <button className="bg-cyan-500 text-slate-900 font-bold py-2 px-5 rounded-lg transition-colors duration-300 hover:bg-cyan-400">
            Bid now
          </button>
        </div>
      </div>
    </div>
  );
};