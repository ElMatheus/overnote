"use client"

import { CardNotes } from "@/components/notes-card";
import { Category } from "@/components/category-card";
import { Plus, Search } from 'lucide-react';
import { createNote, getNotesByUserId, getNotesByUserIdFiltredCategory } from "@/actions/notes.actions";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  interface Note {
    id: string;
    title: string;
    content: string;
    updatedBy: {
      name: string;
    };
    updatedAt: string;
    isPrivate: boolean;
    ownerId: string;
    SharedNote: {
      canEdit: boolean;
    };
  }

  const [notes, setNotes] = useState<Note[] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [privacy, setPrivacy] = useState<string | null>(null);
  const [position, setPosition] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotes() {
      const session = await getSession();
      if (session?.user?.id) {
        setUserId(session.user.id);
        const data = await getNotesByUserId(session.user.id);
        setNotes(data);
      }
    }

    fetchNotes();
  }, [userId]);

  useEffect(() => {
    async function fetchNotes() {
      if (userId) {
        if (privacy || position) {
          const data = await getNotesByUserIdFiltredCategory(userId, privacy, position);
          if (data.length > 0) {
            setNotes(data);
          } else {
            setNotes(null);
          }

        }
      }
    }

    fetchNotes();
  }, [privacy, position, userId]);

  const togglePrivacy = (value: string) => {
    setPrivacy(privacy === value ? null : value);
  };

  const togglePosition = (value: string) => {
    setPosition(position === value ? null : value);
  };

  const handleCreateNote = async () => {
    if (userId) {
      const newNote = await createNote(null, userId);
      if (newNote.status == "success") {
        router.push(`/notes/${newNote.data.id}`);
      }
    }
  }

  return (
    <div className="flex flex-row p-10 gap-20">

      <div className="flex flex-col gap-4 w-full">
        {
          notes != null && notes.length > 0 ? (
            notes.map((note: Note) => (
              <CardNotes
                key={note.id}
                id={note.id}
                title={note.title}
                lastUpdatedUser={note.updatedBy.name}
                lastUpdatedDate={note.updatedAt}
                privacy={note.isPrivate}
                position={note.ownerId == userId}
                canEdit={note.SharedNote.canEdit}
              />
            ))
          ) : (
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
            </div>
          )
        }
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row bg-[#FAFAFA] gap-3 rounded-full">
            <Search size={48} color="#fff" className="bg-[#1E201F] p-3 rounded-full" />
            <input placeholder="Search notes..." className="focus:outline-none font-normal bg-transparent text-xl text-[#1E201F]" type="text" />
          </div>
          <Plus onClick={handleCreateNote} size={48} color="#fff" className="bg-[#1E201F] p-3 rounded-full cursor-pointer" />
        </div>

        <div className="flex flex-col gap-5 bg-[#F9F9FA] p-8 rounded-[3.5rem] self-end">
          <h1 className="text-2xl text-[#1E201F] font-normal">Explore Categories</h1>
          <div className="flex flex-row gap-6">
            <button
              onClick={() => togglePrivacy("public")}
            >
              <Category name={"Public"} Icon="Globe" selected={privacy === "public" ? true : false} />
            </button>
            <button
              onClick={() => togglePrivacy("private")}
            >
              <Category name={"Private"} Icon="Lock" selected={privacy === "private" ? true : false} />
            </button>
          </div>
          <div className="flex flex-row gap-6">
            <button
              onClick={() => togglePosition("owner")}
            >
              <Category name={"Owner"} Icon="Award" selected={position === "owner" ? true : false} />
            </button>
            <button
              onClick={() => togglePosition("shared")}
            >
              <Category name={"Shared"} Icon="Share2" selected={position === "shared" ? true : false} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}