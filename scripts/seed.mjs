import { neon } from "@neondatabase/serverless";
import { meetings } from "../lib/seed-data.mjs";

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS meetings (
    id             SERIAL        PRIMARY KEY,
    date           DATE          NOT NULL UNIQUE,
    meeting_type   VARCHAR(20)   NOT NULL
                                 CHECK (meeting_type IN
                                   ('testimony','regular','stake','general','special')),
    presiding      VARCHAR(255)  NOT NULL,
    conducting     VARCHAR(255)  NOT NULL,
    announcements  TEXT[]        DEFAULT '{}',
    opening_hymn   JSONB         NOT NULL,
    opening_prayer VARCHAR(255)  NOT NULL,
    ward_business  JSONB         DEFAULT '[]',
    stake_business BOOLEAN       DEFAULT false,
    sacrament_hymn JSONB         NOT NULL,
    speakers       JSONB         DEFAULT '[]',
    closing_hymn   JSONB         NOT NULL,
    closing_prayer VARCHAR(255)  NOT NULL
  )
`;

for (const m of meetings) {
  await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business, stake_business,
      sacrament_hymn, speakers, closing_hymn, closing_prayer
    ) VALUES (
      ${m.date}, ${m.meetingType}, ${m.presiding}, ${m.conducting}, ${m.announcements ?? []},
      ${JSON.stringify(m.openingHymn)}, ${m.openingPrayer}, ${JSON.stringify(m.wardBusiness)}, ${m.stakeBusiness},
      ${JSON.stringify(m.sacramentHymn)}, ${JSON.stringify(m.speakers)}, ${JSON.stringify(m.closingHymn)}, ${m.closingPrayer}
    )
    ON CONFLICT (date) DO NOTHING
  `;
}

const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM meetings`;
console.log(`Seed complete. meetings table has ${count} rows.`);
