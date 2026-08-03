import { createNote, deleteNote, getNotes, updateNote } from "@/services/notes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import * as burnt from "burnt";

// Use Get Notes
export function useNotes() {
  //   const { data, isPending, isError } = useQuery({
  const data = useQuery({
    queryKey: ["todos"],
    queryFn: getNotes,
  });

  //   return {data, isPending, isError};
  return data;
}

// Use Create Note
export function useCreateNote() {
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      burnt.toast({ title: "Task Added !", preset: "done" });
    },
    onError: (err) => {
      console.error(err?.message);
    },
  });
  return addMutation;
}

// Use Update Note
export function useUpdateNote() {
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (data) => {
      burnt.toast({ title: "Note Updated !", preset: "done" });
      console.log("Updated data: ", data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => console.error(err?.message),
  });
  return updateMutation;
}

// Use Delete Note
export function useDeleteNote() {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      burnt.toast({ title: "Note Deleted !", preset: "done" });
    },
    onError: (err) => {
      console.error(err?.message);
    },
  });

  return deleteMutation;
}
