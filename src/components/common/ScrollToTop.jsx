import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // current URL path milta hai

  useEffect(() => {
    window.scrollTo(0, 0); // whenever pathname changes
  }, [pathname]);

  return null;
};

export default ScrollToTop;
