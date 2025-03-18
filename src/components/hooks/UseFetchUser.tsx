import type { userType } from "../../types";

const UseFetchUserData: () => userType = () => {
  let JSON_user = sessionStorage.getItem("user");

  const user = JSON_user && JSON.parse(JSON_user);

  return user;
};
export default UseFetchUserData;
