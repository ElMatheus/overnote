import { Award, FileText, Globe, Lock, Pencil, Share2 } from 'lucide-react';
import Link from 'next/link';

export function CardNotes({ id, title, lastUpdatedUser, lastUpdatedDate, privacy, position, canEdit }: { id: string, title: string, lastUpdatedUser: string, lastUpdatedDate: string, privacy: boolean, position: boolean, canEdit: boolean }) {
  return (
    <Link href={`/notes/${id}`}>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row gap-3'>
          <FileText size={63} color="#244db3" strokeWidth={0.75} />
          <div className='flex flex-col'>
            <h1 className='font-semibold text-2xl text-[#1E201F]'>{title}</h1>
            <p className='font-normal text-lg'>Modified by {lastUpdatedUser} - {lastUpdatedDate}</p>
          </div>
        </div>
        <div className='flex flex-row gap-2'>
          {
            privacy ? (
              <Lock strokeWidth={1.5} size={30} />
            ) : (
              <Globe strokeWidth={1.5} size={30} />
            )
          }
          {
            position ? (
              <Award strokeWidth={1.5} size={30} />
            ) : (
              <Share2 strokeWidth={1.5} size={30} />
            )
          }
          {
            canEdit && (
              <Pencil strokeWidth={1.5} size={30} />
            )
          }
        </div>
      </div>
    </Link>
  );
}