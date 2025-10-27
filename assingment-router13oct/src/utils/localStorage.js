export const saveUser = (userData) => {
  try {
    console.log("userdata",userData)
    localStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {
    console.error("Error", error);
  }
};

export const getUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user")) ;
    return user ;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};

export const removeUser = () => {
  try {
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error", error);
  }
};
