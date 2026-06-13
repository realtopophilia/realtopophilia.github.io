// ============================================================================
//  TOPOPHILIA — SITE CONTENT
// ----------------------------------------------------------------------------
//  This is the ONLY file you need to edit to add new writing or projects.
//  Everything on the site is generated from the lists below.
//
//  HOW TO ADD A POST:  copy an existing { ... } block, paste it at the top of
//  the list, and change the words. Keep the commas and curly braces exactly
//  where they are. Save the file and the site updates automatically.
// ============================================================================

// --- Who you are (shown in the hero + about) --------------------------------
export const site = {
  name: "Topophilia",
  meaning: "love of place",
  author: "Jason Griess",
  // One or two sentences. This is the big statement under the title.
  tagline: "Changing the shape of American cities.",
  intro:
    "I write about cities — how they’re built, who they’re built for, and how data and small tools can make them more affordable, more equitable, and more loved. Based in Pittsburgh.",
  email: "griessjason@gmail.com",
  github: "https://github.com/realtopophilia",
};

// --- WRITING -----------------------------------------------------------------
//  `kind` can be "essay" (personal writing) or "memo" (urban policy).
//  `date` is just shown as text — write it however you like.
//  `href` is where the post lives. Use "#" if it isn't published yet.
export const writing = [
  {
    kind: "essay",
    title: "What I built for the Draft — and why it should stay",
    date: "April 2026",
    summary:
      "A near-real-time civic data dashboard for Pittsburgh’s 2026 NFL Draft — what it does, what it taught me about open data, and the case for keeping civic tools running after the cameras leave.",
    tags: ["civic tech", "Pittsburgh", "open data", "tools"],
    href: "#",
    featured: true,
  },
  {
    kind: "memo",
    title: "Parking minimums are a tax on housing",
    date: "March 2026",
    summary:
      "A short policy memo on how mandatory parking requirements quietly inflate rents, and what Pittsburgh’s zoning code could do instead.",
    tags: ["zoning", "housing", "policy"],
    href: "#",
  },
  {
    kind: "essay",
    title: "On loving a place that is still becoming",
    date: "February 2026",
    summary:
      "Topophilia is the love of place. A personal essay on choosing a city, staying, and the quiet work of belonging.",
    tags: ["personal", "place", "Pittsburgh"],
    href: "#",
  },
  {
    kind: "memo",
    title: "What a transit dashboard should actually measure",
    date: "January 2026",
    summary:
      "Most public dashboards count what’s easy, not what matters. A memo on rider-centered metrics for mid-size transit systems.",
    tags: ["transit", "data", "policy"],
    href: "#",
  },
];

// --- WORK (your vibecoded products) -----------------------------------------
//  These are your real projects. `status` shows as a small label.
//  `accent` is a hue (0–360) used to tint the card — pick any number.
export const work = [
  {
    title: "Pittsburgh NFL Draft Dashboard",
    blurb:
      "A near-real-time civic data map for the 2026 Draft — live transit, traffic, parking, weather, and river conditions in one place.",
    tags: ["Next.js", "live data", "maps"],
    status: "Live",
    href: "https://topophilia-rho.vercel.app/",
    accent: 24,
  },
  {
    title: "Grove",
    blurb:
      "Pittsburgh neighborhood events, gathered from dozens of community organizations into one calendar you’d actually use.",
    tags: ["Next.js", "civic", "events"],
    status: "Live",
    href: "#",
    accent: 140,
  },
  {
    title: "PGH Now",
    blurb:
      "A glanceable real-time snapshot of the city — the pulse of Pittsburgh on a single screen.",
    tags: ["Next.js", "dashboard", "real-time"],
    status: "Beta",
    href: "#",
    accent: 200,
  },
  {
    title: "HPCC Yard Sale Map",
    blurb:
      "An interactive map for the Highland Park community yard sale — every registered address, routable in one tap.",
    tags: ["maps", "community", "static"],
    status: "Live",
    href: "https://realtopophilia.github.io/hpcc-yard-sale-map",
    accent: 320,
  },
  {
    title: "Kettlebod",
    blurb:
      "A no-nonsense kettlebell workout companion. Built for myself, shared for anyone who lifts.",
    tags: ["fitness", "app"],
    status: "Side project",
    href: "#",
    accent: 50,
  },
  {
    title: "Movie Finder",
    blurb:
      "Decide what to watch in seconds. A fast, opinionated film picker with no doom-scrolling.",
    tags: ["app", "fun"],
    status: "Side project",
    href: "#",
    accent: 270,
  },
];

// --- SILLY STUFF -------------------------------------------------------------
//  Lightweight, fun, experimental things. Keep it loose.
export const silly = [
  {
    title: "Movie Finder",
    blurb: "Roulette for indecisive movie nights.",
    href: "#",
  },
  {
    title: "Kettlebod",
    blurb: "Swings, presses, and not much else.",
    href: "#",
  },
  {
    title: "Topographic toy",
    blurb: "The thing rippling behind the title up top, set free.",
    href: "#",
  },
];
