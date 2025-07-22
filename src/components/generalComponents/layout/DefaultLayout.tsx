import { PropsWithChildren, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import App from "../../../App";
import { RootState } from "@/store";
import { toggleSidebar } from "@/store/themeConfigSlice";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import Portals from '../Portals';
import { ReactComponent as TopIcon } from "@/assets/icons/topBtn.svg";
import Lottie from "lottie-react";
import LoadingJson from "@/assets/icons/animated/loading.json";
import useWindowWidth from "@/utils/hooks/useWindowWidth";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  const themeConfig = useSelector((state: RootState) => state.themeConfig);
  const dispatch = useDispatch();

  const [showLoader, setShowLoader] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);

  const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const onScrollHandler = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };
  const windowWidth = useWindowWidth();

  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);

    const screenLoader = document.getElementsByClassName("screen_loader");
    if (screenLoader?.length) {
      screenLoader[0].classList.add("animate__fadeOut");
      setTimeout(() => {
        setShowLoader(false);
      }, 400);
    }

    return () => {
      window.removeEventListener("onscroll", onScrollHandler);
    };
  }, []);

  return (
    <App>
      {/* BEGIN MAIN CONTAINER */}
      <div className="relative">
        {/* sidebar menu overlay */}

        {/* screen loader */}
        {showLoader && (
          <div className="screen_loader bg-dark fixed inset-0 z-[60] grid place-content-center animate__animated">
            <Lottie
              className="size-80 mx-auto"
              animationData={LoadingJson}
              loop={true}
            />
          </div>
        )}
        <div className="fixed bottom-6 ltr:right-6 rtl:left-6 z-50">
          {showTopButton && (
            <button
              type="button"
              className="btn btn-outline-primary rounded-full p-2 animate-pulse"
              onClick={goToTop}
            >
              <TopIcon />
            </button>
          )}
        </div>

        {/* BEGIN APP SETTING LAUNCHER */}
        {/* END APP SETTING LAUNCHER */}

        <div
          className={`${themeConfig.navbar} main-container flex min-h-screen`}
        >
          {/* BEGIN SIDEBAR */}
          <Sidebar />
          {/* END SIDEBAR */}

          {/* BEGIN CONTENT AREA */}
          <div
            className={`main-content ${
              themeConfig.sidebar || windowWidth < 1024 ? "!w-[calc(100vw-100px)]" : "!w-[calc(100vw-280px)]"
            }`}
          >
            {/* BEGIN TOP NAVBAR */}
            <Header />
            {/* END TOP NAVBAR */}
            <Suspense>
              <div
                className={`${themeConfig.animation} mt-6 ms-6 overflow-x-hidden`}
              >
                {children}
                {/* BEGIN FOOTER */}
                <Footer />
                {/* END FOOTER */}
              </div>
            </Suspense>
            {/* <Portals /> */}
          </div>
          {/* END CONTENT AREA */}
        </div>
      </div>
    </App>
  );
};

export default DefaultLayout;
