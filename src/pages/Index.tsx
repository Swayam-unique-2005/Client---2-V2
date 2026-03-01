import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import BannerSection from "@/components/BannerSection";
import Footer from "@/components/Footer";
import { getProductsBySection } from "@/data/products";
import { banners } from "@/data/banners";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />

        <ProductSection
          title="Frequently reordered items for you"
          products={getProductsBySection("reordered")}
        />

        <BannerSection banners={[banners[0], banners[2]]} />

        <ProductSection
          title="Top selling products"
          products={getProductsBySection("top-selling")}
        />

        <BannerSection banners={[banners[1]]} />

        <ProductSection
          title="Just for you"
          products={getProductsBySection("just-for-you")}
        />

        <ProductSection
          title="Recently Viewed"
          products={getProductsBySection("recently-viewed")}
        />

        <ProductSection
          title="New Arrivals"
          products={getProductsBySection("new-arrivals")}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
