import React from "react";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/common/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
