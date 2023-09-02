import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

interface FooterItemProps {
    children?: React.ReactNode;
    href: Url;
}

export default function FooterItem (props: FooterItemProps) {
    const { children, href } = props;
    return (
        <Link className="link link-hover" href={href}>
            {children}
        </Link>
    )
}