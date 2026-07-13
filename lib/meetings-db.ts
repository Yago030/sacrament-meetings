import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-01-04",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Williams",
    wardBusiness: [
      { description: "Sustaining of new Primary president" }
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "In Remembrance of Thy Suffering"
    },
    speakers: [
      {
        name: "Sister Brown",
        topic: "Faith in Jesus Christ",
        type: "speaker"
      },
      {
        name: "Ward Choir",
        topic: "",
        type: "musical-number"
      }
    ],
    closingHymn: {
      number: 31,
      title: "O God, Our Help in Ages Past"
    },
    closingPrayer: "Brother Davis",
    announcements: [
      "Ward temple night: January 10"
    ]
  },
  {
    id: 2,
    date: "2026-01-11",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Anderson",
    openingHymn: {
      number: 19,
      title: "We Thank Thee, O God, for a Prophet"
    },
    openingPrayer: "Brother Taylor",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 174,
      title: "While of These Emblems We Partake"
    },
    speakers: [],
    closingHymn: {
      number: 134,
      title: "I Believe in Christ"
    },
    closingPrayer: "Sister Green",
    announcements: [
      "Fast offering collection after meetings"
    ]
  },
  {
    id: 3,
    date: "2026-01-18",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother White",
    openingHymn: {
      number: 66,
      title: "Rejoice, the Lord Is King!"
    },
    openingPrayer: "Sister Young",
    wardBusiness: [
      {
        description: "Missionary farewell announcement"
      }
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 181,
      title: "Jesus of Nazareth, Savior and King"
    },
    speakers: [
      {
        name: "Brother Miller",
        topic: "Repentance",
        type: "speaker"
      },
      {
        name: "Sister Wilson",
        topic: "Forgiveness",
        type: "speaker"
      }
    ],
    closingHymn: {
      number: 136,
      title: "I Know That My Redeemer Lives"
    },
    closingPrayer: "Brother Moore",
    announcements: [
      "Youth activity Friday at 7 PM"
    ]
  },
  {
    id: 4,
    date: "2026-01-25",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Clark",
    openingHymn: {
      number: 100,
      title: "Nearer, My God, to Thee"
    },
    openingPrayer: "Sister Hall",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 172,
      title: "In Humility, Our Savior"
    },
    speakers: [
      {
        name: "Brother Walker",
        topic: "Temple Worship",
        type: "speaker"
      },
      {
        name: "Primary Children",
        topic: "",
        type: "musical-number"
      }
    ],
    closingHymn: {
      number: 85,
      title: "How Firm a Foundation"
    },
    closingPrayer: "Brother King",
    announcements: [
      "Temple recommend interviews next Sunday"
    ]
  },
  {
    id: 5,
    date: "2026-02-01",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Lewis",
    openingHymn: {
      number: 84,
      title: "Faith of Our Fathers"
    },
    openingPrayer: "Brother Scott",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 173,
      title: "While of These Emblems We Partake"
    },
    speakers: [],
    closingHymn: {
      number: 152,
      title: "God Be with You Till We Meet Again"
    },
    closingPrayer: "Sister Adams",
    announcements: [
      "Ward fast this weekend"
    ]
  },
  {
    id: 6,
    date: "2026-12-08",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Evans",
    openingHymn: {
      number: 223,
      title: "Have I Done Any Good?"
    },
    openingPrayer: "Brother Carter",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 170,
      title: "God, Our Father, Hear Us Pray"
    },
    speakers: [
      {
        name: "Sister Baker",
        topic: "Service",
        type: "speaker"
      },
      {
        name: "Brother Harris",
        topic: "Charity",
        type: "speaker"
      }
    ],
    closingHymn: {
      number: 219,
      title: "Because I Have Been Given Much"
    },
    closingPrayer: "Brother Nelson",
    announcements: [
      "Service project Saturday morning"
    ]
  },
  {
    id: 7,
    date: "2026-02-15",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Young",
    openingHymn: {
      number: 124,
      title: "Be Still, My Soul"
    },
    openingPrayer: "Sister Morgan",
    wardBusiness: [
      {
        description: "Missionary homecoming"
      }
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 175,
      title: "O God, the Eternal Father"
    },
    speakers: [
      {
        name: "Brother Allen",
        topic: "Hope",
        type: "speaker"
      }
    ],
    closingHymn: {
      number: 241,
      title: "Count Your Blessings"
    },
    closingPrayer: "Brother Perez",
    announcements: [
      "Ward conference next week"
    ]
  },
  {
    id: 8,
    date: "2026-08-22",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Roberts",
    openingHymn: {
      number: 193,
      title: "I Stand All Amazed"
    },
    openingPrayer: "Brother Cooper",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 183,
      title: "In Remembrance"
    },
    speakers: [
      {
        name: "Stake President Johnson",
        topic: "Covenant Keeping",
        type: "speaker"
      }
    ],
    closingHymn: {
      number: 88,
      title: "Great Is Thy Faithfulness"
    },
    closingPrayer: "Brother Reed",
    announcements: [
      "Stake youth conference registration"
    ]
  },
  {
    id: 9,
    date: "2026-07-01",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Flores",
    openingHymn: {
      number: 27,
      title: "Praise to the Man"
    },
    openingPrayer: "Sister Howard",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 171,
      title: "With Humble Heart"
    },
    speakers: [],
    closingHymn: {
      number: 156,
      title: "Sing We Now at Parting"
    },
    closingPrayer: "Brother Bell",
    announcements: [
      "Missionary preparation class Tuesday"
    ]
  },
  {
    id: 10,
    date: "2026-08-08",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Mitchell",
    openingHymn: {
      number: 300,
      title: "Families Can Be Together Forever"
    },
    openingPrayer: "Sister Cox",
    wardBusiness: [
      {
        description: "New ministering assignments announced"
      }
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 190,
      title: "In Memory of the Crucified"
    },
    speakers: [
      {
        name: "Sister Nelson",
        topic: "The Eternal Family",
        type: "speaker"
      },
      {
        name: "Youth Quartet",
        topic: "",
        type: "musical-number"
      }
    ],
    closingHymn: {
      number: 301,
      title: "I Am a Child of God"
    },
    closingPrayer: "Brother Phillips",
    announcements: [
      "Family history workshop next Saturday"
    ]
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((m) => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}