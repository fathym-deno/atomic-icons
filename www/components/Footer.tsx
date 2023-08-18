import { classSet, Footer, FooterProps } from "@fathym/atomic";

export default function WWWFooter(props: FooterProps) {
  return (
    <Footer
      companyName="Fathym SVG Icon Sets"
      companyDescription="Deliver SVG Icons with simplicity, scalability, and performance."
      class={classSet(props, "![&_a]:text-white")}
      nav={[
        {
          href: "/",
          class: "px-2 py-1 text-gray-400 hover:text-white md:mx-2",
          children: "Home",
        },
        {
          href: "/docs",
          class: "px-2 py-1 text-gray-400 hover:text-white md:mx-2",
          children: "Docs",
        },
        {
          href: "/pricing",
          class: "px-2 py-1 text-gray-400 hover:text-white md:mx-2",
          children: "Services",
        },
      ]}
      {...props}
    />
  );
}
