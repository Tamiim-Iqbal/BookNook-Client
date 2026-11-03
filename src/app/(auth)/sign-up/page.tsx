"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    UserRound,
    Sparkles,
    LibraryBig,
} from "lucide-react";
import Image from "next/image";
import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignUp = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const handleGoogleSignUp = async () => {
        const resData = await signIn.social({
            provider: "google",
        });
        console.log("Google Sign Up Response:", resData);
    };

    // Password validation
    const validatePassword = (password: string) => {
        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }

        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }

        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }

        return "";
    };

    const handleEmailSignUp = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(formData.entries()) as {
            name: string;
            email: string;
            password: string;
            confirmPassword: string;
        };

        // Name validation
        if (!user.name.trim()) {
            toast.error("Please enter your full name.");
            return;
        }

        // Email validation
        if (!user.email.trim()) {
            toast.error("Please enter your email address.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(user.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        // Empty password validation
        if (!user.password) {
            const message = "Please enter your password.";
            setPasswordError(message);
            toast.error(message);
            return;
        }

        // Password validation
        const validationError = validatePassword(user.password);

        if (validationError) {
            setPasswordError(validationError);
            toast.error(validationError);
            return;
        }

        setPasswordError("");

        // Confirm password validation
        if (!user.confirmPassword) {
            toast.error("Please confirm your password.");
            return;
        }

        if (user.password !== user.confirmPassword) {
            toast.error("Password and Confirm Password do not match");
            return;
        }

        try {
            const { data, error } = await signUp.email({
                name: user.name.trim(),
                email: user.email.trim(),
                password: user.password,
            });

            if (error) {
                toast.error(error.message || "Something went wrong!");
                console.error("Signup error:", error);
                return;
            }

            if (data) {
                toast.success("Signup successfully!");
                console.log("Signup successfully!", data);

                router.push("/sign-in");
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("Something went wrong! Please try again.");
        }
    };

    return (
        <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-(--main-bg) px-4 pt-6 sm:px-6">
            <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-(--border) bg-(--primary-bg) shadow-sm lg:grid-cols-2">

                {/* Left: Visual Panel */}
                <section className="relative hidden flex-col justify-between overflow-hidden bg-(--secondary) p-9 text-white lg:flex">
                    <div className="absolute -top-28 -right-28 size-80 rounded-full border border-white/10" />
                    <div className="absolute -top-16 -right-16 size-56 rounded-full border border-white/10" />
                    <div className="absolute -bottom-36 -left-28 size-96 rounded-full border border-white/10" />

                    <div className="relative z-10">
                        <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-white/70">
                            A WORLD OF STORIES
                        </p>

                        <h2 className="max-w-sm font-serif text-4xl leading-tight font-bold">
                            Your next favorite book is waiting.
                        </h2>

                        <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">
                            Create your account and make room for new stories, fresh ideas,
                            and unforgettable reading experiences.
                        </p>
                    </div>

                    {/* Book Illustration */}
                    <div className="relative z-10 my-3 flex items-center justify-center">
                        <div className="relative flex h-56 w-56 items-center justify-center">
                            <div className="absolute size-56 rounded-full border border-white/15" />
                            <div className="absolute size-44 rounded-full border border-white/15" />

                            <div className="relative flex items-end gap-2">
                                <div className="h-28 w-14 -rotate-12 rounded-l-md rounded-r-sm border-l-4 border-white/30 bg-white/20 p-2 shadow-xl">
                                    <div className="mt-5 h-1 w-full rounded bg-white/50" />
                                    <div className="mt-2 h-1 w-3/4 rounded bg-white/30" />
                                </div>

                                <div className="z-10 flex h-36 w-18 flex-col items-center justify-center rounded-l-md rounded-r-lg border-l-4 border-white/40 bg-white p-2 text-(--secondary) shadow-2xl">
                                    <BookOpen size={29} strokeWidth={1.5} />
                                    <span className="mt-3 font-serif text-sm font-bold">
                                        Read
                                    </span>
                                    <span className="text-[9px] tracking-widest">
                                        DISCOVER
                                    </span>
                                </div>

                                <div className="h-32 w-14 rotate-12 rounded-l-md rounded-r-sm border-l-4 border-white/30 bg-white/30 p-2 shadow-xl">
                                    <div className="mt-6 h-1 w-full rounded bg-white/50" />
                                    <div className="mt-2 h-1 w-3/4 rounded bg-white/30" />
                                </div>
                            </div>

                            <div className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full bg-white/15">
                                <Sparkles size={16} />
                            </div>

                            <div className="absolute bottom-7 left-4 flex size-9 items-center justify-center rounded-full bg-white/15">
                                <LibraryBig size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Quote */}
                    <div className="relative z-10 border-t border-white/20 pt-5">
                        <p className="font-serif text-lg italic leading-relaxed text-white/90">
                            There is no friend as loyal as a book.
                        </p>
                        <p className="mt-2 text-xs font-medium tracking-wide text-white/60">
                            — Ernest Hemingway
                        </p>
                    </div>
                </section>

                {/* Right: Sign Up Form */}
                <section className="flex flex-col justify-center px-6 py-8 sm:px-10 lg:px-12 lg:py-4">

                    {/* Logo */}
                    <Link href="/" className="mb-3 inline-flex w-fit items-center gap-2.5">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-(--secondary)">
                            <BookOpen size={23} className="text-white" />
                        </div>

                        <span className="text-xl font-bold tracking-tight text-(--primary)">
                            Book<span className="text-(--secondary)">Nook</span>
                        </span>
                    </Link>

                    {/* Heading */}
                    <div className="mb-6">
                        <h1 className="font-serif text-3xl font-bold text-(--text-primary) sm:text-4xl">
                            Create your account
                        </h1>
                    </div>

                    {/* Google Sign Up */}
                    <button onClick={handleGoogleSignUp}
                        type="button"
                        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-(--border) bg-(--main-bg) px-4 py-2.5 text-sm font-semibold text-(--text-primary) transition-colors hover:bg-(--main-bg)/70"
                    >
                        <Image
                            src="/images/logo/google.png"
                            alt="Google"
                            width={18}
                            height={18}
                        />
                        Sign up with Google
                    </button>

                    {/* Divider */}
                    <div className="mt-3 mb-2 flex items-center gap-4">
                        <div className="h-px flex-1 bg-(--border)" />
                        <span className="text-[11px] font-medium text-(--text-muted)">
                            OR
                        </span>
                        <div className="h-px flex-1 bg-(--border)" />
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleEmailSignUp}
                        noValidate
                        className="space-y-3"
                    >
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1.5 block text-sm font-semibold text-(--text-primary)"
                            >
                                Full Name
                            </label>

                            <div className="relative">
                                <UserRound
                                    size={18}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 text-(--text-muted)"
                                />

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    autoComplete="name"
                                    className="w-full rounded-xl border border-(--border) bg-(--main-bg) py-2.5 pr-4 pl-11 text-sm text-(--text-primary) outline-none transition-all placeholder:text-(--text-muted) focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/10"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-sm font-semibold text-(--text-primary)"
                            >
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 text-(--text-muted)"
                                />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full rounded-xl border border-(--border) bg-(--main-bg) py-2.5 pr-4 pl-11 text-sm text-(--text-primary) outline-none transition-all placeholder:text-(--text-muted) focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/10"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-sm font-semibold text-(--text-primary)"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={18}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 text-(--text-muted)"
                                />

                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                    onChange={(e) => {
                                        setPasswordError(
                                            validatePassword(e.target.value)
                                        );
                                    }}
                                    className="w-full rounded-xl border border-(--border) bg-(--main-bg) py-2.5 pr-12 pl-11 text-sm text-(--text-primary) outline-none transition-all placeholder:text-(--text-muted) focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute top-1/2 right-4 -translate-y-1/2 text-(--text-muted) transition-colors hover:text-(--text-primary)"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {/* Inline Password Error */}
                            {passwordError && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {passwordError}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-1.5 block text-sm font-semibold text-(--text-primary)"
                            >
                                Confirm Password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={18}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 text-(--text-muted)"
                                />

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                    className="w-full rounded-xl border border-(--border) bg-(--main-bg) py-2.5 pr-12 pl-11 text-sm text-(--text-primary) outline-none transition-all placeholder:text-(--text-muted) focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    aria-label={
                                        showConfirmPassword ? "Hide password" : "Show password"
                                    }
                                    className="absolute top-1/2 right-4 -translate-y-1/2 text-(--text-muted) transition-colors hover:text-(--text-primary)"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--secondary) px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-(--secondary-hover) active:scale-[0.99]"
                        >
                            Create Account
                            <ArrowRight size={17} />
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <p className="mt-5 text-center text-sm text-(--text-muted)">
                        Already have an account?{" "}
                        <Link
                            href="/sign-in"
                            className="font-semibold text-(--secondary) transition-colors hover:text-(--primary)"
                        >
                            Sign in
                        </Link>
                    </p>
                </section>
            </div>
        </main>
    );
};

export default SignUp;
