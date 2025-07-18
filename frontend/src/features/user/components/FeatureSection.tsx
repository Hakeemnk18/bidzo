

const FeatureSection = () => {
  return (
    <section className="w-full px-6 md:px-10 pb-20 flex flex-col md:flex-row justify-center items-center gap-30 text-white">
      <div className="bg-[#2f2f66] p-6 rounded-lg shadow-md max-w-md text-center">
        <img
          src="/images/Gemini_Generated_Image_7zx3zt7zx3zt7zx3.png"
          alt="Real-time Bid"
          className="w-full mb-4"
        />
        <p className="text-lg font-semibold">Real-Time Bid</p>
      </div>

      <div className="bg-[#2f2f66] p-6 rounded-lg shadow-md max-w-md text-center">
        <img
          src="/images/Gemini_Generated_Image_7zx3zt7zx3zt7zx3.png"
          alt="Seller Dashboard"
          className="w-full mb-4"
        />
        <p className="text-lg font-semibold">Easy Seller Dashboard</p>
      </div>
    </section>
  );
};

export default FeatureSection;
