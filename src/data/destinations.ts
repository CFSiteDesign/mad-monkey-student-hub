export type Destination = {
  id: string;
  title: string;
  tagline: string;
  body: string;
  video: string;
  poster: string;
};

export const destinations: Destination[] = [
  {
    id: "cambodia",
    title: "Cambodia",
    tagline: "Our one to watch",
    body: "History, culture, incredible nightlife, beautiful beaches and hidden gems most travellers haven't discovered yet. Cambodia has everything you could want from a Southeast Asia adventure, without following the same old backpacker trail. Be the one who puts it on your friends' radar.",
    video: "/videos/cambodia.mp4",
    poster: "/videos/cambodia.jpg",
  },
  {
    id: "vietnam",
    title: "Vietnam",
    tagline: "The ultimate adventure",
    body: "Ride the legendary Ha Giang Loop, cruise through Ha Long Bay, explore buzzing Hanoi and discover the charm of Hoi An. Incredible landscapes, street food, nightlife and unforgettable experiences, all in one trip.",
    video: "/videos/vietnam.mp4",
    poster: "/videos/vietnam.jpg",
  },
  {
    id: "indonesia",
    title: "Indonesia",
    tagline: "Island life at its best",
    body: "Learn to surf in Lombok, explore the Gili Islands and spend your days between beautiful beaches, island adventures and sunset hangouts. Think surf, sunshine, new friends and the kind of trip you won't want to end.",
    video: "/videos/indonesia.mp4",
    poster: "/videos/indonesia.jpg",
  },
];
