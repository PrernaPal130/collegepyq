"use client";
import Link from "next/link";
export default function Home() {
  return (
    <div className="container">
      <h1 className="title">Welcome to College Question Bank</h1>
      <h3 className="title2">Year</h3>
      <div className="folders">
        <Link href="/first">
          <button className="folder">1 st year</button>
        </Link>
        <Link href="/second">
          {" "}
          <button className="folder">2 nd year</button>
        </Link>
        <Link href="/third">
          {" "}
          <button className="folder">3 rd year</button>
        </Link>
        <Link href="/final">
          {" "}
          <button className="folder">Final year</button>
        </Link>
      </div>
    </div>
  );
}
