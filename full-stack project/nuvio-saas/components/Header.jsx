import Link from "next/link";
import { Suspense } from "react";
import SearchBar from "./SearchBar";
import UserNav from "./UserNav";
import DeliverTo from "./DeliverTo";

export default function Header() {
  return (
    <header className="site-header text-white">
      <div className="site-header__inner">
        <Link
          href="/"
          className="site-header__brand text-2xl font-bold shrink-0 tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "#ff8a3d" }}
        >
          Nuvio
        </Link>

        <div className="site-header__deliver">
          <DeliverTo />
        </div>

        <div className="site-header__search">
          <Suspense
            fallback={
              <form className="search-form">
                <input type="text" placeholder="Search Nuvio" disabled />
                <button type="button">Search</button>
              </form>
            }
          >
            <SearchBar />
          </Suspense>
        </div>

        <div className="site-header__nav">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
