# Mad Monkey Student Hub

Project name: Mad Monkey Student Hub

Build the Mad Monkey Student Hub: a landing page that recruits university students to become Mad Monkey Student Travel Ambassadors, plus an application form that saves to the database. Mad Monkey is a youth travel brand (social hostels and group adventures across Southeast Asia). It will eventually live at madmonkeyhostels.com/studenthub/. Open to university students worldwide, initial recruitment focus is the UK.

The attached image is the official Mad Monkey logo. Save it to the project and use it in the header and on the form screens.

## Brand and design
Match the existing Mad Monkey Creator Hub look:
- White background, near-black text (hsl 0 0% 8%).
- Primary: hot pink hsl(312 100% 65%). Secondary: lime hsl(70 95% 55%) with near-black text on top. Use them as bold flat blocks, highlights and buttons. No gradients on text, no glassmorphism, no blur.
- Font: Montserrat everywhere (Google Fonts). Headlines heavy (800 to 900), uppercase, tight leading, big on mobile. Body 400 to 500.
- Buttons: fully rounded pills, bold uppercase labels.
- Energetic, youthful, poster-like. Big type, chunky blocks, sticker-style emoji badges on the benefit cards. Not corporate.
- Do NOT use AI-generated or stock photos of people. Keep the hero typographic and graphic (logo, big headline, pink/lime colour blocks). The destination videos supply the real imagery.
- Mobile first: most visitors come from Instagram/TikTok on phones. 16px+ inputs so iOS doesn't zoom. No horizontal scroll at 375px.
- Respect prefers-reduced-motion. Subtle scroll reveals are fine.
- Copy rule: never introduce em dashes anywhere. Use the copy below exactly as written (it is final, approved copy). Do not add extra sections, stats, prices, testimonials or claims that are not in this brief.

## Routes
- `/` the landing page (sections below, in order).
- `/apply` the application form as its own full-screen page (it may also be embedded in an iframe on madmonkeyhostels.com later, so it must work standalone and inside an iframe).
- Every APPLY button on the landing page goes to `/apply`.
- Page title: "Mad Monkey Student Hub | Become a Student Travel Ambassador". Meta description from the hero subheading.

## Landing page

Header: Mad Monkey logo left, small "Student Hub" label, and an "APPLY NOW" pill button right. Sticky.

### SECTION 1: HERO
Heading: Become a Mad Monkey Student Travel Ambassador
Subheading: Love travel, events and bringing people together? This one's for you.
Body: Get hands-on experience with Mad Monkey, the youth travel brand bringing people together through social hostels and group adventures across Southeast Asia.
Body: Build your skills, bring your ideas to life, earn commission and unlock unreal travel perks.
Button: APPLY NOW (prominent)

### SECTION 2: WHAT'S IN IT FOR YOU?
Eyebrow: What's in it for you?
Heading: Real experience. Real rewards. Incredible adventures.
Four cards (2x2 on desktop, stacked on mobile), each with its emoji as a sticker badge:
1. 🚀 Gain real industry experience
Work directly with the Mad Monkey team on real projects in travel, marketing, events and partnerships. Develop practical skills, build your CV and get experience that goes beyond the classroom.
2. 💸 Earn commission on every booking
Turn your connections and ideas into extra income. Earn commission for every qualifying traveller you bring to Mad Monkey, whether it's a group of mates or a bigger university trip.
3. 🌏 Get 10 bookings. Earn a free trip.
Bring 10 travellers to Mad Monkey and earn your own place on a Southeast Asia adventure, on top of your commission. International flight contributions are also up for grabs for top performers.
4. 🤝 Build your network
Connect with Student Ambassadors from universities around the world. Share ideas, collaborate on projects and build connections with other students and travel industry professionals.

### SECTION 3: HOW IT WORKS
Eyebrow: How it works
Four numbered steps (big numbers 1 to 4):
1. Apply to become an ambassador
Tell us about yourself and your ideas through our short application form. ("application form" is a link to /apply)
2. Choose a trip or create your own
Pick from our ready-made Southeast Asia itineraries or work with our team to develop a bespoke trip.
You bring the people and ideas. We'll handle the bookings, logistics and travel arrangements.
3. Get guidance and connect with other ambassadors
Get regular check-ins, mentoring and marketing support from the Mad Monkey team.
Join a network of Student Ambassadors from universities around the world to share ideas, collaborate and learn from each other.
4. Earn commission and free travel
Get paid for every qualifying traveller you bring to Mad Monkey. Bring us 10 travellers and earn a free place on a Mad Monkey trip.

### SECTION 4: THE ADVENTURE
Eyebrow: The adventure
Heading: This could be your next adventure.
Intro: Think you know Southeast Asia? From hidden islands to epic road trips, these are the destinations we think should be on every student's radar.
Three VIDEO cards, in this exact order. Each card: a vertical (9:16) video, muted, autoplay, loop, playsInline, with the label and copy below or overlaid at the bottom with a dark scrim for legibility. 3 columns on desktop, horizontal swipe carousel (scroll-snap) on mobile. Pause videos that are off screen.
1. CAMBODIA: OUR ONE TO WATCH
History, culture, incredible nightlife, beautiful beaches and hidden gems most travellers haven't discovered yet. Cambodia has everything you could want from a Southeast Asia adventure, without following the same old backpacker trail. Be the one who puts it on your friends' radar.
2. VIETNAM: THE ULTIMATE ADVENTURE
Ride the legendary Ha Giang Loop, cruise through Ha Long Bay, explore buzzing Hanoi and discover the charm of Hoi An. Incredible landscapes, street food, nightlife and unforgettable experiences, all in one trip.
3. INDONESIA: ISLAND LIFE AT ITS BEST
Learn to surf in Lombok, explore the Gili Islands and spend your days between beautiful beaches, island adventures and sunset hangouts. Think surf, sunshine, new friends and the kind of trip you won't want to end.
IMPORTANT: the real videos are not in the project yet. Put the three destinations in one data file `src/data/destinations.ts` with fields id, title, tagline, body, video and poster. Use video paths `/videos/cambodia.mp4`, `/videos/vietnam.mp4`, `/videos/indonesia.mp4` and poster paths `/videos/cambodia.jpg`, `/videos/vietnam.jpg`, `/videos/indonesia.jpg` (these files will be added to /public/videos later via GitHub). Until a file exists, the card must show a good-looking fallback instead of a broken player: a solid pink or lime block with the country name huge. Handle the video error/poster error so nothing looks broken.

### SECTION 5: MID-PAGE CTA
Full-width bold colour block.
Heading: Sound like your kind of thing?
Body: You don't need previous experience. Just ideas, initiative and a willingness to get involved.
Button: APPLY NOW

### SECTION 6: WHO WE'RE LOOKING FOR
Eyebrow: Who we're looking for
Heading: Think you'd be a good fit?
Body: Are you the person who always gets everyone together? The one planning the next holiday, organising nights out or coming up with ideas for events that actually get people excited?
Body: Maybe you're studying marketing, events, business or tourism and want some real-world experience. Or maybe you're studying something completely different but love travel, meeting new people and making things happen.
Subheading: We're looking for students who:
Checklist:
- Love travel and discovering new places
- Enjoy meeting people and bringing groups together
- Have ideas for trips, events, campaigns or communities they'd love to try
- Are proactive, reliable and happy to take the initiative
- Want to gain practical experience alongside their studies
Callout: No previous experience required. You don't need a huge social media following or a background in travel. We're much more interested in your personality, enthusiasm and willingness to get involved.

### SECTION 7: FAQs
Eyebrow: FAQs
Heading: Your questions, answered.
Expandable accordion (one open at a time is fine), questions and answers exactly:
Q: Who can apply?
A: University students from anywhere in the world. No previous experience required.
Q: What will I actually be doing as a Student Ambassador?
A: That depends on your interests and ideas! You could bring together a group of friends for a trip, build a travel community at your university, organise events that get people excited about travel, create social media campaigns or help us develop new trips for students.
We'll work with you to find projects that suit your strengths and interests.
Q: What kind of support will I get?
A: You'll work directly with the Mad Monkey team, with regular check-ins, mentoring and guidance along the way. We'll provide marketing materials, trip information and booking links, and help you turn your ideas into something that actually happens.
You'll also be part of an international community of Student Ambassadors to share ideas and learn from.
Q: Is this a paid job or a volunteer opportunity?
A: This is a flexible, commission-based ambassador opportunity rather than a salaried position. You'll earn commission on qualifying bookings, with the chance to unlock free travel and other rewards.
You'll also gain practical experience working on real projects with an international travel brand.
Q: Can I use Mad Monkey as a reference on my CV?
A: Absolutely! You'll be able to include your Student Ambassador experience on your CV and LinkedIn, and we'll be happy to confirm your involvement in the programme.
For ambassadors who actively contribute and demonstrate their skills, we can also provide personalised professional references highlighting their work and achievements.
Q: Do I need a big social media following?
A: No! You can bring friends together, build communities, organise events or create campaigns. A large following isn't necessary.
Q: How do I earn commission?
A: Earn commission for each qualifying booking through your ambassador referral link or code. Rates vary by trip, and we'll explain payment and tracking before you start. Commission is only paid once the trip has passed its cancellation period, usually 30 days before departure.
Q: How can I earn a free trip?
A: Generate 10 qualifying bookings and earn a free place on an eligible Mad Monkey trip, on top of your commission. We'll explain what's included and any additional costs before you start.
Q: Can I create my own trip?
A: Yes! Promote an existing itinerary or work with our team to develop something for your audience.
Q: Do I have to organise or lead trips?
A: Not unless you want to! We handle the itineraries, bookings, payments and travel arrangements. You bring the travellers together.
Q: How much time do I need to commit?
A: It's flexible around university life, and you get out what you put in. We recommend 5-10 hours per week, but we'll discuss your availability and ideas to find an approach that works for you.
Q: What happens after I apply?
A: We'll review your application and invite shortlisted applicants for an informal chat with our team.

### SECTION 8: FINAL CTA
Heading: Got ideas? Let's hear them.
Body: Whether you're a natural organiser, a creative thinker or simply someone who loves bringing people together, we'd love to hear from you.
Button: APPLY TO BECOME A STUDENT AMBASSADOR

Footer: Mad Monkey logo, "© Mad Monkey Hostels", link to madmonkeyhostels.com (opens in new tab).

## Application form (/apply)
Same setup as the Mad Monkey Creator Hub form: a Typeform-style flow, ONE question per screen.
- Top bar: Mad Monkey logo left, "Student Hub" label right (pink). Below it "Step X of Y" with a percentage and a thin progress bar.
- Each question shows a small pink "Q1", "Q2"... label above a bold question title, red asterisk on required ones.
- Animated step transitions (fade and slide up, about 300ms).
- Bottom: "Back" outline pill button and "Continue" pink pill button (Continue disabled until the answer is valid). Enter advances on single-line inputs. On textareas, Enter makes a new line and Cmd/Ctrl+Enter continues.
- Big 48px-tall inputs, rounded-xl, 16px+ font.

Intro screen (before Q1):
Heading: Apply to Become a Mad Monkey Student Ambassador
Intro: Love travel and have ideas for getting other students exploring Southeast Asia?
Tell us a little about yourself and how you'd approach being a Mad Monkey Student Ambassador.
Button: LET'S GO

Questions:
1. Full name (required)
2. Email address (required, validate format)
3. University (required)
4. Course and year of study (required)
5. Social media handles (optional, placeholder "e.g. @yourname on Instagram or TikTok", a "Skip" is allowed)
6. Why would you like to become a Mad Monkey Student Ambassador? (required, textarea)
7. How would you get other students interested in travelling with Mad Monkey? (required, textarea)
The last step's button reads: SEND APPLICATION (shows "Sending..." while submitting).

Confirmation screen (replaces the form after success, with the logo and a check icon):
Heading: Thanks for applying!
Body: We've received your Student Ambassador application. Our team will review it and be in touch if you're shortlisted for the next stage.
Plus a "Back to Student Hub" link to /.

## Backend (Lovable Cloud)
Enable Lovable Cloud and create a table `student_ambassador_applications`:
- id uuid pk default gen_random_uuid(), created_at timestamptz default now()
- full_name text not null, email text not null (store trimmed and lowercased, unique index on lower(email)), university text not null, course_and_year text not null, social_handles text null, why_ambassador text not null, how_get_students text not null
- status text not null default 'new', source text null (store the referrer and any utm_ params from the URL), user_agent text null
RLS: enable it. Anonymous users can INSERT only. No public SELECT, UPDATE or DELETE (applicant data must never be readable from the browser).
Validation with zod on the client and length limits in the database (names 120 chars, short fields 200, long answers 3000). Add a hidden honeypot field; if it's filled, pretend success and don't insert.
Duplicate emails: rely on the unique index, catch the unique violation (23505) and show a friendly message: "This email has already been submitted." Do NOT check duplicates with a SELECT.
No email notifications yet (we'll add those later), and no admin page yet.

Please build all of this now.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b35933af-a8a4-41ed-a69e-16fc20c96d83).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
