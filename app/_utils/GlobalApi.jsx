const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
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

export default {
  getCategories,
  getCategoriesList,
  getSliderImages,
};
