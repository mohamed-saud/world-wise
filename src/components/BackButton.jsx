import { useNavigate } from "react-router-dom";
import Button from "./Button";
function BackButton() {
  const navigate = useNavigate();
  return (
    <Button onclick={(e) => navigate(-1)} type="back">
      &larr; Back
    </Button>
  );
}

export default BackButton;
