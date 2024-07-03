import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const showSuccessToast = (message) => {
    toast(<div style={{ display: 'flex', alignItems: 'center' }}>
            <i className='fa-regular fa-circle-check' style={{ marginRight: '8px', color: '#00ff00' }}></i>
            <span>{message}</span>
          </div>, {
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


const showErrorToast = (message) => {
    toast(<div style={{ display: 'flex', alignItems: 'center' }}>
            <i className='fa-regular fa-circle-xmark' style={{ marginRight: '8px', color: '#b10000' }}></i>
            <span>{message}</span>
          </div>, {
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


export { showSuccessToast, showErrorToast };
