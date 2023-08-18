import { AppProps } from "$fresh/server.ts";
import { BasicLayout } from "@fathym/atomic";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <BasicLayout header={<Header />} footer={<Footer />}>
        <Component />
      </BasicLayout>
    </>
  );
}
