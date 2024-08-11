import { JSX } from "../browser.deps.ts";

export type IconProps = JSX.SVGAttributes<SVGSVGElement>;

export function Icon(props: IconProps): JSX.Element {
  const iconUrl = props.icon
    ? `${props.src}#${props.icon}`
    : props.src
    ? props.src.toString()
    : undefined;

  const icon = iconUrl
    ? <use href={iconUrl} data-eac-bypass-base />
    : props.children;

  return (
    <svg {...props} src={undefined} icon={undefined}>
      {icon}
    </svg>
  );
}
