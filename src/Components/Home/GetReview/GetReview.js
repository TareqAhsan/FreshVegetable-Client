import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import axios from "axios";
const GetReview = () => {
  SwiperCore.use([Pagination, Autoplay]);
  const [allReview, setAllReview] = useState();
  const [success, setSuccess] = useState(true);
  useEffect(() => {
    axios("https://morning-oasis-89625.herokuapp.com/getreview").then(
      (result) => {
        setAllReview(result.data);
        setSuccess(false);
      }
    );
  }, [allReview]);
  return (
    <div style={{ background: "aliceblue", height: "100%" }}>
      <Container className="my-4 p-3">
        <h1 className="display-6">Our valuable Customers Review</h1>
        <div
          className="shadow py-4 my-4"
          style={{ background: "white", borderRadius: "14px" }}
        >
          {success ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Swiper
              loop={true}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 2,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              spaceBetween={10}
            >
              {allReview?.map((singleReview) => (
                <SwiperSlide key={singleReview._id}>
                  <div
                    className="card h-100 shadow-lg border-0 m-4"
                    style={{ borderRadius: "13px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-danger">
                        {singleReview.name}
                      </h5>
                      <p className="card-text">
                        Feedback: {singleReview.feedback}
                      </p>
                      <p className="card-text">
                        <Rating
                          className="text-success"
                          initialRating={singleReview.rating}
                          fullSymbol="fas fa-star"
                          emptySymbol="far fa-star"
                        />
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </Container>
    </div>
  );
};

export default GetReview;
