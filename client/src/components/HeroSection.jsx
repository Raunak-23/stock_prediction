import codeImage from "../assets/insights.png";

const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <div className="flex flex-col items-center px-5">
        <h3 className="text-3xl sm:text-5xl lg:text-7xl text-left tracking-wide">
          Predict Tomorrow's Market with
          <span className="bg-gradient-to-r from-green-200 to-green-900 text-transparent bg-clip-text">
            {" "}
            AI-Powered Insights
          </span>
        </h3>
        <p className="mt-10 text-lg text-left text-neutral-500 max-w-4xl">
          Stay ahead of the stock market using AI-driven forecasts and real-time news sentiment analysis. Gain smarter investment strategies with cutting-edge technology.
        </p>
        <div className="flex flex-col sm:flex-row items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4 w-full">
          <input
            type="email"
            placeholder="Enter your Email"
            className="px-4 py-2 border border-neutral-300 rounded-lg w-2/3"
          />
          <button
            className="px-6 py-2 rounded-lg w-1/3"
            style={{ backgroundColor: "#2e8eef", color: "white" }}
          >
            Get Started
          </button>
        </div>
      </div>
        <img
          src={codeImage}
          alt="Code"
          className="rounded-md w-2/4 h-80 border border-neutral-700 shadow-lg mx-2 my-4"
        />
    </div>
  );
};

export default HeroSection;
