import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { ProjectFinderQuiz } from "@/components/ProjectFinderQuiz";
import { MaterialCalculator } from "@/components/MaterialCalculator";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ContactSection } from "@/components/ContactSection";
import { StoreGallery } from "@/components/StoreGallery";
import { Footer } from "@/components/Footer";
import { QuoteListDrawer } from "@/components/QuoteListDrawer";
import { QuoteFab } from "@/components/QuoteFab";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
        <ProjectFinderQuiz />
        <MaterialCalculator />
        <ReviewsSection />
        <ContactSection />
        <StoreGallery />
      </main>
      <Footer />
      <QuoteListDrawer />
      <QuoteFab />
    </>
  );
}
