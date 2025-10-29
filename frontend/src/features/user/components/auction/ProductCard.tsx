export interface AuctionItem {
  id: string;
  title: string;
  imageUrl: string; // Use a placeholder for now
  bids: number;
  timeLeft: string;
  currentPrice: number;
}



interface ProductCardProps {
  item: AuctionItem;
}

// Format currency
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export const ProductCard = ({ item }: ProductCardProps ) => {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden text-white transform transition-all duration-300 hover:scale-105">
      <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
        
        <div className="flex justify-between text-sm text-gray-300 mb-4">
          <span>{item.bids} Bids</span>
          <span>{item.timeLeft}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-cyan-400">
            {formatter.format(item.currentPrice)}
          </span>
          <button className="bg-cyan-500 text-slate-900 font-bold py-2 px-5 rounded-lg transition-colors duration-300 hover:bg-cyan-400">
            Bid now
          </button>
        </div>
      </div>
    </div>
  );
};