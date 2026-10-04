import React from 'react';
import { X, MapPin, ExternalLink, Car, Compass } from 'lucide-react';
import { WeddingEvent } from '../types';

interface LocationModalProps {
  event: WeddingEvent | null;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#0D0B12] border border-amber-500/30 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-900 border border-amber-500/30 flex items-center justify-center text-stone-300 hover:text-white hover:border-amber-400 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center mx-auto mb-3 text-amber-300">
            <Compass className="w-6 h-6" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-amber-400">
            Venue &amp; Travel Directions
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mt-1">
            {event.venue}
          </h3>
          <p className="font-serif text-stone-300 text-sm mt-1">
            {event.address}, {event.city}
          </p>
        </div>

        {/* Map Information Box */}
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 flex items-start gap-3">
            <Car className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-300">
              <span className="font-semibold text-amber-200 block mb-0.5 font-sans uppercase tracking-wider">
                Valet &amp; Chauffeur Parking
              </span>
              Complimentary valet parking will be available at the main entrance gate. Please mention
              the &ldquo;Habib ur Rehman Wedding&rdquo; upon arrival.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 text-xs text-stone-300">
            <span className="font-semibold text-stone-200 block mb-1 font-sans uppercase tracking-wider">
              Accessibility &amp; Arrival
            </span>
            Conveniently located at {event.venue}, {event.city} with ample guest parking and effortless highway and bypass access.
          </div>
        </div>

        {/* External Map Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={event.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-950 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 hover:from-white hover:to-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all"
          >
            <MapPin className="w-4 h-4 text-amber-950" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={`https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(
              `${event.venue}, ${event.address}, ${event.city}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs font-medium uppercase tracking-wider text-stone-200 bg-stone-900 hover:bg-stone-800 border border-amber-500/25 transition-all"
          >
            <span>Request Ride</span>
          </a>
        </div>
      </div>
    </div>
  );
};
