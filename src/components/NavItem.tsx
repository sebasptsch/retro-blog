import Link from "next/link";

interface NavItemProps {
    children?: React.ReactNode;
    href?: string;
}

export default function NavItem (props: NavItemProps) {
    const { children } = props;
    return (
        <Link href="#" className="btn btn-ghost normal-case text-xl">
            {children}
        </Link>
    )
}