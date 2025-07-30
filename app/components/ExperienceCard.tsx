import Image from 'next/image';

interface ExperienceCardProps {
  title: string;
  company: string;
  date: string;
  bullets: string[];
  logoSrc: string;
  logoAlt: string;
}

export default function ExperienceCard({
  title,
  company,
  date,
  bullets,
  logoSrc,
  logoAlt
}: ExperienceCardProps) {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white border rounded-xl shadow p-6 hover:shadow-lg transition">
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 font-medium">{company} • {date}</p>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          {bullets.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="w-28 h-28 mt-6 md:mt-0 md:ml-8 flex-shrink-0">
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={112}
          height={112}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}
