import ProductsHero from "../components/ProductsHero";
import ProductBreadcrumb from "../components/ProductBreadcrumb";
import ProductDetails from "../components/ProductDetails";
import ProductReviews from "../components/ProductReviews";
import SimilarProducts from "../components/SimilarProducts";

export default function ProductsDetailsTemplate() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Our Category", href: "/category" },
    { label: "Product Details" },
  ];

  return (
    <main className="w-full bg-background min-h-screen space-y-8!">
      <ProductsHero />
      <ProductBreadcrumb items={breadcrumbItems} />

      <ProductDetails />

      <ProductReviews />

      <SimilarProducts />

      <div className="container mx-auto px-4 py-12">
        {/* Other content could go here */}
      </div>
    </main>
  );
}
