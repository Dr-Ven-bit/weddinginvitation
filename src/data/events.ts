import { WeddingEvent, GuestBlessing } from '../types';

export const weddingEvents: Record<'mehndi' | 'barat' | 'walima', WeddingEvent> = {
  mehndi: {
    id: 'mehndi',
    title: 'The Mehndi Celebration',
    arabicTitle: 'ليلة الحناء والمحبة',
    tagline: 'An evening of rhythm, henna, and radiant laughter',
    date: 'Tuesday, November 3, 2026',
    fullDate: 'Tuesday, 3rd of November 2026',
    time: '06:30 PM Onwards',
    venue: 'AR Grand Marquee',
    address: 'Depalpur Road',
    city: 'Okara, Punjab',
    dressCode: 'Shades of Mustard, Peacock Teal, Emerald Silk & Vibrant Festive Attire',
    themeDescription:
      '“As the auspicious colors of henna bloom with deep affection and the sweet rhythm of the dholak echoes through the night, may this blessed celebration mark the beginning of a lifetime filled with laughter, warmth, and everlasting love.”',
    highlights: [
      'Traditional Henna Application by Master Artists',
      'Folk Dholki Beats & Family Dance Performances',
      'Artisanal Street Food Bazaars & Spiced Kashmiri Chai',
      'Sweet Distribution & Welcome Rosewater Spritz',
    ],
    coordinates: { lat: 30.5740279, lng: 73.8278454 },
    googleMapsUrl:
      'https://www.google.com/maps/place/AR+Grand+Marquee/@30.5740279,73.8278454,17z/data=!3m1!4b1!4m6!3m5!1s0x3917f52f897679e3:0xbaf0afec3f2cf1a6!8m2!3d30.5740279!4d73.8278454!16s%2Fg%2F11pdhjty52?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D',
  },
  barat: {
    id: 'barat',
    title: 'The Royal Barat',
    arabicTitle: 'مَوْكِبُ الْعِرْسِ الْمَيْمُون',
    tagline: 'A grand royal procession of honor, union, and heartfelt prayers',
    date: 'Thursday, November 5, 2026',
    fullDate: 'Thursday, 5th of November 2026',
    time: '12:00 PM',
    venue: 'AR Grand Marquee',
    address: 'AR Grand Marquee',
    city: 'Okara / Depalpur Road',
    dressCode: 'Royal Formal / Deep Burgundy Velvet, Midnight Sherwanis & Regal Gold Lehengas',
    themeDescription:
      'A blessed new chapter begins, may Allah Almighty shower His abundant grace, granting them eternal love, peace of heart, and boundless barakah',
    highlights: [
      '12:00 PM — Grand Departure of Barat',
      '01:15 PM — Royal Reception & Rose Petal Welcome',
      '02:00 PM — Imperial Royal Feast',
      '03:45 PM — Prayers & Emotional Rukhsati Send-Off',
    ],
    coordinates: { lat: 30.5740279, lng: 73.8278454 },
    googleMapsUrl:
      'https://www.google.com/maps/place/AR+Grand+Marquee/@30.5740279,73.8278454,17z/data=!3m1!4b1!4m6!3m5!1s0x3917f52f897679e3:0xbaf0afec3f2cf1a6!8m2!3d30.5740279!4d73.8278454!16s%2Fg%2F11pdhjty52?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D',
  },
  walima: {
    id: 'walima',
    title: 'The Walima Banquet',
    arabicTitle: 'وليمة الفرح والشكر',
    tagline: 'A dinner of boundless gratitude, elegance, and lifelong memories',
    date: 'Saturday, November 7, 2026',
    fullDate: 'Saturday, 7th of November 2026',
    time: '07:00 PM',
    venue: 'Al Jannat Palace',
    address: 'AL Jannat Palace',
    city: 'Okara Bypass / Depalpur Road',
    dressCode: 'Formal Elegance / Champagne, Ivory Silk & Midnight Navy Formals',
    themeDescription:
      'May Allah bless this union, shower His boundless grace upon you, and unite your hearts in eternal love, tranquility, and barakah.',
    highlights: [
      'Champagne & Rose Mocktail Reception',
      'Live Classical Instrumental Symphony',
      'Gourmet Multi-Course Halal Royal Banquet',
      'Cake Cutting & Toast of Gratitude by the Newlyweds',
    ],
    coordinates: { lat: 30.8654182, lng: 73.5902845 },
    googleMapsUrl:
      'https://www.google.com/maps/place/AL+Jannat+Palace/@30.8654182,73.5902845,17z/data=!3m1!4b1!4m6!3m5!1s0x39180d65b33d10f3:0xe613d4572c5860fe!8m2!3d30.8654182!4d73.5902845!16s%2Fg%2F11r3lnmb7h?entry=ttu',
  },
};

export const initialBlessings: GuestBlessing[] = [
  {
    id: 'b-1',
    author: 'Tariq & Amina Al-Mansoor',
    relation: 'Paternal Uncle & Aunt',
    message:
      'May Allah subhanahu wa ta’ala illuminate your married life with tranquility (Sakinah), unconditional compassion (Mawaddah), and bountiful joy. We cannot wait to celebrate with you!',
    duaInArabic: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    date: 'October 1, 2026',
  },
  {
    id: 'b-2',
    author: 'Dr. Sameera Siddiqui',
    relation: 'Family Well-Wisher',
    message:
      'Dearest Habib & Family, seeing such a noble and blessed union come together is a true joy. May Allah fill your new home with tranquility, barakah, and warmth for all the years to come.',
    date: 'September 28, 2026',
  },
  {
    id: 'b-3',
    author: 'Hamza Farooq & Family',
    relation: 'Lifelong Friend of the Groom',
    message:
      'Habib, hearty congratulations my brother! Wishing you and your bride a lifetime of endless joy, love, and divine grace. Looking forward to celebrating this royal wedding with you in Okara!',
    date: 'September 25, 2026',
  },
];
