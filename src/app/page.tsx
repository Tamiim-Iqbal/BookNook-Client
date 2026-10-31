import Image from "next/image";
import Hero from "./components/home/Hero";
import Books from "./books/page";

export default function Home() {
  return (
    <div>
      <Hero />
      <Books />
    </div>
  );
}
