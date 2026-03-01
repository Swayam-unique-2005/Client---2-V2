import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { searchProducts } from "@/data/products";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const results = searchProducts(query);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Shop
        </Link>
        <h1 className="font-serif text-2xl text-foreground mb-2">
          Search results for "{query}"
        </h1>
        <p className="font-sans text-sm text-muted-foreground mb-8">{results.length} products found</p>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center font-sans text-sm text-muted-foreground py-12">No products match your search. Try different keywords.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
