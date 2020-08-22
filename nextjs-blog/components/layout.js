import { useRouter } from "next/router";
import Link from "next/link";

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const isRoot = pathname === "/";

  const header = isRoot ? (
    <h1 className="mb-8">
      <Link href="/">
        <a className="text-6xl font-black text-black no-underline">
          Awesome blog!
        </a>
      </Link>
    </h1>
  ) : (
    <h1 className="mb-2">
      <Link href="/">
        <a className="text-2xl font-black text-black no-underline">
          Awesome blog!
        </a>
      </Link>
    </h1>
  );

  return (
    <div className="main">
      <header>{header}</header>
      <main>{children}</main>
      <footer className="font-bold">© {new Date().getFullYear()}, by Beixa 🐮</footer>
    </div>
  );
}
