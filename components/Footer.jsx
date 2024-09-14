import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{ backgroundColor: "#36CA86", zIndex: 1000 }}
      className={`footer w-full footer-center bg-base-200 text-base-content rounded p-6 md:p-10`}
    >
      <div className="flex justify-center mb-4">
        <Link href="/">
        <Image
            src="/images/stock_master.png"
            alt="Stock Master Logo"
            width={70}
            height={70}
          />
        </Link>
      </div>
      <div className="container mx-auto">
        <ul className="flex flex-wrap justify-center space-x-4 my-4">
          <li>
            <Link
              href="https://www.linkedin.com/company/novacopy-ai/"
              legacyBehavior
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-300 transition"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin fa-2x"></i>{" "}
                <span className="sr-only">LinkedIn</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/novacopyai/" legacyBehavior>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-300 transition"
                title="Instagram"
              >
                <i className="fab fa-instagram fa-2x"></i>
                <span className="sr-only">Instagram</span>
              </a>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.facebook.com/people/NovaCopy-AI/61564479223799/"
              legacyBehavior
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-300 transition"
                title="Facebook"
              >
                <i className="fab fa-facebook fa-2x"></i>
                <span className="sr-only">Facebook</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="mailto:novacopyai14@gmail.com" legacyBehavior>
              <a
                className="text-white hover:text-pink-300 transition"
                title="Email"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-envelope fa-2x"></i>
                <span className="sr-only">Email</span>
              </a>
            </Link>
          </li>
        </ul>
        <ul className="flex justify-center text-sm text-zinc-200">
          <li>&copy; Stock Master 2024</li>
        </ul>
      </div>
    </footer>
  );
}
