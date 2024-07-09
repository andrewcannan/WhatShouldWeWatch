export const getSessionCookie = () => {
        const cookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith('session='));
       
        return cookie ? true: false;
};