interface NavbarProps {
    children?: React.ReactNode;
}

export default function Navbar (props: NavbarProps) {
    const { children } = props;
    return (
        <nav className="navbar bg-neutral text-neutral-content justify-center">
            {children}
        </nav>
    )
}