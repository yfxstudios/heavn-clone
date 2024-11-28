import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/src/locomotive-scroll.scss";



const useLocomotiveScroll = ({
  ref,
  ...otherProps
}) => {
  const locomotiveScrollRef = useRef(null);

  useEffect(() => {
    if (ref.current) {
      locomotiveScrollRef.current = new LocomotiveScroll({
        ...otherProps,
        el: ref.current,
      });
    }
    return () => {
      locomotiveScrollRef.current.destroy();
    };
  }, [ref]);
  return [locomotiveScrollRef];
};
export default useLocomotiveScroll;
