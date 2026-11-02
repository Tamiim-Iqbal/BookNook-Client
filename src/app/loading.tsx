import { BookOpen } from "lucide-react";

const Loading = () => {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-(--main-bg) px-5">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-(--primary-bg)">
          <BookOpen
            size={34}
            strokeWidth={1.7}
            className="text-(--secondary)"
          />
        </div>

        {/* Loading Spinner */}
        <div className="mt-8 h-8 w-8 animate-spin rounded-full border-[3px] border-(--border) border-t-(--secondary)" />

        <h2 className="mt-5 font-serif text-xl font-bold text-(--text-primary)">
          BookNook
        </h2>

        <p className="mt-2 text-sm text-(--text-muted)">
          Preparing your reading experience...
        </p>
      </div>
    </main>
  );
};

export default Loading;