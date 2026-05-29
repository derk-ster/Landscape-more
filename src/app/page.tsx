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
import { FloatingGardenPhotos } from "@/components/FloatingGardenPhotos";
import { SiteWarmth } from "@/components/SiteWarmth";

export default function Home() {
  return (
    <>
      <SiteWarmth />
      <FloatingGardenPhotos />
      <Header />
      <main className="relative z-[2]">
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
        <ProjectFinderQuiz />
        <MaterialCalculator />
        <ReviewsSection />
        <ContactSection />
        <StoreGallery />
      </main>
      <div className="relative z-[2]">
        <Footer />
      </div>
      <QuoteListDrawer />
      <QuoteFab />
    </>
  );
}
