import { useEffect, useRef } from "react";
import "./App.css";
import Hero from "./Hero";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

function App() {
  const sun = useRef(null);
  const infoSection = useRef(null);
  const section2 = useRef(null);

  const timeOfDay = useRef(null);
  const darkTransition = useRef(null);

  const animationFrame = useRef(null);
  const animationText1 = useRef(null);
  const animationText2 = useRef(null);
  const animationText3 = useRef(null);
  const animationText4 = useRef(null);

  const quote = useRef(null);

  const lenis = useLenis(({ scroll }) => {
    // console.log(scroll);
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: infoSection.current,
        start: "-1 top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    tl.set(sun.current, {
      width: "100vw",
      height: "100vw",
      translateY: "85vh",
      borderRadius: "50%",
      backgroundColor: "#F9C516",
      filter: "blur(100px)",
    });

    tl.to(sun.current, {
      width: "75px",
      height: "75px",
      translateY: "-50%",
      borderRadius: "50%",
      filter: "blur(0px)",
    });

    const darkTl = gsap.timeline({
      scrollTrigger: {
        trigger: darkTransition.current,
        start: "top center",
        end: "center center",
        scrub: true,
      },

      ease: "none",
    });

    darkTl.set(timeOfDay.current.children, {
      backgroundColor: "#F5F5F5",
      color: "#212121",
    });

    darkTl.to([timeOfDay.current.children, sun.current], {
      backgroundColor: "#212121",
      color: "#f5f5f5",
    });

    const animationTl = gsap.timeline({
      scrollTrigger: {
        trigger: animationFrame.current,
        start: "top top",
        end: "+=" + window.innerHeight * 5,
        scrub: true,

        pin: true,
      },
    });

    gsap.set(animationFrame.current.children[0].children[0], {
      display: "block",
    });

    for (let i = 0; i < 142; i++) {
      animationTl.to(animationFrame.current.children[0].children[i], {
        display: "block",
        duration: 0.2, // Adjust the duration as needed
      });

      if (i !== 141) {
        animationTl.to(
          animationFrame.current.children[0].children[i],
          {
            display: "none",
            duration: 0.2, // Adjust the duration as needed
          },
          `+=0.1`
        ); // Adjust the delay as needed
      }
    }

    const animationTextTl = gsap.timeline({
      scrollTrigger: {
        trigger: animationFrame.current,
        start: "top top",
        end: "+=" + window.innerHeight * 5,
        scrub: true,
      },
    });

    animationTextTl

      .to(animationText1.current, {
        opacity: 0,
        duration: 0.5,
      })
      .to(animationText2.current, {
        opacity: 1,
        duration: 0.5,
      })
      .to(animationText2.current, {
        opacity: 0,
        duration: 0.5,
      })
      .to(animationText3.current, {
        opacity: 1,
        duration: 0.5,
      })
      .to(animationText3.current, {
        opacity: 0,
        duration: 0.5,
      })
      .to(animationText4.current, {
        opacity: 1,
        duration: 0.5,
      });

    animationTl.add(animationTextTl);

    const text = new SplitType(quote.current.children[0], {
      types: "chars, lines",
      linesClass: "line",
    });

    const textReadTl = gsap.timeline({
      scrollTrigger: {
        trigger: quote.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    textReadTl.from(text.chars, {
      opacity: 0.2,
      stagger: 0.2,
    });

    return () => {
      tl.kill();
      darkTl.kill();
      animationTl.kill();
      animationTextTl.kill();

      textReadTl.kill();

      ScrollTrigger.clearMatchMedia();
    };
  }, []);

  return (
    <ReactLenis root>
      <div
        className="w-screen overflow-x-hidden relative"
        style={{
          backgroundColor: "black",
        }}
      >
        <div className="flex flex-row justify-between items-center absolute w-screen px-7 pt-8 top-0 z-10">
          <div
            className="w-[100px] h-[18px] z-10"
            style={{
              backgroundImage: `url("assets/logo.png")`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className={`flex text-[15px] bg-white bg-opacity-15 rounded-lg px-3 py-[8px] text-white text-nowrap justify-center align-center`}
          >
            Order now
          </div>
        </div>
        <Hero />
        {/* <div className="bg-black flex justify-center items-center h-screen w-screen p-0 m-0">
          you should not be here (lmk if you see this)
        </div> */}

        <div
          className="w-screen h-screen overflow-x-hidden bg-[#F5F5F5] relative"
          ref={infoSection}
        >
          <div className="w-full h-full flex flex-col justify-center items-center gap-0">
            <div className="text-[#18181A]  text-[130px] font-semibold  flex flex-row items-center gap-6 z-10">
              Light{" "}
              <div
                style={{
                  backgroundImage: `url(assets/heavn_0414.avif)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-[192px] h-[112px] rounded-[28px]"
              />
              that
            </div>
            <div className="  text-[130px] font-semibold -mt-12 z-10">
              feels like sun.
            </div>

            <p className="text-[#18181A] text-[18px] font-normal w-[50%] text-center leading-6 z-10">
              As the first hybrid of desk and daylight luminaire, <br />
              HEAVN One delivers ideal light at any time of day and <br />
              enhances your well-being and performance.
            </p>
          </div>
          <div
            className="w-[75px] h-[75px] absolute bottom-[10px] left-[50%] translate-x-[-50%] bg-[#F9C516] z-0 rounded-full blur-[0px]"
            ref={sun}
          />
        </div>

        <div className="w-screen bg-[#F0F0F0]" ref={section2}>
          <div className=" flex flex-row justify-between border-b-[1px] border-[#d4d4d4] py-16">
            <div className="flex flex-row justify-left text-[#18181A] text-[24px] font-medium w-full mx-32">
              Automatic light adjustment.
            </div>
            <div className="flex flex-row items-left text-[#4a4a4a] text-[48px] font-semibold w-full mx-64 leading-[50px] ">
              Your working day
              <br />
              with HEAVN One
            </div>
          </div>

          <div
            className="flex flex-col w-screen items-center divide-y-[1px] divide-[#d4d4d4]"
            ref={timeOfDay}
          >
            <div className="flex flex-row justify-between w-screen">
              <div
                style={{
                  backgroundImage: "url(assets/heavn_0156.avif)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-[50vh]"
              />
              <div className="flex flex-col justify-start items-start pl-[20vw] pt-16 w-full">
                <div className="flex flex-col w-1/2 gap-4">
                  <h1 className=" text-[36px] font-medium w-full leading-[45px]">
                    The energy boost <br />
                    in the morning.
                  </h1>
                  <p className=" text-[16px] font-normal text-wrap">
                    The full-spectrum daylight lamp that can be switched on at
                    the front is a real wake-up call. With an effect of up to
                    10,000 lux, you reactivate your bodily functions for more
                    vitality, wakefulness and concentration.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between w-screen">
              <div
                style={{
                  backgroundImage: "url(assets/heavn_0712.avif)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-[50vh]"
              />
              <div className="flex flex-col justify-start items-start pl-[20vw] pt-16 w-full">
                <div className="flex flex-col w-1/2 gap-4">
                  <h1 className=" text-[36px] font-medium w-full leading-[45px]">
                    Full light. Full focus.
                  </h1>
                  <p className=" text-[16px] font-normal text-wrap">
                    The downward desk illumination provides wide-area
                    illumination with linear, shadow-free light. For effortless
                    work with documents or on the monitor.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between w-screen">
              <div
                style={{
                  backgroundImage: "url(assets/heavn_2595.webp)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-[50vh]"
              />
              <div className="flex flex-col justify-start items-start pl-[20vw] pt-16 w-full">
                <div className="flex flex-col w-1/2 gap-4">
                  <h1 className=" text-[36px] font-medium w-full leading-[45px]">
                    Sets the scene perfectly.
                  </h1>
                  <p className=" text-[16px] font-normal text-wrap">
                    The switchable, frontal light function acts like a soft box
                    and creates a natural brightening of area around the face.
                    For a perfect appearance in video conferences!
                  </p>
                </div>
              </div>
            </div>

            <div
              className="flex flex-row justify-between w-screen"
              ref={darkTransition}
            >
              <div
                style={{
                  backgroundImage: "url(assets/heavn_2364.webp)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-[50vh]"
              />
              <div className="flex flex-col justify-start items-start pl-[20vw] pt-16 w-full">
                <div className="flex flex-col w-1/2 gap-4">
                  <h1 className=" text-[36px] font-medium w-full leading-[45px]">
                    Outside dark.
                    <br />
                    Inside atmospheric.
                  </h1>
                  <p className=" text-[16px] font-normal text-wrap">
                    The indirect light of HEAVN One creates an atmospheric
                    ambience and eliminates the cave feeling of typical desk
                    lamps.
                    <br />
                    <br />
                    The comfortable room illumination is easy on the eyes when
                    working on a monitor and enhances well-being and
                    concentration when it is already dark outside.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between w-screen">
              <div
                style={{
                  backgroundImage: "url(assets/heavn_2495.avif)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-[50vh]"
              />
              <div className="flex flex-col justify-start items-start pl-[20vw] pt-16 w-full">
                <div className="flex flex-col w-1/2 gap-4">
                  <h1 className=" text-[36px] font-medium w-full leading-[45px]">
                    Healthy sleep.
                    <br />
                    Ideal regeneration.
                  </h1>
                  <p className=" text-[16px] font-normal text-wrap">
                    In the evening, the light from HEAVN One becomes warmer and
                    stimulates the production of the sleep hormone melatonin in
                    your body.
                    <br />
                    <br />
                    The result is healthy sleep - the best foundation for
                    sustainable performance at work.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center w-screen bg-black">
            <div className="text-[#f5f5f5] text-[48px] font-semibold text-center mt-32 leading-[55px] w-full">
              Revolutionize{" "}
              <span className="text-[#999999]">
                your
                <br />
                working day
              </span>
            </div>

            <div
              className="flex flex-col justify-center items-center h-screen w-screen relative"
              ref={animationFrame}
            >
              <div className="w-screen h-screen bg-black">
                {" "}
                {[...Array(142)].map((_, i) => (
                  <img
                    src={`assets/animation/${i + 1}.jpeg`}
                    alt=""
                    key={i + 1}
                    className="w-screen h-screen"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "none",
                    }}
                  />
                ))}
              </div>

              <div
                className="flex flex-col items-center justify-center w-auto h-[200px] absolute bottom-32 right-64 opacity-100"
                ref={animationText1}
              >
                <p className="text-[#f5f5f5] text-[18px] font-normal text-left w-full">
                  Elegant design.
                </p>
                <p className="text-[#999999] text-[18px] font-normal text-left w-full">
                  For tasteful offices.
                </p>
              </div>

              <div
                className="flex flex-col items-center justify-center w-auto h-[200px] absolute bottom-32 left-64 opacity-0"
                ref={animationText2}
              >
                <p className="text-[#f5f5f5] text-[18px] font-normal text-left w-full">
                  3 lights become HEAVN One.
                </p>
                <p className="text-[#999999] text-[18px] font-normal text-left w-full">
                  Desk lamp. Ceiling spotlight. Daylight.
                </p>
              </div>

              <div
                className="flex flex-col items-center justify-center w-auto h-[200px] absolute bottom-32 right-64 opacity-0"
                ref={animationText3}
              >
                <p className="text-[#f5f5f5] text-[18px] font-normal text-left w-full">
                  Intuitive control.
                </p>
                <p className="text-[#999999] text-[18px] font-normal text-left w-full">
                  Also by app.
                </p>
              </div>

              <div
                className="flex flex-col items-center justify-center w-auto h-[200px] absolute bottom-32 left-64 opacity-0"
                ref={animationText4}
              >
                <p className="text-[#f5f5f5] text-[18px] font-normal text-left w-full">
                  Always a full smartphone battery.
                </p>
                <p className="text-[#999999] text-[18px] font-normal text-left w-full">
                  With wireless charging.
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-center w-full gap-4 bg-[#f5f5f5] mt-[500vh]">
              <div className="flex flex-col items-center justify-center w-[50%] py-16">
                <div className="text-[#18181A] text-[24px] font-medium">
                  30 days risk-free trial.
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex flex-col justify-center w-3/4 py-16 gap-4">
                  <div className="text-[#18181A] text-[48px] font-semibold">
                    Get your HEAVN One now.
                  </div>
                  <div className="text-[#18181A] text-[16px] font-normal w-3/4">
                    Order HEAVN One in our online store and try it out without
                    any obligation. You can return the luminaire within 30 days
                    of ordering without giving a reason and receive a full
                    refund.
                  </div>

                  <div className="flex flex-col w-4/5">
                    <div className="flex flex-row justify-between py-4 border-t-[1px] border-[#d4d4d4]">
                      <div className="text-[#999999] text-[16px] font-normal">
                        Promise
                      </div>
                      <div className="text-[#999999] text-[16px] font-normal">
                        30-day money-back
                      </div>
                    </div>
                    <div className="flex flex-row justify-between py-4 border-t-[1px] border-[#d4d4d4]">
                      <div className="text-[#999999] text-[16px] font-normal">
                        Delivery
                      </div>
                      <div className="text-[#999999] text-[16px] font-normal">
                        3 to 4 days
                      </div>
                    </div>
                    <div className="flex flex-row justify-between py-4 border-y-[1px] border-[#d4d4d4]">
                      <div className="text-[#999999] text-[16px] font-normal">
                        Price
                      </div>
                      <div className="text-[#999999] text-[16px] font-normal">
                        €1290
                      </div>
                    </div>

                    <div
                      className={`flex text-[15px] bg-[#E4E4E4] rounded-lg px-3 py-[10px] text-[#18181A] text-nowrap justify-center align-center w-[110px] mt-5 cursor-pointer`}
                    >
                      Order now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-screen h-screen"
          style={{
            backgroundImage: `url(assets/heavn_0001.avif)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="w-screen px-32 py-16 bg-[#F5F5F5] text-[#18181A] flex flex-col items-center">
          <div
            className="text-[72px] font-semibold max-w-[1400px] leading-[80px]"
            ref={quote}
          >
            <h1>
              “I recommend anyone who wants to use their time effectively and
              increase their efficiency to test the HEAVN One.”
            </h1>
          </div>

          <p className="text-[36px] text-[#999999] font-medium w-full max-w-[1300px] mt-8 text-left">
            Frank Thelen, Investor
          </p>
        </div>

        <div className="flex flex-row items-center justify-center h-screen w-screen gap-4 bg-[#f5f5f5]">
          <div className="w-1/2 items-right justify-end flex">
            <div className="flex flex-col justify-center w-3/4 py-16 gap-4">
              <div className="text-[#18181A] text-[48px] font-semibold">
                Technical details.
              </div>
              <div className="text-[#18181A] text-[16px] font-normal w-3/4">
                HEAVN One was developed in close cooperation with leading sleep
                researchers and doctors. A well thought-out concept, which is
                also reflected in the technical data.
              </div>

              <div
                className={`flex text-[15px] bg-[#E4E4E4] rounded-lg px-3 py-[10px] text-[#18181A] text-nowrap justify-center align-center w-[166px] mt-5 cursor-pointer`}
              >
                Download catalog
              </div>
            </div>
          </div>
          <div className="w-1/2 items-right flex">
            <div className="flex flex-col justify-center items-right w-3/4 py-16 gap-4">
              <div className="flex flex-col w-4/5">
                <div className="flex flex-row justify-between items-center py-4 border-t-[1px] border-[#d4d4d4] cursor-pointer">
                  <div className="text-[#999999] text-[16px] font-normal">
                    Dimensions and weight
                  </div>
                  <div className="text-[#999999] text-[16px] font-normal mr-5 animate-rotateLeft hover:animate-rotateRight rotate-0 transition-transform ease-in-out">
                    +
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center py-4 border-t-[1px] border-[#d4d4d4] cursor-pointer">
                  <div className="text-[#999999] text-[16px] font-normal">
                    Light characteristics
                  </div>
                  <div className="text-[#999999] text-[16px] font-normal mr-5 animate-rotateLeft hover:animate-rotateRight rotate-0 transition-transform ease-in-out">
                    +
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center py-4 border-t-[1px] border-[#d4d4d4] cursor-pointer">
                  <div className="text-[#999999] text-[16px] font-normal">
                    Sensors and options
                  </div>
                  <div className="text-[#999999] text-[16px] font-normal mr-5 animate-rotateLeft hover:animate-rotateRight rotate-0 transition-transform ease-in-out">
                    +
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center py-4 border-t-[1px] border-[#d4d4d4] cursor-pointer">
                  <div className="text-[#999999] text-[16px] font-normal">
                    Phys. electrical properties
                  </div>
                  <div className="text-[#999999] text-[16px] font-normal mr-5 animate-rotateLeft hover:animate-rotateRight rotate-0 transition-transform ease-in-out">
                    +
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center py-4 border-t-[1px] border-[#d4d4d4] cursor-pointer">
                  <div className="text-[#999999] text-[16px] font-normal">
                    Planning data
                  </div>
                  <div className="text-[#999999] text-[16px] font-normal mr-5 animate-rotateLeft hover:animate-rotateRight rotate-0 transition-transform ease-in-out">
                    +
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center py-4 border-y-[1px] border-[#d4d4d4] cursor-pointer">
                  <div className="text-[#999999] text-[16px] font-normal">
                    More
                  </div>
                  <div className="text-[#999999] text-[16px] font-normal mr-5 animate-rotateLeft hover:animate-rotateRight rotate-0 transition-transform ease-in-out">
                    +
                  </div>
                </div>

                <div
                  className={`flex text-[15px] bg-[#E4E4E4] rounded-lg px-3 py-[10px] text-[#18181A] text-nowrap justify-center align-center w-[110px] mt-5 cursor-pointer`}
                >
                  Order now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;
