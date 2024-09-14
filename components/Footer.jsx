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
              href="https://www.linkedin.com/in/miho-funayama-653b391b4/"
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
            <Link
              href="https://github.com/funamioh"
              legacyBehavior
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-300 transition"
                title="GitHub"
              >
                <i className="fab fa-github fa-2x"></i>
                <span className="sr-only">GitHub</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="mailto:miho.funayama.tech@gmail.com" legacyBehavior>
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
