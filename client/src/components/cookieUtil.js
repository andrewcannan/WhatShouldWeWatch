export const getSessionCookie = () => {
        const cookies = document.cookie
          .split("; ")
          .find((row) => row.startsWith('session='));
       
        return cookies ? true: false;
};