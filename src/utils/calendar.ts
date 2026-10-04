import { WeddingEvent } from '../types';

export function createGoogleCalendarUrl(event: WeddingEvent): string {
  // Format dates: YYYYMMDDTHHmmssZ
  let start = '20261103T183000Z';
  let end = '20261103T233000Z';

  if (event.id === 'mehndi') {
    start = '20261103T183000Z';
    end = '20261103T233000Z';
  } else if (event.id === 'barat') {
    start = '20261105T120000Z';
    end = '20261105T170000Z';
  } else if (event.id === 'walima') {
    start = '20261107T190000Z';
    end = '20261107T235900Z';
  }

  const title = encodeURIComponent(`Habib ur Rehman's Wedding — ${event.title}`);
  const details = encodeURIComponent(
    `We cordially invite you to celebrate the auspicious wedding ceremony of Habib ur Rehman (Son of Mr. & Mrs. Inayatullah) with the Daughter of Peer Mufti Muhammad Masood Ahmad Faridi.\n\nEvent: ${event.title}\nDate: ${event.fullDate}\nTime: ${event.time}\nDress Code: ${event.dressCode}\nVenue: ${event.venue}\nAddress: ${event.address}, ${event.city}`
  );
  const location = encodeURIComponent(`${event.venue}, ${event.address}, ${event.city}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}

export function downloadIcsFile(event: WeddingEvent) {
  let dtStart = '20261103T183000Z';
  let dtEnd = '20261103T233000Z';

  if (event.id === 'mehndi') {
    dtStart = '20261103T183000Z';
    dtEnd = '20261103T233000Z';
  } else if (event.id === 'barat') {
    dtStart = '20261105T120000Z';
    dtEnd = '20261105T170000Z';
  } else if (event.id === 'walima') {
    dtStart = '20261107T190000Z';
    dtEnd = '20261107T235900Z';
  }

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Habib ur Rehman Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${event.id}-2026@habibwedding.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:Habib ur Rehman — ${event.title}`,
    `DESCRIPTION:You are cordially invited to celebrate ${event.title} with the Inayatullah family. Attire: ${event.dressCode}`,
    `LOCATION:${event.venue}, ${event.address}, ${event.city}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Habib-ur-Rehman-${event.id}-invitation.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
