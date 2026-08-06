import { supabase } from "@/lib/supabase";
import { Note, NoteInput } from "@/types/notes";
import * as burnt from "burnt";

// Get Notes
export async function getNotes(): Promise<Note[]> {
  const { data, error } = await supabase.from("tasks").select();

  if (error) {
    console.error("Error fetching tasks:", error.message);
    throw new Error(`Error fetching tasks: ${error?.message}`);
  }
  return data;
}

// Create a Note
export async function createNote({
  newNote,
  userEmail,
}: {
  newNote: NoteInput;
  userEmail: string;
}) {
  const { data, error } = await supabase
    .from("tasks")
    .insert({ ...newNote, email: userEmail })
    .select()
    .single();

  if (error) {
    throw new Error(`Error adding note: ${error?.message}`);
  }

  return data;
}

// Delete a Note
export async function deleteNote(id: number) {
  if (!id) {
    burnt.toast({ title: "No id detected", preset: "error" });
    return;
  }

  const { data, error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    throw new Error(`Error deleting note: ${error?.message}`);
  }

  return data;
}

// Update a Note
export async function updateNote(note: Note) {
  const { data, error } = await supabase
    .from("tasks")
    .update(note)
    .eq("id", note?.id)
    .select();

  if (error) {
    throw new Error(`Error deleting note: ${error?.message}`);
  }

  return data;
}
