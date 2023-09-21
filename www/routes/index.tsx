import { Head } from "$fresh/runtime.ts";
import Simple from "../islands/Simple.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>www</title>
      </Head>

      <h1 class="text-4xl font-bold">Welcome to fresh</h1>
      <p class="my-4 [&>*]:(bg-blue-500)">
        Try updating this message in the
        <code class="mx-2">./routes/index.tsx</code> file, and refresh.
      </p>
      <img
        class="my-6"
        src="/logo.svg"
        width="128"
        height="128"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />

      <Simple />
    </>
  );
}
