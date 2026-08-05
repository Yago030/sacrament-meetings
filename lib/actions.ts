"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addMeeting,
  deleteMeeting as deleteMeetingInDb,
  updateMeeting as updateMeetingInDb,
} from "./meetings-db";
import { verifySession } from "./dal";
import type { MeetingInput } from "./types";

const meetingTypeValues = ["testimony", "regular", "stake", "general"] as const;
const speakerTypeValues = ["speaker", "musical-number"] as const;

const hymnNumberSchema = z.coerce
  .number()
  .int("Hymn number must be a whole number.")
  .positive("Hymn number is required.");

const MeetingFormSchema = z.object({
  date: z.string().min(1, "Date is required."),
  meetingType: z.enum(meetingTypeValues, "Select a meeting type."),
  presiding: z.string().trim().min(1, "Presiding officer is required."),
  conducting: z.string().trim().min(1, "Conducting officer is required."),
  announcements: z.array(z.string()),
  openingHymnNumber: hymnNumberSchema,
  openingHymnTitle: z.string().trim().min(1, "Hymn title is required."),
  openingPrayer: z.string().trim().min(1, "Opening prayer is required."),
  wardBusiness: z.array(z.string()),
  stakeBusiness: z.boolean(),
  sacramentHymnNumber: hymnNumberSchema,
  sacramentHymnTitle: z.string().trim().min(1, "Hymn title is required."),
  speakers: z
    .array(
      z.object({
        name: z.string().trim().min(1, "Each speaker needs a name."),
        topic: z.string().trim(),
        type: z.enum(speakerTypeValues),
      })
    )
    .min(1, "Add at least one speaker or musical number."),
  closingHymnNumber: hymnNumberSchema,
  closingHymnTitle: z.string().trim().min(1, "Hymn title is required."),
  closingPrayer: z.string().trim().min(1, "Closing prayer is required."),
});

type MeetingFormValues = z.infer<typeof MeetingFormSchema>;

export type MeetingFormState = {
  message?: string;
  errors?: Partial<Record<keyof MeetingFormValues, string[]>>;
};

function stringField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseMeetingFormData(formData: FormData) {
  const speakerNames = formData.getAll("speakerName");
  const speakerTopics = formData.getAll("speakerTopic");
  const speakerTypes = formData.getAll("speakerType");

  return {
    date: stringField(formData, "date"),
    meetingType: stringField(formData, "meetingType"),
    presiding: stringField(formData, "presiding"),
    conducting: stringField(formData, "conducting"),
    announcements: linesToArray(stringField(formData, "announcements")),
    openingHymnNumber: stringField(formData, "openingHymnNumber"),
    openingHymnTitle: stringField(formData, "openingHymnTitle"),
    openingPrayer: stringField(formData, "openingPrayer"),
    wardBusiness: linesToArray(stringField(formData, "wardBusiness")),
    stakeBusiness: formData.get("stakeBusiness") === "on",
    sacramentHymnNumber: stringField(formData, "sacramentHymnNumber"),
    sacramentHymnTitle: stringField(formData, "sacramentHymnTitle"),
    speakers: speakerNames.map((name, index) => ({
      name: typeof name === "string" ? name : "",
      topic: typeof speakerTopics[index] === "string" ? speakerTopics[index] : "",
      type: typeof speakerTypes[index] === "string" ? speakerTypes[index] : "speaker",
    })),
    closingHymnNumber: stringField(formData, "closingHymnNumber"),
    closingHymnTitle: stringField(formData, "closingHymnTitle"),
    closingPrayer: stringField(formData, "closingPrayer"),
  };
}

function toMeetingInput(data: MeetingFormValues): MeetingInput {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: data.announcements,
    openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
    openingPrayer: data.openingPrayer,
    wardBusiness: data.wardBusiness.map((description) => ({ description })),
    stakeBusiness: data.stakeBusiness,
    sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
    speakers: data.speakers,
    closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
    closingPrayer: data.closingPrayer,
  };
}

function isUniqueDateViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "23505"
  );
}

const VALIDATION_MESSAGE = "Please fix the errors below and try again.";
const DUPLICATE_DATE_MESSAGE = "A meeting already exists on that date.";

export async function createMeeting(
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  await verifySession();

  const validated = MeetingFormSchema.safeParse(parseMeetingFormData(formData));

  if (!validated.success) {
    return {
      message: VALIDATION_MESSAGE,
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  try {
    await addMeeting(toMeetingInput(validated.data));
  } catch (error) {
    if (isUniqueDateViolation(error)) {
      return {
        message: DUPLICATE_DATE_MESSAGE,
        errors: { date: [DUPLICATE_DATE_MESSAGE] },
      };
    }

    console.error("Failed to create meeting:", error);
    throw new Error("We couldn't create the meeting. Please try again.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  await verifySession();

  const validated = MeetingFormSchema.safeParse(parseMeetingFormData(formData));

  if (!validated.success) {
    return {
      message: VALIDATION_MESSAGE,
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  let updated;

  try {
    updated = await updateMeetingInDb(id, toMeetingInput(validated.data));
  } catch (error) {
    if (isUniqueDateViolation(error)) {
      return {
        message: DUPLICATE_DATE_MESSAGE,
        errors: { date: [DUPLICATE_DATE_MESSAGE] },
      };
    }

    console.error(`Failed to update meeting ${id}:`, error);
    throw new Error("We couldn't save your changes. Please try again.");
  }

  if (!updated) {
    throw new Error("This meeting no longer exists.");
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  redirect("/meetings");
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  await verifySession();

  const id = Number(formData.get("id"));

  if (!Number.isInteger(id)) {
    throw new Error("Invalid meeting id.");
  }

  try {
    await deleteMeetingInDb(id);
  } catch (error) {
    console.error(`Failed to delete meeting ${id}:`, error);
    throw new Error("We couldn't delete this meeting. Please try again.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}
