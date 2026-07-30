import { neon } from "@neondatabase/serverless";
import type { MeetingInput, SacramentMeeting } from "./types";

const sql = neon(process.env.DATABASE_URL!);

const PAGE_SIZE = 5;

const SELECT_COLUMNS = `
  id, date::text AS date, meeting_type, presiding, conducting, announcements,
  opening_hymn, opening_prayer, ward_business, stake_business,
  sacrament_hymn, speakers, closing_hymn, closing_prayer
`;

interface MeetingRow {
  id: number;
  date: string;
  meeting_type: SacramentMeeting["meetingType"];
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: SacramentMeeting["openingHymn"];
  opening_prayer: string;
  ward_business: SacramentMeeting["wardBusiness"];
  stake_business: boolean;
  sacrament_hymn: SacramentMeeting["sacramentHymn"];
  speakers: SacramentMeeting["speakers"];
  closing_hymn: SacramentMeeting["closingHymn"];
  closing_prayer: string;
}

function mapRow(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.date,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business,
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers,
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export interface GetMeetingsParams {
  date?: string | null;
  query?: string | null;
  page?: number;
}

export interface GetMeetingsResult {
  meetings: SacramentMeeting[];
  currentPage: number;
  totalPages: number;
}

export async function getMeetings(
  params: GetMeetingsParams = {}
): Promise<GetMeetingsResult> {
  const { date, query, page } = params;

  const conditions: string[] = [];
  const values: unknown[] = [];

  if (date) {
    values.push(date);
    conditions.push(`date = $${values.length}`);
  }

  if (query) {
    values.push(`%${query}%`);
    const i = values.length;
    conditions.push(
      `(presiding ILIKE $${i} OR conducting ILIKE $${i} OR meeting_type ILIKE $${i} OR speakers::text ILIKE $${i})`
    );
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

 
  if (page === undefined) {
    const rows = (await sql.query(
      `SELECT ${SELECT_COLUMNS} FROM meetings ${whereClause} ORDER BY date ASC`,
      values
    )) as MeetingRow[];

    return {
      meetings: rows.map(mapRow),
      currentPage: 1,
      totalPages: 1,
    };
  }

  const countRows = (await sql.query(
    `SELECT COUNT(*)::int AS count FROM meetings ${whereClause}`,
    values
  )) as { count: number }[];

  const totalCount = countRows[0]?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const offset = (currentPage - 1) * PAGE_SIZE;

  const rows = (await sql.query(
    `SELECT ${SELECT_COLUMNS} FROM meetings ${whereClause} ORDER BY date ASC LIMIT $${
      values.length + 1
    } OFFSET $${values.length + 2}`,
    [...values, PAGE_SIZE, offset]
  )) as MeetingRow[];

  return {
    meetings: rows.map(mapRow),
    currentPage,
    totalPages,
  };
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = (await sql.query(
    `SELECT ${SELECT_COLUMNS} FROM meetings WHERE id = $1`,
    [id]
  )) as MeetingRow[];

  return rows[0] ? mapRow(rows[0]) : null;
}

export async function getCurrentMeeting(): Promise<SacramentMeeting | null> {
  const rows = (await sql.query(
    `SELECT ${SELECT_COLUMNS} FROM meetings WHERE date <= CURRENT_DATE ORDER BY date DESC LIMIT 1`,
    []
  )) as MeetingRow[];

  return rows[0] ? mapRow(rows[0]) : null;
}

function toValues(input: MeetingInput): unknown[] {
  return [
    input.date,
    input.meetingType,
    input.presiding,
    input.conducting,
    input.announcements ?? [],
    JSON.stringify(input.openingHymn),
    input.openingPrayer,
    JSON.stringify(input.wardBusiness),
    input.stakeBusiness,
    JSON.stringify(input.sacramentHymn),
    JSON.stringify(input.speakers),
    JSON.stringify(input.closingHymn),
    input.closingPrayer,
  ];
}

export async function addMeeting(input: MeetingInput): Promise<SacramentMeeting> {
  const rows = (await sql.query(
    `INSERT INTO meetings (
       date, meeting_type, presiding, conducting, announcements,
       opening_hymn, opening_prayer, ward_business, stake_business,
       sacrament_hymn, speakers, closing_hymn, closing_prayer
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
     RETURNING ${SELECT_COLUMNS}`,
    toValues(input)
  )) as MeetingRow[];

  return mapRow(rows[0]);
}

export async function updateMeeting(
  id: number,
  input: MeetingInput
): Promise<SacramentMeeting | null> {
  const rows = (await sql.query(
    `UPDATE meetings SET
       date = $1, meeting_type = $2, presiding = $3, conducting = $4, announcements = $5,
       opening_hymn = $6, opening_prayer = $7, ward_business = $8, stake_business = $9,
       sacrament_hymn = $10, speakers = $11, closing_hymn = $12, closing_prayer = $13
     WHERE id = $14
     RETURNING ${SELECT_COLUMNS}`,
    [...toValues(input), id]
  )) as MeetingRow[];

  return rows[0] ? mapRow(rows[0]) : null;
}

export async function deleteMeeting(id: number): Promise<void> {
  await sql.query(`DELETE FROM meetings WHERE id = $1`, [id]);
}
