// ── VENUE ──
export const VENUE_NAME = "Athithudar Makal Mahal"
export const VENUE_ADDRESS = "Michaelpatti, Thanjavur"
export const VENUE_PINCODE = "613104"
export const VENUE_FULL = "Athithudar Makal Mahal, Michaelpatti, Thanjavur - 613104"

// ── GOOGLE MAPS ──
// Pre-searched coordinates for Thanjavur — replace with exact pin
// after confirming on Google Maps
export const VENUE_MAP_URL = "https://www.google.com/maps/place/%E0%AE%85%E0%AE%A4%E0%AE%BF%E0%AE%A4%E0%AF%82%E0%AE%A4%E0%AE%B0%E0%AF%8D+%E0%AE%AE%E0%AE%95%E0%AF%8D%E0%AE%95%E0%AE%B3%E0%AF%8D+%E0%AE%AE%E0%AE%A9%E0%AF%8D%E0%AE%B1%E0%AE%AE%E0%AF%8D/@10.8500621,78.9676806,17z/data=!4m10!1m2!2m1!1sAthithudar+Makal+Mahal+Michaelpatti+Thanjavur+613104!3m6!1s0x3baaebc76fc48ad1:0x1782af834eb5f737!8m2!3d10.8498743!4d78.9701353!15sCjdBdGhpdGhvb3RoYXIgTWFra2FsIE1haGFsIE1pY2hhZWxwYXR0aSBUaGFuamF2dXIgNjEzMTA0WjkiN2F0aGl0aG9vdGhhciBtYWtrYWwgbWFoYWwgbWljaGFlbHBhdHRpIHRoYW5qYXZ1ciA2MTMxMDSSARBjb21tdW5pdHlfY2VudGVymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU5PWHpkRWFqTm5SUkFC4AEA-gEECAAQDw!16s%2Fg%2F11jyg8kryt?entry=ttu&g_ep=EgoyMDI2MDQyOC4wIKXMDSoASAFQAw%3D%3D"
export const VENUE_LAT = 10.8494   // update with exact lat
export const VENUE_LNG = 78.9694   // update with exact lng

// ── EVENT TIMES ──
export const MRG_TIME = "4:00 AM"
export const MRG_TIME_LABEL = "Muhurtham"       // or "The Ceremony"
export const MRG_TIME_24H = "04:00"

export const RECEPTION_TIME = "11:00 AM"
export const RECEPTION_TIME_LABEL = "Reception"
export const RECEPTION_TIME_24H = "11:00"

// ── COMBINED EVENT SCHEDULE ──
export const EVENT_SCHEDULE = [
  {
    id: "ceremony",
    label: "The Ceremony",
    sublabel: "Muhurtham",
    time: "4:00 AM",
    time24: "04:00",
    venue: VENUE_FULL,
  },
  {
    id: "reception",
    label: "The Reception",
    sublabel: "Celebrations",
    time: "11:00 AM",
    time24: "11:00",
    venue: VENUE_FULL,
  },
] as const
