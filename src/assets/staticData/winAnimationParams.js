import coin from "../images/coin.webp";
export default {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: ["#ffd700"],
    },
    shape: {
      type: "image",
      image: {
        src: coin,
        width: 50,
        height: 50,
      },
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false,
      },
    },
    size: {
      value: 30, // Starting size of particles
      random: true,
      anim: {
        enable: true,
        speed: 50,
        size_min: 0.1,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },

  retina_detect: true,
};
