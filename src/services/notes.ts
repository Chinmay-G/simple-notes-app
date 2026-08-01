import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

// Get Notes
export async function getNotes() {
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
  newNote: any;
  userEmail: string;
}) {
  const { data, error }: any = await supabase
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
export async function deleteNote(id: any) {
  if (!id) {
    Alert.alert("No id detected");
    return;
  }

  const { data, error }: any = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Error deleting note: ${error?.message}`);
  }

  return data;
}

// Update a Note
export async function updateNote(note: any) {
  const { data, error }: any = await supabase
    .from("tasks")
    .update(note)
    .eq("id", note?.id)
    .select();

  if (error) {
    throw new Error(`Error deleting note: ${error?.message}`);
  }

  return data;
}
