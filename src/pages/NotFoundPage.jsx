import { Link } from "react-router-dom";
export default function NotFoundPage() {
    return (
        <div>Not page found! Please go to <Link to ="/">home page</Link>!</div>
    );
}