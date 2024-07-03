import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const showToast = (message) => {
    toast(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
};


export default showToast;