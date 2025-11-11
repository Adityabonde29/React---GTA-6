import React , { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import 'remixicon/fonts/remixicon.css'

function App() {

  let [showContent, setShowContent] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power4.easeInOut",
      transformOrigin: "50% 50%",
    })
    .to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function(){
        if(this.progress() >= 0.9){
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      }
    })
  });

  useGSAP(() => {

    if(!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      delay: "-0.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      delay: "-0.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1,
      x: "-50%",
      rotate: 0,
      duration: 2,
      delay: "-0.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove" , function(e) {
      const xMove = (e.clientX/window.innerWidth - 0.5) * 40;

      gsap.to(".imagesdiv .text", {
        x: `-${xMove * 0.2}%`
      });

      gsap.to(".sky", {
        x:xMove
      });

      gsap.to(".bg", {
        x:xMove*1.7
      })
    });
  }, [showContent]);

  return (
    <>
    <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
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
      {showContent && 
        <div className='main w-full rotate-[-10deg] scale-[1.7]'>
          <div className='landing w-full h-screen bg-black'>
            <div className='navbar z-[10] w-full py-10 px-10 absolute top-0 left-0'>
              <div className='logo flex gap-7'>
                <div className='lines flex flex-col gap-[5px]'>
                <div className='line w-12 h-1.5 bg-white'></div>
                <div className='line w-8 h-1.5 bg-white'></div>
                <div className='line w-4 h-1.5 bg-white'></div>
                </div>
                <h3 className='text-3xl text-white -mt-[8px] leading-none'>Rockstar</h3>
              </div>
            </div>
            <div className='imagesdiv relative w-full h-screen overflow-hidden'>
              <img className='sky scale-[1.5] rotate-[-20deg] absolute top-0 left-0 w-full h-full object-cover' src="./sky.png" />
              <img className='bg scale-[1.8] rotate-[-3deg] absolute top-0 left-0 w-full h-full object-cover' src="./bg.png" />
              <div className='text text-white flex flex-col gap-6 absolute top-0 left-1/2 -translate-x-1/2'>
                <h1 className='text-9xl -ml-40'>grand</h1>
                <h1 className='text-9xl ml-50'>theft</h1>
                <h1 className='text-9xl -ml-20'>auto</h1>
              </div>
              <img className='character absolute -bottom-[50%] left-1/2 -translate-x-1/2 scale-[2] -rotate-[10deg]' src="./girlbg.png"/>
            </div>
            <div className='btmbar text-white w-full py-15 px-10 absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent'>
              <div className='flex gap-4 items-center'>
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className='text-2xl font-mono'>Scroll Down</h3>
              </div>
              <img className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[65px]' src="./ps5.png"/>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default App
