export interface WeddingEvent {
  id: 'mehndi' | 'barat' | 'walima';
  title: string;
  arabicTitle: string;
  tagline: string;
  date: string;
  fullDate: string;
  time: string;
  venue: string;
  address: string;
  city: string;
  dressCode: string;
  themeDescription: string;
  highlights: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
}

export interface GuestBlessing {
  id: string;
  author: string;
  relation: string;
  message: string;
  duaInArabic?: string;
  date: string;
}

export interface RsvpSubmission {
  fullName: string;
  email: string;
  phone: string;
  attendingEvents: ('mehndi' | 'barat' | 'walima')[];
  guestCount: number;
  dietaryPreferences: string;
  note: string;
  submittedAt: string;
}
