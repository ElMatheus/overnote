import { useState } from "react";
import { shareNote, deleteNoteById } from "@/actions/notes.actions";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  user: {
    name: string;
  };
}

interface SettingsContainerProps {
  isPrivate: boolean;
  setIsPrivate: (value: boolean) => void;
  setShowSettings: (value: boolean) => void;
  users: User[];
  noteId: string;
}

export function SettingsContainer({ isPrivate, setIsPrivate, setShowSettings, users, noteId }: SettingsContainerProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleShared = async () => {
    if (username) {
      const response = await shareNote(noteId, username);
      if (response && response.status == "success") {
        setUsername("");
        window.location.reload();
      }
    }
  }

  const handleDelete = async () => {
    const response = await deleteNoteById(noteId);
    if (response && response.status == "success") {
      router.back();
    }
  }

  return (
    <div className="fixed inset-y-0 right-0 w-1/3 bg-[#1E201F] shadow-lg p-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-thin text-white">Settings</h1>
        <button onClick={() => setShowSettings(false)} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col">
        <div className="mb-2">
          <h1 className="text-white font-normal text-xl">Visibility</h1>
          <p className="text-[#9198a1] font-extralight text-base">Change the visibility of the note</p>
        </div>
        <div className="flex flex-row gap-2">
          <input type="radio" id="public" name="visibility" value="public" checked={!isPrivate} onChange={() => setIsPrivate(false)} />
          <label htmlFor="public" className="text-white font-light text-base">Public</label>
        </div>
        <div className="flex flex-row gap-2 mb-4">
          <input type="radio" id="private" name="visibility" value="private" checked={isPrivate} onChange={() => setIsPrivate(true)} />
          <label htmlFor="private" className="text-white font-light text-base">Private</label>
        </div>

        {/* Campo para adicionar usuários */}
        <div className="mt-4">
          <h1 className="text-white font-normal text-xl">Add Users</h1>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 rounded bg-gray-800 text-white w-full"
              placeholder="Enter email"
            />
            <button onClick={handleShared} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add
            </button>
          </div>
          <ul className="mt-2 text-white">
            {users && users.map((user: User) => (
              <li key={user.id} className="bg-gray-700 p-2 rounded mt-1">{user.user.name}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
}