import Image from "next/image";
import { CategoryList } from "./_components/CategoryList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import { ProductList } from "./_components/ProductList";
import { Footer } from "./_components/Footer";
export default async function Home() {
  const slidersList = await GlobalApi.getSliderImages();
  const categoryList = await GlobalApi.getCategoriesList();
  const productList = await GlobalApi.getAllProducts();
  return (
    <div className="p-5 md:p-10">
      <Slider slidersList={slidersList} />
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList} />
      <Image
        src="/banner.png"
        unoptimized={true}
        width={1000}
        height={400}
        alt="banner"
        className="w-[1800px] mx-auto mt-10 h-fit max-h-[400px] object-contain"
      />
      <Footer />
    </div>
  );
}
