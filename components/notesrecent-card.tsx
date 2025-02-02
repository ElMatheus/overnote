import { ArrowDownLeft } from 'lucide-react';

export function CardNotes({ id, title, content }: { id: string, title: string, content: string }) {
  return (
    <div className='w-full md:w-[450px] h-auto md:h-[268px] relative rounded-2xl bg-[#F9F9FA] p-8 '>
      <div className='absolute top-0 right-0 bg-white p-2 rounded-bl-[2rem]'>
        <div className='bg-[#F9F9FA] rounded-full p-3'>
          <ArrowDownLeft size={30} />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='font-semibold text-4xl'>{title}</h1>
        <p className='font-normal text-lg'>{content}</p>
      </div>

    </div>
  );
}