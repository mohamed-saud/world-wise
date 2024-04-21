import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

function ProtactedRoute({ children }) {
  const navegate = useNavigate();
  const { isAuthantcated } = useContext(AuthContext);

  useEffect(
    function () {
      if (!isAuthantcated) navegate("/");
    },
    [isAuthantcated, navegate]
  );
  return isAuthantcated ? children : null;
}

export default ProtactedRoute;
