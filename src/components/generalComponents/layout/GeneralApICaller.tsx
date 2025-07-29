import { setAuthedUserData } from "@/store/profile";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

const GeneralApICaller = () => {
  const storedUser = Cookies.get("user_data");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      console.log("🚀 ~ useEffect ~ userObject:", userObject);
      dispatch(setAuthedUserData(userObject));
    }
  }, [dispatch, storedUser]);

  return null;
};

export default GeneralApICaller;
