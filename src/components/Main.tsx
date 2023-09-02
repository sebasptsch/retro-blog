interface MainProps {
  children?: React.ReactNode;
}

export default function Main(props: MainProps) {
  const { children } = props;
  return <main className="flex flex-grow flex-col">{children}</main>;
}
