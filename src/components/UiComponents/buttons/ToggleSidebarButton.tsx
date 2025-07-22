import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/store/themeConfigSlice";
import { ReactComponent as ToggleIcon } from "@/assets/icons/toggleIcon.svg";
const ToggleSidebarButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(toggleSidebar())}
      className="flex items-center p-2 rounded-full bg-body hover:text-primary"
    >
      <ToggleIcon />
    </button>
  );
};

export default ToggleSidebarButton;
