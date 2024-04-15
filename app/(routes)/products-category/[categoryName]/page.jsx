import GlobalApi from "@/app/_utils/GlobalApi";
import TopCategoryList from "./_components/TopCategoryList";
import { ProductList } from "@/app/_components/ProductList";
import { formatParamUrl } from "@/lib/functions/formatParamUrl";
export default async function ProductCategory({ params }) {
  const productList = await GlobalApi.getProductsByCategory(
    params.categoryName
  );
  const categoryList = await GlobalApi.getCategoriesList();
  return (
    <div>
      <h2 className="p-4 text-3xl text-center w-full bg-green-700 text-white font-bold">
        {formatParamUrl(params.categoryName)}
      </h2>
      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={params.categoryName}
      />
      <div className="p-5 md:p-10">
        <ProductList productList={productList} />
      </div>
    </div>
  );
}
