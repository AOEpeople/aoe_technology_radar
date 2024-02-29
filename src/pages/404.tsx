import Head from "next/head";
import Link from "next/link";

import Search from "@/components/Icons/Search";
import { formatTitle } from "@/lib/format";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{formatTitle("404 - Page Not Found")}</title>
      </Head>
      <div style={{ textAlign: "center", margin: "0 auto" }}>
        <Search width={150} style={{ display: "inline-block" }} />
        <h1>404 - Page Not Found</h1>
        <p>
          <Link href="/">Return to homepage</Link>
        </p>
      </div>
    </>
  );
}
