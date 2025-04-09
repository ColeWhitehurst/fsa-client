import React, { useState } from "react"; 
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
  {
    image: '/images/english.jpg',
    caption: "English Department",
    description: "FSU offers courses in literature, writing, and linguistics, encouraging students to develop strong analytical and communication skills."
  },
  {
    image: '/images/science2.jpg', 
    caption: "Science Department",
    description: "This department provides students with a comprehensive understanding of key concepts in biology, chemistry, and physics emphasizing both theoretical knowledge and hands-on laboratory experience."
  },
  {
    image: '/images/math.jpg', 
    caption: "Mathematics Department",
    description: "Wide range of courses, from foundational mathematics to advanced topics, focusing on problem-solving, critical thinking, and real-world applications."
  } 
];

function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {data.map((slide, i) => {
        return (
          <Carousel.Item key={i}>        
            <img
              className="d-block w-100"
              src={slide.image}
              alt="slider image"
            />
            <Carousel.Caption
              style={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                padding: '10px',
              }} >
              <h3>{slide.caption}</h3>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default HomeCarousel;
