import React from 'react';
import DeptCarousel from './DeptCarousel';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold">Welcome to Fullstack University!</h1>
        <p className="lead text-white">
          Fullstack University is a dynamic center of learning, offering a wide range of programs designed to inspire innovation and critical thinking. Located in the heart of the big apple, the university combines academic excellence with hands-on experience, preparing students to lead and make a meaningful impact in their fields. With expert faculty and a vibrant campus community, FSU fosters growth, discovery, and global engagement.
        </p>
      </div>

      <div className="mb-5">
        <DeptCarousel />
      </div>
    </div>
  );
};

export default Home;