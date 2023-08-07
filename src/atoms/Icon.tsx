import { JSX } from "preact";
import { asset } from "$fresh/runtime.ts";

export type IconProps = JSX.SVGAttributes<SVGSVGElement>;

export function Icon(props: IconProps) {
  const iconUrl = props.icon
    ? `${props.src}#${props.icon}`
    : props.src
    ? props.src.toString()
    : undefined;

  const icon = iconUrl ? <use href={asset(iconUrl)} /> : props.children;

  return (
    <svg {...props} src={undefined} icon={undefined}>
      {icon}
    </svg>
  );
}
