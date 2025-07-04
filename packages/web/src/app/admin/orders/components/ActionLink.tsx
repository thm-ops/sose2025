import Link from "next/link";

interface ActionLinkProps {
    href: string;
    children: React.ReactNode;
    srText?: string;
}

const ActionLink: React.FC<ActionLinkProps> = ({ href, children, srText }) => (
    <Link href={href} className="text-indigo-600 hover:text-indigo-900">
        {children}
        {srText && <span className="sr-only">{srText}</span>}
    </Link>
);

export default ActionLink;
