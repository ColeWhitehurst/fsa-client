import React from "react";
import DeptCarousel from "./DeptCarousel";

const Home = () => {
  return (
    <>
      <div>
        <h1>Welcome to Fullstack University</h1>
        <p>
          Fullstack University is a dynamic center of learning, offering a wide
          range of programs designed to inspire innovation and critical
          thinking. Located in the heart of the big apple, the university
          combines academic excellence with hands-on experience, preparing
          students to lead and make a meaningful impact in their fields. With
          expert faculty and a vibrant campus community, FSU fosters growth,
          discovery, and global engagement.
        </p>
        <div>
          <p>
            <DeptCarousel />
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
