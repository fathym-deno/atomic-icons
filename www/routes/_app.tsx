import { AppProps } from "$fresh/server.ts";
import { BasicLayout } from "@fathym/atomic";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { getSessionId } from "@kv_oauth";

export default async function App(req: Request, { Component }: AppProps) {
  const sessionId = await getSessionId(req);

  const isSignedIn = sessionId !== undefined;

  return (
    <>
      <BasicLayout header={await Header(req, {})} footer={<Footer />}>
        {isSignedIn && <h1>Hi</h1>}
        <Component />
      </BasicLayout>
    </>
  );
}
