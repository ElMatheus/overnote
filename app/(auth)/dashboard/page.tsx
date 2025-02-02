import { CardNotes } from "@/components/notesrecent-card";
import { ArrowRight } from 'lucide-react';

export default function Page() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex flex-col py-5 px-8">
      <h1 className="text-4xl font-normal">Recent Notes</h1>
      <div className="flex flex-row justify-between pt-7 pb-7">
        <CardNotes id={"ds"} title={"Teste"} content={"dfdfdfdf"} />
        <CardNotes id={"ds"} title={"Teste"} content={"dfdfdfdf"} />
        <CardNotes id={"ds"} title={"Teste"} content={"dfdfdfdf"} />
      </div>
      <div className="flex flex-row justify-end">
        <button className="flex flex-row gap-2 bg-[#1E201F] px-3.5 py-4 rounded-full text-white items-center">
          <p className="font-extralight">View All</p>
          <ArrowRight size={23} color="#ffffff" strokeWidth={1.4} />
        </button>
      </div>

      <div className="flex justify-center py-7">
        <div className='bg-[url("https://i.imgur.com/ryRVKua.png")] bg-cover bg-center w-full max-w-[1383px] h-auto min-h-[300px] aspect-[1383/655]'>
          <div className="flex flex-col justify-center items-center  h-full w-full">
            <h1 className="text-6xl font-semibold text-center text-[#1E201F] max-w-[50%]">Choose a title for your new note</h1>
            <p className="font-light text-center text-3xl text-[#1E201F] max-w-[70%] mt-4">Notes help you capture inspirations, plan tasks, and keep everything within reach. Give your new note a name and start now!</p>
            <div className="bg-white p-3 pl-5 rounded-tl-full rounded-tr-full rounded-br-full flex flex-row justify-between items-center max-w-[70%] mt-6">
              <input className="focus:outline-none font-normal text-2xl text-[#1E201F] flex-grow" placeholder="Enter your note title..." type="text" />
              <button className="flex flex-row gap-2 bg-[#1E201F] px-3.5 py-4 rounded-full text-white items-center ml-4">
                <p className="font-extralight">Get Started</p>
                <ArrowRight size={23} color="#ffffff" strokeWidth={1.4} />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}