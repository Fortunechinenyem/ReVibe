import Link from "next/link";

export default function CheckEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
        <p className="text-gray-600 mb-6">
          A verification email has been sent to your email address. Please
          verify your email to continue.
        </p>
        <Link
          href="/login"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
