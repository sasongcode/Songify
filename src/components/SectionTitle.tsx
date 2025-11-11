interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2 className="text-2xl font-bold mb-5 border-l-4 border-green-500 pl-3">
      {title}
    </h2>
  );
}
