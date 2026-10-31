import Hero from "./components/home/Hero";
import BookQuote from "./components/home/BookQuote";
import Books from "./books/page";
import HowToRead from "./components/home/HowtoRead";

export default function Home() {
  return (
    <div>
      <Hero />
      <Books />
      <HowToRead />
      <BookQuote />
    </div>
  );
}
