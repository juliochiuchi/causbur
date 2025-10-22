import { Link, LinkProps } from "expo-router";

type LinkButtonProps = LinkProps & {
  title: string,
}

export function LinkButton({ title, ...rest }: LinkButtonProps) {
  return (
    <Link className="text-causbur-text-button-back border border-causbur-border-button-back rounded-md p-3 text-center text-base font-body" {...rest}>
      {title}
    </Link>
  )
}
