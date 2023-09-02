interface FooterProps {
    children?: React.ReactNode;
}

export default function Footer (props: FooterProps) {
    const { children } = props;
    return (
        <footer className="footer bg-neutral text-neutral-content p-10">
            <div className="container mx-auto">
                {children}
            </div>
        </footer>
    )
}