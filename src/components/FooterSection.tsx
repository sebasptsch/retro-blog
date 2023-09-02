interface FooterSection {
    title: string;
    children?: React.ReactNode;
}

export default function FooterSection (props: FooterSection) {
    const { title, children } = props;
    return (
        <section>
            <h2 className="footer-title">{title}</h2>
            {children}
        </section>
    )
}