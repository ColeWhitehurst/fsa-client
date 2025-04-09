const API = "http://localhost:3000/api/account";

export const authorizeAccount = async (token) => {
    try {
        const response = await fetch(API, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const json = await response.json();
          return json;
    } catch (err) {
        console.error(`Yikes cannot get account!`, err);
    }
};