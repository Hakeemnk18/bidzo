import { Link } from "react-router-dom";

const HeroSection = () => {

  
  return (
    <section className="w-full px-4 md:px-10 py-16 flex flex-col-reverse md:flex-row justify-between items-center text-white gap-8">
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Win the best bids, <br />
          anytime, anywhere.
        </h1>
        <p className="text-lg mb-6">
          Join live auctions, track prices as they change, get instant alerts
          when bids heat up, and never miss a winning deal!
        </p>
        <Link to={'/seller/login'}>
          <button className="bg-[#6bc3c1] text-white px-6 py-2 rounded hover:bg-[#5bb2b0] transition">
          Become a seller
        </button>
        </Link>
        
      </div>

      <div>
        
        <img
          src="/images/Gemini_Generated_Image_dt7yu2dt7yu2dt7y-removebg-preview.png"
          alt="Auction Illustration"
          className="max-w-md w-full"
        />
      </div>
    </section>
  );
};

export default HeroSection;
