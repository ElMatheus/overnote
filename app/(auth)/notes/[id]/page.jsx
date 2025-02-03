"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getNoteById, updateNoteById } from "@/actions/notes.actions";
import { ChevronLeft, Save, Settings, Bold, Italic, List, Heading } from "lucide-react";
import { getSession } from "next-auth/react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HeadingExtension from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import { SettingsContainer } from "@/components/settings-container";

export default function NotePage() {
  const router = useRouter();
  const { id } = useParams();
  const [note, setNote] = useState({ title: "", content: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [usersShared, setUsersShared] = useState([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      HeadingExtension.configure({ levels: [1, 2, 3] }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "paragraph") {
            return "Comece a escrever...";
          }
          return "";
        },
      }),
      BulletList,
      ListItem,
    ],
    content: note.content || "<p></p>",
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setNote((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    async function fetchNote() {
      if (!id) return;
      const session = await getSession();
      if (!session?.user?.id) return;
      setIdUser(session.user.id);
      const data = await getNoteById(id);
      if (data.status === "success") {
        setNote({ title: data.data.title, content: data.data.content });
        setIsPrivate(data.data.isPrivate);
        setUsersShared(data.data.SharedNote);
      }
    }
    fetchNote();
  }, [id, idUser]);

  useEffect(() => {
    if (editor && note.content) {
      editor.commands.setContent(note.content);
    }
  }, [editor, note.content]);

  useEffect(() => {
    if (!id) return;
    const handler = setTimeout(async () => {
      setIsSaving(true);
      await updateNoteById(id, { ...note, content: editor?.getHTML() }, idUser, isPrivate);
      setIsSaving(false);
    }, 1000);

    return () => clearTimeout(handler);
  }, [note, id, isPrivate, idUser, editor]);

  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <ChevronLeft onClick={() => router.back()} size={32} className="cursor-pointer" />
        <Save className={`rounded-full p-2 ${isSaving ? "bg-indigo-400" : "bg-gray-200"}`} size={45} />
        <Settings onClick={() => setShowSettings(true)} size={32} className="cursor-pointer" />
      </div>
      <div className="h-full p-6 max-w-7xl mx-auto w-full">
        <input
          type="text"
          value={note.title}
          placeholder="Adicione um título"
          className="w-full text-4xl font-bold border-none outline-none mb-4 bg-transparent"
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
        <div className="flex gap-2 mb-2">
          <button onClick={() => editor?.chain().focus().toggleBold().run()} className="p-2 border rounded">
            <Bold size={16} />
          </button>
          <button onClick={() => editor?.chain().focus().toggleItalic().run()} className="p-2 border rounded">
            <Italic size={16} />
          </button>
          <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className="p-2 border rounded">
            <Heading size={16} />
          </button>
          <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className="p-2 border rounded">
            <List size={16} />
          </button>
        </div>
        <div className="p-2 min-h-[200px] max-w-full overflow-hidden border rounded">
          <EditorContent editor={editor} className="font-normal focus:outline-none break-words" />
        </div>
      </div>

      {showSettings && (
        <SettingsContainer
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate}
          setShowSettings={setShowSettings}
          users={usersShared}
          noteId={id}
        />
      )}
    </div>
  );
}