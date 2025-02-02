import { Globe, Lock, Share2, Award } from 'lucide-react';

type CategoryIcon = "Globe" | "Lock" | "Share2" | "Award";

const iconMap = {
  Globe: Globe,
  Lock: Lock,
  Share2: Share2,
  Award: Award,
};

export function Category({ name, Icon }: { name: string, Icon: CategoryIcon }) {
  const IconComponent = iconMap[Icon];

  return (
    <div className="flex flex-row px-2 py-0 rounded-full bg-white border-[1px] border-[#1E201F] gap-1 items-center">
      <IconComponent size={20} />
      <h2 className='text-lg text-[#1E201F] font-normal'>{name}</h2>
    </div>
  );
}