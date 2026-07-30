"use client";

import { useState } from "react";
import { useActionState } from "react";
import type { MeetingFormState } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingFormProps {
  meeting?: SacramentMeeting;
  action: (state: MeetingFormState, formData: FormData) => Promise<MeetingFormState>;
  submitLabel: string;
}

interface SpeakerRow {
  key: string;
  name: string;
  topic: string;
  type: "speaker" | "musical-number";
}

const initialState: MeetingFormState = {};

const inputClasses =
  "w-full rounded-md border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary";
const labelClasses = "block text-sm font-medium";

function FieldErrors({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" className="mt-1 min-h-[1.25rem] text-sm text-red-600">
      {errors?.map((message) => (
        <p key={message}>{message}</p>
      ))}
    </div>
  );
}

export default function MeetingForm({ meeting, action, submitLabel }: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  const [speakerRows, setSpeakerRows] = useState<SpeakerRow[]>(() =>
    meeting && meeting.speakers.length > 0
      ? meeting.speakers.map((speaker, index) => ({
          key: `existing-${index}`,
          name: speaker.name,
          topic: speaker.topic,
          type: speaker.type,
        }))
      : [{ key: "row-0", name: "", topic: "", type: "speaker" }]
  );

  function addSpeakerRow() {
    setSpeakerRows((rows) => [
      ...rows,
      { key: `row-${Date.now()}`, name: "", topic: "", type: "speaker" },
    ]);
  }

  function removeSpeakerRow(key: string) {
    setSpeakerRows((rows) => (rows.length > 1 ? rows.filter((row) => row.key !== key) : rows));
  }

  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-8" noValidate>
      {state.message && (
        <p
          role="alert"
          className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className={labelClasses}>
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={meeting?.date}
            aria-describedby="date-error"
            aria-invalid={Boolean(errors.date?.length)}
            className={inputClasses}
          />
          <FieldErrors id="date-error" errors={errors.date} />
        </div>

        <div>
          <label htmlFor="meetingType" className={labelClasses}>
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={meeting?.meetingType ?? "regular"}
            aria-describedby="meetingType-error"
            aria-invalid={Boolean(errors.meetingType?.length)}
            className={inputClasses}
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <FieldErrors id="meetingType-error" errors={errors.meetingType} />
        </div>

        <div>
          <label htmlFor="presiding" className={labelClasses}>
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
            defaultValue={meeting?.presiding}
            aria-describedby="presiding-error"
            aria-invalid={Boolean(errors.presiding?.length)}
            className={inputClasses}
          />
          <FieldErrors id="presiding-error" errors={errors.presiding} />
        </div>

        <div>
          <label htmlFor="conducting" className={labelClasses}>
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
            defaultValue={meeting?.conducting}
            aria-describedby="conducting-error"
            aria-invalid={Boolean(errors.conducting?.length)}
            className={inputClasses}
          />
          <FieldErrors id="conducting-error" errors={errors.conducting} />
        </div>
      </section>

      <section>
        <label htmlFor="announcements" className={labelClasses}>
          Announcements
        </label>
        <p className="mb-1 text-sm text-muted">One announcement per line.</p>
        <textarea
          id="announcements"
          name="announcements"
          rows={3}
          defaultValue={meeting?.announcements?.join("\n")}
          aria-describedby="announcements-error"
          className={inputClasses}
        />
        <FieldErrors id="announcements-error" errors={errors.announcements} />
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="openingHymnNumber" className={labelClasses}>
            Opening Hymn Number
          </label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            min="1"
            defaultValue={meeting?.openingHymn.number}
            aria-describedby="openingHymnNumber-error"
            aria-invalid={Boolean(errors.openingHymnNumber?.length)}
            className={inputClasses}
          />
          <FieldErrors id="openingHymnNumber-error" errors={errors.openingHymnNumber} />
        </div>

        <div>
          <label htmlFor="openingHymnTitle" className={labelClasses}>
            Opening Hymn Title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            type="text"
            defaultValue={meeting?.openingHymn.title}
            aria-describedby="openingHymnTitle-error"
            aria-invalid={Boolean(errors.openingHymnTitle?.length)}
            className={inputClasses}
          />
          <FieldErrors id="openingHymnTitle-error" errors={errors.openingHymnTitle} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="openingPrayer" className={labelClasses}>
            Opening Prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            type="text"
            defaultValue={meeting?.openingPrayer}
            aria-describedby="openingPrayer-error"
            aria-invalid={Boolean(errors.openingPrayer?.length)}
            className={inputClasses}
          />
          <FieldErrors id="openingPrayer-error" errors={errors.openingPrayer} />
        </div>
      </section>

      <section>
        <label htmlFor="wardBusiness" className={labelClasses}>
          Ward Business
        </label>
        <p className="mb-1 text-sm text-muted">One item per line.</p>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          rows={3}
          defaultValue={meeting?.wardBusiness.map((item) => item.description).join("\n")}
          aria-describedby="wardBusiness-error"
          className={inputClasses}
        />
        <FieldErrors id="wardBusiness-error" errors={errors.wardBusiness} />

        <div className="mt-3 flex items-center gap-2">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={meeting?.stakeBusiness ?? false}
            aria-describedby="stakeBusiness-error"
            className="h-4 w-4 rounded border-border"
          />
          <label htmlFor="stakeBusiness" className="text-sm font-medium">
            Includes stake business
          </label>
        </div>
        <FieldErrors id="stakeBusiness-error" errors={errors.stakeBusiness} />
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="sacramentHymnNumber" className={labelClasses}>
            Sacrament Hymn Number
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            min="1"
            defaultValue={meeting?.sacramentHymn.number}
            aria-describedby="sacramentHymnNumber-error"
            aria-invalid={Boolean(errors.sacramentHymnNumber?.length)}
            className={inputClasses}
          />
          <FieldErrors id="sacramentHymnNumber-error" errors={errors.sacramentHymnNumber} />
        </div>

        <div>
          <label htmlFor="sacramentHymnTitle" className={labelClasses}>
            Sacrament Hymn Title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            type="text"
            defaultValue={meeting?.sacramentHymn.title}
            aria-describedby="sacramentHymnTitle-error"
            aria-invalid={Boolean(errors.sacramentHymnTitle?.length)}
            className={inputClasses}
          />
          <FieldErrors id="sacramentHymnTitle-error" errors={errors.sacramentHymnTitle} />
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Speakers &amp; Musical Numbers</h3>
          <button
            type="button"
            onClick={addSpeakerRow}
            className="rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary"
          >
            + Add speaker
          </button>
        </div>

        <FieldErrors id="speakers-error" errors={errors.speakers} />

        <div className="space-y-4">
          {speakerRows.map((row, index) => (
            <div
              key={row.key}
              className="grid grid-cols-1 gap-3 rounded-md border border-border p-4 sm:grid-cols-[1fr_1fr_auto_auto]"
            >
              <div>
                <label htmlFor={`speakerName-${row.key}`} className="sr-only">
                  Speaker {index + 1} name
                </label>
                <input
                  id={`speakerName-${row.key}`}
                  name="speakerName"
                  type="text"
                  placeholder="Name"
                  defaultValue={row.name}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor={`speakerTopic-${row.key}`} className="sr-only">
                  Speaker {index + 1} topic
                </label>
                <input
                  id={`speakerTopic-${row.key}`}
                  name="speakerTopic"
                  type="text"
                  placeholder="Topic (optional)"
                  defaultValue={row.topic}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor={`speakerType-${row.key}`} className="sr-only">
                  Speaker {index + 1} type
                </label>
                <select
                  id={`speakerType-${row.key}`}
                  name="speakerType"
                  defaultValue={row.type}
                  className={inputClasses}
                >
                  <option value="speaker">Speaker</option>
                  <option value="musical-number">Musical Number</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => removeSpeakerRow(row.key)}
                disabled={speakerRows.length === 1}
                aria-label={`Remove speaker ${index + 1}`}
                className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="closingHymnNumber" className={labelClasses}>
            Closing Hymn Number
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            min="1"
            defaultValue={meeting?.closingHymn.number}
            aria-describedby="closingHymnNumber-error"
            aria-invalid={Boolean(errors.closingHymnNumber?.length)}
            className={inputClasses}
          />
          <FieldErrors id="closingHymnNumber-error" errors={errors.closingHymnNumber} />
        </div>

        <div>
          <label htmlFor="closingHymnTitle" className={labelClasses}>
            Closing Hymn Title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            type="text"
            defaultValue={meeting?.closingHymn.title}
            aria-describedby="closingHymnTitle-error"
            aria-invalid={Boolean(errors.closingHymnTitle?.length)}
            className={inputClasses}
          />
          <FieldErrors id="closingHymnTitle-error" errors={errors.closingHymnTitle} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="closingPrayer" className={labelClasses}>
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            type="text"
            defaultValue={meeting?.closingPrayer}
            aria-describedby="closingPrayer-error"
            aria-invalid={Boolean(errors.closingPrayer?.length)}
            className={inputClasses}
          />
          <FieldErrors id="closingPrayer-error" errors={errors.closingPrayer} />
        </div>
      </section>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
