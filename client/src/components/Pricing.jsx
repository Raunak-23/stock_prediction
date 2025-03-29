import { CheckCircle2 } from "lucide-react";
import { pricingOptions } from "../constants";

const Pricing = () => {
  return (
    <div className="mt-1">
      <h5 className="text-xl sm:text-2xl lg:text-4xl text-center my-8 tracking-wide font-bold">
        Pricing Plans
      </h5>
      <div className="relative flex flex-wrap justify-center gap-6">
        {pricingOptions.map((option, index) => (
          <div
            key={index}
            className={`relative w-full sm:w-1/2 lg:w-1/4 p-4 bg-white rounded-xl shadow-lg ${
              option.title === "Pro Plan" ? "border-2 border-blue-500 z-10 -mt-6" : "border-gray-200 z-0"
            }${
              index === 0
                ? "lg:-mr-12"
                : index === 2
                ? "lg:-ml-12" 
                : ""
            }`}
          >
            <div className="p-6 flex flex-col items-center text-center">
              <p className="text-2xl font-bold mb-4">{option.title}</p>
              <p className="text-lg font-normal mb-6">
                {option.price}
                {option.title === "Pro Plan" && (
                  <span className="block text-sm text-blue-500 mt-1">
                    (Most Popular)
                  </span>
                )}
              </p>
              <ul className="mb-6">
                {option.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-md text-neutral-700 mb-4 italic text-left"
                  >
                    <CheckCircle2 className="text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`inline-flex justify-center items-center text-center w-full h-12 px-6 rounded-full border-2 font-normal ${
                  option.title === "Pro Plan"
                    ? "bg-blue-600 text-white hover:bg-blue-100"
                    : "border-blue-600 text-black bg-white hover:bg-blue-100"
                }`}
              >
                {option.title === "Pro Plan"
                  ? "Continue"
                  : option.title === "Enterprise Plan"
                  ? "Contact Us"
                  : "Select"}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
