"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    eyebrow: "Organize your reading journey",
    title: (
      <>
        Build Your{" "}
        <br />
        <span className="text-(--secondary)">Own Library.</span>
      </>
    ),
    description:
      "Add your favourite books, organize your collection, and keep all your reading choices together in one convenient place.",
    image: "/images/hero/library-1.avif",
    credit: "Your personal collection",
    layout: "classic",
  },
  {
    eyebrow: "Discover. Borrow. Enjoy.",
    title: (
      <>
        Borrow Books.{" "}
        <span className="text-(--secondary)">Read More.</span>
      </>
    ),
    description:
      "Explore available books, borrow the ones you love, and easily keep track of your borrowed books and reading journey.",
    image: "/images/hero/library-2.avif",
    credit: "A world of stories",
    layout: "split",
  },
  {
    eyebrow: "A community of book lovers",
    title: (
      <>
        Share Books.{" "}
        <span className="text-(--secondary)">Grow Together.</span>
      </>
    ),
    description:
      "Add books to the library, make them available to other readers, and help everyone discover something worth reading.",
    image: "/images/hero/library-3.avif",
    credit: "Sharing the love of books",
    layout: "editorial",
  },
];

const HeroSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateSlide = () => {
      setActiveSlide(api.selectedScrollSnap());
    };

    api.on("select", updateSlide);
    updateSlide();

    return () => {
      api.off("select", updateSlide);
    };
  }, [api]);

  return (
    <section
      id="home"
      aria-label="Featured reading"
      className="relative isolate mx-auto mt-5 w-[calc(100%-24px)] overflow-hidden rounded-[24px] bg-(--primary-bg) px-4 pb-8 pt-12 sm:mt-10 sm:w-[90%] sm:rounded-[28px] sm:px-10 sm:pt-20 lg:pb-10 lg:pt-20"
    >
      {/* Decorative Circular Curve */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[265px] top-[130px] size-[440px] rounded-full border border-(--primary)/[0.09]"
      />

      {/* Hero Content */}
      <div className="relative mx-auto max-w-[1320px]">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 6500,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={slide.credit}>
                <div className="grid min-h-[360px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[6vw]">
                  {/* Hero Content */}
                  <div
                    key={`copy-${index}`}
                    className="animate-hero-copy relative z-10 lg:pl-7"
                  >
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-(--secondary)">
                      <span className="h-px w-[38px] bg-(--secondary)" />
                      {slide.eyebrow}
                    </div>

                    {/* Heading */}
                    <h1 className="mt-5 min-h-[2.04em] max-w-[600px] font-serif text-[clamp(46px,5.2vw,78px)] font-bold leading-[1.02] tracking-[-0.045em] text-[#102D24]">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="mt-5 min-h-[5.4em] max-w-[460px] text-[14px] font-medium leading-[1.8] text-(--text-secondary) sm:text-[16px]">
                      {slide.description}
                    </p>

                    {/* Browse Books Link */}
                    <div className="mt-7">
                      <Link
                        href="/all-books"
                        className="inline-flex h-[48px] items-center gap-4 rounded-lg border border-(--secondary) bg-(--secondary) px-7 text-[13px] font-semibold tracking-wide text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-(--secondary-hover) hover:bg-(--secondary-hover)"
                      >
                        Browse books
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </div>

                  {/* Hero Image */}
                  <div
                    key={`visual-${index}`}
                    className={`animate-hero-visual relative z-0 mx-auto h-[320px] w-full sm:h-[360px] lg:h-[450px] ${
                      slide.layout === "classic"
                        ? "hero-classic"
                        : slide.layout === "split"
                          ? "hero-split"
                          : "hero-editorial"
                    }`}
                  >
                    {/* Image */}
                    <div className="hero-image-frame absolute right-0 top-0 z-0 h-[84%] w-[84%] overflow-hidden bg-[#e7e1d5]">
                      <img
                        src={slide.image}
                        alt={slide.credit}
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1e3830]/[0.04] to-[#233226]/[0.18]" />
                    </div>

                    {/* Floating Editor Note */}
                    <div className="absolute bottom-4 left-0 z-20 w-[235px] rounded-md border border-(--primary)/10 bg-(--main-bg) p-5 font-medium shadow-sm sm:w-[270px] sm:p-[26px]">
                      <p className="mt-2 text-[15px] italic leading-relaxed text-(--primary)">
                        A book is a quiet place where the world becomes larger.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Centered Carousel Dots */}
          <div className="mt-5 flex justify-center">
            <div className="flex items-center gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.credit}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={
                    activeSlide === index ? "true" : undefined
                  }
                  onClick={() => api?.scrollTo(index)}
                  className="flex size-6 items-center justify-center"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      activeSlide === index
                        ? "size-2.5 bg-(--secondary)"
                        : "size-1.5 bg-(--primary)/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default HeroSection;