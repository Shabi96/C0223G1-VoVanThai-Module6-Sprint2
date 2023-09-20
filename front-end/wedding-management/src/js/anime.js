import React, { useEffect } from 'react';
import anime from 'animejs';
import Error404 from '../components/404';

function Anime404() {
  useEffect(() => {
    anime({
      targets: '.row svg',
      translateY: 10,
      autoplay: true,
      loop: true,
      easing: 'easeInOutSine',
      direction: 'alternate'
    });

    anime({
      targets: '#zero',
      translateX: 10,
      autoplay: true,
      loop: true,
      easing: 'easeInOutSine',
      direction: 'alternate',
      scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
      rotateY: {value: '+=180', delay: 200},
    });
  }, []);

  return (
    <div>
      <Error404 />
    </div>
  );
}

export default Anime404;
