import { CategoryList } from "./_components/CategoryList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
export default async function Home() {
  const slidersList = await GlobalApi.getSliderImages();
  const categoryList = await GlobalApi.getCategoriesList();
  return (
    <div className="p-5 md:p-10">
      <Slider slidersList={slidersList} />
      <CategoryList categoryList={categoryList} />
    </div>
  );
}
