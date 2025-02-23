import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-[#2c9c46] text-white rounded-lg shadow-lg hover:bg-[#24803a] transition-all duration-300"
      >
        Go Home
      </Link>
    </div>
  );
}
