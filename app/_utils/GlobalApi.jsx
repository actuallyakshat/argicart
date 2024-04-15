const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api`,
});

const getCategories = async () => {
  try {
    const response = await axiosClient.get("/categories?populate=*");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getSliderImages = async () => {
  try {
    const response = await axiosClient.get("/sliders?populate=*");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getCategoriesList = async () => {
  try {
    const response = await axiosClient.get("/categories?populate=*");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async () => {
  try {
    const response = await axiosClient.get("/products?populate=*");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getProductsByCategory = async (category) => {
  try {
    const response = await axiosClient.get(
      `/products?filters[categories][name][$in]=${category}&populate=*`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (username, email, password) => {
  try {
    const response = await axiosClient.post("/auth/local/register", {
      username,
      email,
      password,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
};

const signIn = async (email, password) => {
  try {
    const response = await axiosClient.post("/auth/local", {
      identifier: email,
      password,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
};

const addToCart = async (data, jwt) => {
  try {
    const response = await axiosClient.post("/user-carts", data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
};

const getCartItems = async (userId, jwt) => {
  try {
    const response = await axiosClient.get(
      "/user-carts?filters[userId][$eq]=" +
        userId +
        "&[populate][products][populate][images][populate][0]=url",
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const data = response.data.data;
    console.log("data of all cart items = ", data);
    const cartItemsList = data.map((item, index) => ({
      name: item?.attributes?.products?.data[0]?.attributes?.name,
      quantity: item?.attributes?.quantity,
      amount: item?.attributes?.amount,
      image:
        item?.attributes?.products?.data[0]?.attributes?.images?.data[0]
          ?.attributes?.url,
      actualPrice: item?.attributes?.products?.data[0]?.attributes?.mrp,
      id: item?.id,
    }));
    return cartItemsList;
  } catch (error) {
    console.log("error at global api");
    console.log(error);
    // throw new Error(error.response.data.error.message);
  }
};

export default {
  getCategories,
  getCategoriesList,
  getSliderImages,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  signIn,
  addToCart,
  getCartItems,
};
