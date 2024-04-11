import React, { useState, useRef, useEffect } from 'react';
import styles from './HeroSection.module.css';

import { motion } from "framer-motion";

const HeroSection = () => {
  const [eyeLocation, setEyeLocation] = useState({ x: 0, y: 0 });
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const eyeLeft = useRef();
  const eyeRight = useRef();
  const figure = useRef();

  useEffect(() => {
    if (figure.current) {
      const rectLeft = figure.current.getBoundingClientRect().left;
      const elWidth = figure.current.clientWidth / 2;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const x = rectLeft + scrollLeft + elWidth;

      const rectTop = eyeLeft.current.getBoundingClientRect().top;
      const y = rectTop;

      setEyeLocation({ x: x, y: y });
    }
  }, [])

  function calcAngle() {
    var rad = Math.atan2(mouseCoordinates.x - eyeLocation.x, mouseCoordinates.y - eyeLocation.y);
    var rot = -90 + (rad * (180 / Math.PI) * -1);
    return rot;
  }

  const handleMouseMove = (event) => {
    setMouseCoordinates({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleScroll = (to) => {
    const element = document.querySelector(`#${to}`);
    element && element.scrollIntoView({
      behavior: 'smooth'
    });
  }

  return (
    <div className={styles.outer} id="hero">
      <motion.div
        variants={{
          "initial": {
            y: -30,
            opacity: 0,
          },
          "final": {
            y: 0,
            opacity: 1,
            amount: 0.5
          }
        }}
        initial="initial"
        whileInView="final"
        transition={{ duration: 0.6, ease: 'backInOut', }}
        className={styles.details}>
        <div className={styles.detail}>
          <div className={styles.heading}>Looking through <br /> Your Lens</div>
          <div className={styles.brief}>I am visual storyteller aiming to tell the story of your brand in a unique way</div>
        </div>
        <button className={styles.btn} onClick={() => handleScroll('work')}>Work</button>
      </motion.div>
      <div className={styles.image}>
        <div className={styles.figure_container}>
          <img className={styles.figure} src="./img.JPG" alt="image" ref={figure} />

          <img src="./dot.png" alt="eyeball" className={`${styles.left} ${styles.eye}`} ref={eyeLeft}
            style={{ transform: `rotate(${calcAngle()}deg)`, }}
          />

          <img src="./dot.png" alt="eyeball" className={`${styles.right} ${styles.eye}`} ref={eyeRight}
            style={{ transform: `rotate(${calcAngle()}deg)`, }}
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection;