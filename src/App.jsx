import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import './index.css';

function App() {
  const [showContent, setShowContent] = useState(false);
  const mainRef = useRef(null);
  const characterRef = useRef(null);

  // --- INITIAL MASK ANIMATION ---
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power4.inOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "expo.inOut",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg")?.remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  // --- MAIN SCENE ANIMATION ---
  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: "expo.inOut",
    });

    gsap.to([".sky", ".bg"], {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      ease: "expo.inOut",
      stagger: 0.2,
    });

    gsap.to(".character", {
      scale: 1,
      xPercent: -50,
      rotate: 0,
      duration: 2,
      ease: "expo.inOut",
    });

    const main = mainRef.current;
    const handleMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;

      gsap.to(".imagesdiv .text", {
        x: `${xMove * 0.8}%`, // removed the minus sign
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(".sky", { x: xMove, duration: 0.3 });
      gsap.to(".bg", { x: xMove * 1.2, duration: 0.3 });
    };

    main?.addEventListener("mousemove", handleMove);
    return () => main?.removeEventListener("mousemove", handleMove);
  }, [showContent]);

  // --- RESPONSIVE SCALING FIX ---
  useEffect(() => {
    const handleResize = () => {
      if (!characterRef.current) return;
      const isMobile = window.innerWidth < 768;
      const newScale = isMobile ? 1.2 : window.innerWidth < 1200 ? 1.6 : 2;
      gsap.killTweensOf(characterRef.current);
      gsap.set(characterRef.current, { scale: newScale, force3D: true });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Loading Mask Animation */}
      <div className="svg fixed inset-0 z-[100] flex items-center justify-center w-full h-screen overflow-hidden bg-black">
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="clamp(80px, 20vw, 250px)"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black, sans-serif"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {/* Main Scene */}
      {showContent && (
        <div
          ref={mainRef}
          className="main w-full h-screen rotate-[-10deg] scale-[1.7] overflow-hidden"
        >
          <div className="landing relative w-full h-screen bg-black">
            {/* Navbar */}
            <div className="navbar z-10 w-full py-6 px-6 md:py-10 md:px-10 absolute top-0 left-0 flex items-center">
              <div className="logo flex gap-5 md:gap-7 items-center">
                <div className="lines flex flex-col gap-[4px] md:gap-[5px]">
                  <div className="line w-8 md:w-12 h-1.5 bg-white"></div>
                  <div className="line w-6 md:w-8 h-1.5 bg-white"></div>
                  <div className="line w-4 h-1.5 bg-white"></div>
                </div>
                <h3 className="text-2xl md:text-3xl text-white leading-none">
                  Rockstar
                </h3>
              </div>
            </div>

            {/* Image Stack */}
            <div className="imagesdiv relative w-full h-full overflow-hidden will-change-transform">
              <img
                className="sky absolute top-0 left-0 w-full h-full object-cover scale-[1.5] md:scale-[1.8] rotate-[-15deg]"
                src="./sky.png"
                alt="sky"
              />
              <img
                className="bg absolute top-0 left-0 w-full h-full object-cover scale-[1.8] rotate-[-3deg]"
                src="./bg.png"
                alt="background"
              />

              {/* Texts Styled Like GTA */}
              <div className="text text-white absolute top-[40%] md:top-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center select-none gap-10">
                <h1 className="font-black leading-none text-[clamp(2rem,9vw,9rem)] tracking-tight relative left-[-1rem] md:left-[-10rem] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
                  grand
                </h1>
                <h1 className="font-black leading-none text-[clamp(2rem,9vw,9rem)] tracking-tight relative left-[2rem] md:left-[10rem] -mt-[0.3em] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
                  theft
                </h1>
                <h1 className="font-black leading-none text-[clamp(2rem,9vw,9rem)] tracking-tight relative left-[-1rem] md:left-[-8rem] -mt-[0.3em] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
                  auto
                </h1>
              </div>

              {/* Character */}
              <img
                ref={characterRef}
                className="character absolute bottom-[-50%] left-1/2 -translate-x-1/2 scale-[1] -rotate-[10deg] will-change-transform"
                src="./girlbg.png"
                alt="character"
              />
            </div>

            {/* Bottom Bar */}
            <div className="btmbar text-white w-full py-10 px-6 md:px-10 absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-3 md:gap-4 items-center">
                <i className="text-3xl md:text-4xl ri-arrow-down-line"></i>
                <h3 className="text-lg md:text-2xl font-mono">Scroll Down</h3>
              </div>
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[45px] md:h-[65px]"
                src="./ps5.png"
                alt="ps5"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

