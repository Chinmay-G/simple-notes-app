import { createNote, deleteNote, getNotes, updateNote } from "@/services/notes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

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
      Alert.alert("Task Added !");
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
      Alert.alert("Note Updated !");
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
      Alert.alert("Note Deleted !");
    },
    onError: (err) => {
      console.error(err?.message);
    },
  });

  return deleteMutation;
}
