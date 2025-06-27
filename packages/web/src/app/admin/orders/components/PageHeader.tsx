interface PageHeaderProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => (
    <div className="border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 sm:flex-row sm:items-center">
            <div>
                <h1 className="text-2xl font-bold leading-7 text-gray-900">{title}</h1>
                <p className="mt-2 text-sm text-gray-700">{description}</p>
            </div>
            {children}
        </div>
    </div>
);

export default PageHeader;
