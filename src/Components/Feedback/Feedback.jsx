import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { FaStar } from "react-icons/fa";

const Feedback = () => {
  const testimonials = [
    {
      name: "Rahim Uddin",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      quote:
        "This platform is amazing! I completed tasks and got paid instantly.",
      rating: 5,
    },
    {
      name: "Ayesha Khatun",
      photo: "https://randomuser.me/api/portraits/women/45.jpg",
      quote:
        "Super easy to use and very reliable. Perfect for earning in free time!",
      rating: 4,
    },
    {
      name: "Sajid Hasan",
      photo: "https://randomuser.me/api/portraits/men/67.jpg",
      quote:
        "Trusted platform. I’ve been using it for months and never faced issues.",
      rating: 5,
    },
    {
      name: "Mizanur Rahman",
      photo: "https://randomuser.me/api/portraits/men/12.jpg",
      quote:
        "I complete a few tasks daily and get paid easily. An amazing platform!",
      rating: 5,
    },
    {
      name: "Nusrat Jahan",
      photo: "https://randomuser.me/api/portraits/women/30.jpg",
      quote:
        "Very convenient for me. I can earn money in my free time from home.",
      rating: 4,
    },
    {
      name: "Tanvir Alam",
      photo: "https://randomuser.me/api/portraits/men/44.jpg",
      quote:
        "A trustworthy platform. I’ve received multiple payments on time without any issues.",
      rating: 5,
    },
    {
      name: "Sharmin Akter",
      photo: "https://randomuser.me/api/portraits/women/62.jpg",
      quote:
        "The platform is very user-friendly, and the tasks are simple to complete.",
      rating: 4,
    },
    {
      name: "Arif Hossain",
      photo: "https://randomuser.me/api/portraits/men/76.jpg",
      quote:
        "Great way to earn extra income. I can manage it even with my busy schedule.",
      rating: 5,
    },
    {
      name: "Riya Sultana",
      photo: "https://randomuser.me/api/portraits/women/85.jpg",
      quote:
        "Even as a new user, I quickly learned how to complete tasks and start earning. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 my-10">
      <h2 className="text-3xl font-bold text-center mb-12">
        What Our Users Say
      </h2>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[Pagination, Autoplay, EffectCoverflow]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide
            key={index}
            style={{ width: "300px" }} // Fixed width for Coverflow effect
          >
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
              <img
                src={item.photo}
                alt={item.name}
                className="w-20 h-20 rounded-full mb-4 object-cover mx-auto"
              />
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600 text-sm my-3">"{item.quote}"</p>
              <div className="flex justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < item.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Feedback;
