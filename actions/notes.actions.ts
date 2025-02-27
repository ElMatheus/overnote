export async function getRecentsNotes(userId: string) {
  try {
    const response = await fetch(`/api/note?userId=${userId}&recent=true`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data getRecentsNotes', error);
  }
}

export async function getNotesByUserId(userId: string) {
  try {
    const response = await fetch(`/api/note?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data getNotesByUserId', error);
  }
}

export async function getNotesByUserIdFiltredCategory(userId: string, privacy: string | null, position: string | null) {
  try {
    if (privacy && position) {
      const response = await fetch(`/api/note?userId=${userId}&privacy=${privacy}&position=${position}`);
      const data = await response.json();
      return data;
    } else if (privacy) {
      const response = await fetch(`/api/note?userId=${userId}&privacy=${privacy}`);
      const data = await response.json();
      return data;
    } else if (position) {
      const response = await fetch(`/api/note?userId=${userId}&position=${position}`);
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching data getNotesByUserIdFiltredCategory', error);
  }
}

export async function getNoteById(noteId: string) {
  try {
    const response = await fetch(`/api/note/${noteId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data getNoteById', error);
  }
}

export async function updateNoteById(noteId: string, note: any, userId: string, isPrivate: boolean) {
  try {
    const response = await fetch(`/api/note/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
        updatedIdUser: userId,
        isPrivate: isPrivate,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data updateNoteById', error);
  }
}

export async function createNote(title: string | null, userId: string) {
  try {
    const response = await fetch(`/api/note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title || 'New Note',
        content: 'Write your note here...',
        userId: userId,
        isPrivate: false,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data createNote', error);
  }
}

export async function shareNote(noteId: string, email: string) {
  try {
    const response = await fetch(`/api/note/shared`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        noteId: noteId,
        userEmail: email,
        canEdit: false,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data shareNote', error);
  }
}

export async function deleteNoteById(noteId: string) {
  try {
    const response = await fetch(`/api/note/${noteId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data deleteNoteById', error);
  }
} 