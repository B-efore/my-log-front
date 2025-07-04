import { getNotFound } from "../util/get-images";

const NotFound = (value) => {
    return (
    <div>
        <p>{value}</p>
        <img src={getNotFound()} />
    </div>
)}

export default NotFound;