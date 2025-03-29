import { testimonials } from "../constants";

const Testimonials = () => {
  return (
    <div className="relative mt-20 border-neutral-800 min-h-[800px]">
      <div className="flex flex-col items-center text-center mt-10 lg:mt-20">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          Loved By Our Users
        </h2>
        <p className="mt-10 text-lg text-centre text-neutral-500 max-w-4xl">
          See what out early users are saying about DIEM
        </p>
      </div>
      <div className="flex flex-wrap justify-center mt-10 lg:mt-20">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
            <div className="bg-neutral-000 rounded-lg p-6 shadow-lg text-md border border-neutral-400 font-normal  w-full h-full">
              <p>{testimonial.text}</p>
              <div className="flex mt-8 items-start">
                <img
                  className="w-12 h-12 mr-6 rounded-full border border-neutral-300"
                  src={testimonial.image}
                  alt=""
                />
                <div>
                  <h6>{testimonial.user}</h6>
                  <span className="text-sm font-normal italic text-neutral-600">
                    {testimonial.Participant}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
