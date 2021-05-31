import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import { useHistory, useParams } from "react-router";
import { GlobalContext } from "../Global/GlobalState";
import axios from "axios";
const MovieDelete = () => {
  const [GlobalState, setGlobalState] = useContext(GlobalContext);
  const history = useHistory();
  let { id } = useParams();
  useEffect(() => {
    swal
      .fire({
        icon: "warning",
        text: "Apakah anda yakin ingin menghapus ini?",
        showDenyButton: true,
        confirmButtonText: `Ya`,
        denyButtonText: `Tidak`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(`[PRIVATE API LINK, NOT PROVIDED]`, {
            headers: { Authorization: "Bearer " + GlobalState.user.token },
          });
          swal.fire({
            icon: "success",
            title: "Berhasil dihapus",
            text: "Harap lakukan reload table untuk mengupdate data table",
          });
          history.push("/movietable");
        } else if (result.isDenied) {
          swal.fire({
            icon: "success",
            text: "Berhasil dibatalkan",
          });
          history.push("/");
        }
      });
  }, []);
  return <div className="w-full h-screen"></div>;
};
export default MovieDelete;
