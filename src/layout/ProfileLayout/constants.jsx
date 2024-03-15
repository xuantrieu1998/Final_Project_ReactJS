import { FaUserPen } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { ROUTES } from "../../constants/routes";

export const PROFILE_MENU = [
  {
    label: "Thông tin cá nhân",
    path: ROUTES.USER.USER_INFO,
    icon: <FaUserPen />,
  },
  {
    label: "Lịch sử mua hàng",
    path: ROUTES.USER.ORDER_HISTORY,
    icon: <FaHistory />,
  },
  {
    label: "Sản phẩm yêu thích",
    path: ROUTES.USER.FAVORITE_PRODUCTS,
    icon: <MdFavorite />,
  },
  {
    label: "Thay đổi mật khẩu",
    path: ROUTES.USER.CHANGE_PASSWORD,
    icon: <RiLockPasswordFill />,
  },
];
