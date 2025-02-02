import { CardNotes } from "@/components/notes-card";
import { Category } from "@/components/category-card";
import { Plus, Search } from 'lucide-react';

export default function Page() {
  return (
    <div className="flex flex-row p-10 gap-20">

      <div className="flex flex-col gap-4 w-full">
        <CardNotes title={"Untitled"} lastUpdatedUser={"Matheus Gomes"} lastUpdatedDate={"Fev 10"} privacy={false} position={false} canEdit={true} />
        <CardNotes title={"Untitled"} lastUpdatedUser={"Matheus Gomes"} lastUpdatedDate={"Fev 10"} privacy={false} position={false} canEdit={true} />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row bg-[#FAFAFA] gap-3 rounded-full">
            <Search size={48} color="#fff" className="bg-[#1E201F] p-3 rounded-full" />
            <input placeholder="Search notes..." className="focus:outline-none font-normal bg-transparent text-xl text-[#1E201F]" type="text" />
          </div>
          <Plus size={48} color="#fff" className="bg-[#1E201F] p-3 rounded-full" />
        </div>

        <div className="flex flex-col gap-5 bg-[#F9F9FA] p-8 rounded-[3.5rem] self-end">
          <h1 className="text-2xl text-[#1E201F] font-normal">Explore Categories</h1>
          <div className="flex flex-row gap-6">
            <Category name={"Public"} Icon="Globe" />
            <Category name={"Private"} Icon="Lock" />
          </div>
          <div className="flex flex-row gap-6">
            <Category name={"Owner"} Icon="Award" />
            <Category name={"Shared"} Icon="Share2" />
          </div>
        </div>
      </div>

    </div>
  );
}