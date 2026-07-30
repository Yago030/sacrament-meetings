"use client";

import { deleteMeeting } from "@/lib/actions";

interface DeleteMeetingFormProps {
  id: number;
  meetingLabel: string;
}

export default function DeleteMeetingForm({ id, meetingLabel }: DeleteMeetingFormProps) {
  return (
    <form
      action={deleteMeeting}
      onSubmit={(event) => {
        if (!confirm(`Delete the ${meetingLabel} meeting? This can't be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  );
}
