import { features } from "../constants";

const FeatureSection = () => {
  return (
    <div className="relative mt-20 border-neutral-800 min-h-[800px]">
      <div className="flex flex-col items-center text-center mt-10 lg:mt-20">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          Make Your Investments Smarter
        </h2>
        <p className="mt-10 text-lg text-centre text-neutral-500 max-w-4xl">
          Diem uses powerful AI with news sentiment analysis to help you go bullish
        </p>
      </div>
      <div className="flex flex-wrap mt-10 lg:mt-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 p-4 flex"
          >
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start w-full h-full">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 flex justify-center items-center bg-[#f0f8ff] text-[#acd6ff] rounded-full text-2xl font-bold">
                  {feature.icon}
                </div>
                <h5 className="text-xl font-semibold text-black">{feature.text}</h5>
              </div>
              <p className="mt-4 text-md text-neutral-500">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
