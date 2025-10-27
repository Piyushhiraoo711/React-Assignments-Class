export const saveUser = (userData) => {
  try {
    console.log("userData", userData);
    localStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {
    console.log("error", error);
  }
};

export const getUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  } catch (error) {
    console.log("error", error);
  }
};


