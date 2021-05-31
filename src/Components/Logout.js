import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import { useHistory } from "react-router";
import { GlobalContext } from "../Global/GlobalState";
const Logout = () => {
  const [GlobalState, setGlobalState] = useContext(GlobalContext);
  const history = useHistory();
  useEffect(() => {
    swal
      .fire({
        icon: "warning",
        text: "Apakah anda yakin ingin log out?",
        showDenyButton: true,
        confirmButtonText: `Ya`,
        denyButtonText: `Tidak`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("user", null);
          setGlobalState({ type: "setUser", payload: null });
          swal.fire({
            icon: "success",
            text: "Berhasil Log Out",
          });
          history.push("/");
        } else if (result.isDenied) {
          swal.fire({
            icon: "success",
            text: "Log out dibatalkan",
          });
          history.push("/");
        }
      });
  }, []);
  return <div className="w-full h-screen"></div>;
};
export default Logout;
