import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About ReVibe</h3>
            <p className="text-gray-400">
              Revibes - Revive, Reuse, Relove. Discover pre-loved treasures and
              shop sustainably!
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-400 hover:text-white">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-3">
              Stay updated with the latest deals and trends!
            </p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 text-gray-900 rounded-l-md focus:outline-none"
              />
              <button className="bg-purple-600 px-4 py-2 rounded-r-md hover:bg-blue-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Image
              src="/images/visa.PNG"
              alt="Visa"
              className="h-8"
              height={50}
              width={50}
            />
            <Image
              src="/images/mastercard.PNG"
              alt="Mastercard"
              className="h-8"
              height={50}
              width={50}
            />
            <Image
              src="/images/paypal.PNG"
              alt="PayPal"
              className="h-8"
              height={50}
              width={50}
            />
            <Image
              src="/images/applepay.PNG"
              alt="Apple Pay"
              className="h-8"
              height={50}
              width={50}
            />
          </div>

          <p>&copy; {new Date().getFullYear()} ReVibe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
