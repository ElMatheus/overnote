import { Globe, Lock, Share2, Award } from 'lucide-react';

type CategoryIcon = "Globe" | "Lock" | "Share2" | "Award";

const iconMap = {
  Globe: Globe,
  Lock: Lock,
  Share2: Share2,
  Award: Award,
};

export function Category({ name, Icon, selected }: { name: string, Icon: CategoryIcon, selected: boolean }) {
  const IconComponent = iconMap[Icon];

  return (
    <div className={`flex flex-row px-2 py-0 rounded-full border-[1px] gap-1 items-center ${selected ? 'bg-black border-black' : 'bg-white border-[#1E201F]'}`}>
      <IconComponent size={20} color={selected ? 'white' : '#1E201F'} />
      <h2 className={`text-lg font-normal ${selected ? 'text-white' : 'text-[#1E201F]'}`}>{name}</h2>
    </div>
  );
}