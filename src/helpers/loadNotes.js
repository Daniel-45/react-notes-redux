import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) => {
   const notesSnapshot = await db.collection(`${uid}/journal/notes`).get();
   const notes = [];
   notesSnapshot.forEach(snapshotChildren => {
       notes.push({
           id: snapshotChildren.id,
           ...snapshotChildren.data()
        });
   });
   return notes;
}