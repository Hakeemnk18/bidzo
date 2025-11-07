import React from 'react';

// Interface for the structure of a bid pack
interface BidPack {
  id: number;
  bids: number;
  price: number;
  bestValue?: boolean;
}

// Your five bid pack options
const bidPacks: BidPack[] = [
  { id: 1, bids: 20, price: 200 },
  { id: 2, bids: 50, price: 450 },
  { id: 3, bids: 100, price: 850},
  { id: 4, bids: 250, price: 2000 },
  { id: 5, bids: 500, price: 3800 },
];

const BuyCredits: React.FC = () => {
  return (
    <div className="py-16 px-4 mt-20">
      {/* Main container card, centered and styled like your theme */}
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/20 backdrop-blur-md rounded-xl shadow-lg">
        <div className="p-6 md:p-10">
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center mb-8">
            Buy Bid Credits
          </h1>
          <p className="text-gray-300 text-center mb-10">
            Purchase credits to participate in our live auctions. More credits mean more chances to win!
          </p>

          {/* Container for the list of credit packs */}
          <div className="flex flex-col gap-5">
            {bidPacks.map((pack) => (
              <div
                key={pack.id}
                className="relative bg-white/10 p-5 rounded-lg border border-white/20 transition-all hover:bg-white/20"
              >
                {/* Best Value Badge - matches your "RUNNING" badge style */}
                {pack.bestValue && (
                  <span className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded">
                    BEST VALUE
                  </span>
                )}

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-5 md:pt-0">
                  {/* Pack Details */}
                  <div className="text-center md:text-left">
                    <h2 className="text-white text-2xl font-semibold">{pack.bids} Bids</h2>
                    <p className="text-gray-300">Valued at ₹{pack.price}</p>
                  </div>

                  {/* Price and Button */}
                  <div className="flex flex-col md:flex-row items-center gap-5 w-full md:w-auto">
                    <span className="text-cyan-400 text-3xl font-bold">
                      ₹{pack.price}
                    </span>
                    <button className="w-full md:w-auto bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-600 transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCredits;