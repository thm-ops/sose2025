import { classNames } from "../utils/classNames";

interface PageSectionProps {
    children: React.ReactNode;
    className?: string;
}

const PageSection: React.FC<PageSectionProps> = ({ children, className = "" }) => (
    <header className={classNames("bg-white shadow-sm rounded-lg", className)}>
        {children}
    </header>
);

export default PageSection;
