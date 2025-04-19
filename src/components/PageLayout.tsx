'use client';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white -mt-[88px] pt-[88px]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
} 