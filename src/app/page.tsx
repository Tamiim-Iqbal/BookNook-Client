import Hero from "./components/home/Hero";
import BookQuote from "./components/home/BookQuote";
import Books from "./books/page";

export default function Home() {
  return (
    <div>
      <Hero />
      <Books />
      <BookQuote />
    </div>
  );
}
