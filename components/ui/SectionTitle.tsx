type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-14 text-center">

      <h2 className="text-4xl font-extrabold text-blue-800">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
          {subtitle}
        </p>
      )}

    </div>
  );
}
