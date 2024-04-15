import Image from "next/image";
import { CategoryList } from "./_components/CategoryList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import { ProductList } from "./_components/ProductList";
import { Footer } from "./_components/Footer";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/ui/TranslationsProvider";

const i18nNamespaces = ["home", "common"];

export default async function Home({ params: { locale }}) {
  const slidersList = await GlobalApi.getSliderImages();
  const categoryList = await GlobalApi.getCategoriesList();
  const productList = await GlobalApi.getAllProducts();
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
      <div className="p-5 md:p-10">
        <Slider slidersList={slidersList} />
        <CategoryList locale={locale} categoryList={categoryList} />
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
    </TranslationsProvider>
  );
}
