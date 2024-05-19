import { Link } from "react-router-dom";
import link from "../../lib/link";

export default function Clink({ data, params }) {
  return (
    <Link
      to={link(params)}
      style={{ color: "#000000", textDecoration: "none" }}
    >
      {data}
    </Link>
  );
}
