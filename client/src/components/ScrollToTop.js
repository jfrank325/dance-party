import React, { useState } from 'react';
import Arrow from '../images/UpArrowLightBlue.png';

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 600) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 600) {
      setShowScroll(false);
    }
  };
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  window.addEventListener('scroll', checkScrollTop);
  return (
    <div className="scroll-container" onClick={scrollTop} style={{ display: showScroll ? 'flex' : 'none' }}>
      <img src={Arrow} alt="Scroll To Top" />
    </div>
  );
};

export default ScrollToTop;
