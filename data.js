/* ============================================================
   Hermes Field Guide — course content
   Everything the site teaches, plus the assessment questions.
   Tailored to one user's real setup (profiles, cron jobs, etc).
   ============================================================ */

const COURSE_VERSION = "2026-09-03.1";

const META = {
  name: "Hermes Field Guide",
  tagline: "A power-user course that starts where you already are.",
  builtFor: "your setup",
};

/* Question options map straight onto module levels:
   done  -> "In your routine" (module hidden in the plan)
   topup -> "Top-up"          (only the missing-20% lessons)
   full  -> "To learn"        (every lesson, from the ground up)  */

const QUESTIONS = [
  {
    id: "q1", moduleId: "m1",
    q: "Could you explain — off the top of your head — what a profile, a session and your agent's memory each are, and how they differ?",
    hint: "Gut feel counts more than precision. If you use them daily but couldn't draw the boundaries, that's Partly.",
    options: [
      { v: "done",  label: "Yes, comfortably",  d: "I can describe each and how they relate." },
      { v: "topup", label: "Partly — I dabble", d: "I use them daily but couldn't explain the boundaries." },
      { v: "full",  label: "Not really",        d: "They blur together for me." }
    ]
  },
  {
    id: "q2", moduleId: "m2",
    q: "Beyond chatting in Discord or Telegram — do you ever drive Hermes from the terminal, the desktop app, or voice?",
    hint: "",
    options: [
      { v: "done",  label: "Yes — several of them", d: "I regularly use the terminal and/or desktop app." },
      { v: "topup", label: "A little",              d: "I've poked at the desktop app or voice, never the terminal." },
      { v: "full",  label: "Not really",            d: "I live in Discord and haven't touched the rest." }
    ]
  },
  {
    id: "q3", moduleId: "m3",
    q: "Have you ever looked inside what Hermes remembers about you — or asked it to tidy its memory?",
    hint: "Looking is as easy as asking, so most people just never think to.",
    options: [
      { v: "done",  label: "Yes — regularly", d: "I've read my agent's memory and had it audited before." },
      { v: "topup", label: "Vaguely",         d: "I know it remembers things; I've never looked inside." },
      { v: "full",  label: "No idea",         d: "I don't really know what it keeps or how." }
    ]
  },
  {
    id: "q4", moduleId: "m4",
    q: "Have you ever browsed your skill library, installed a new skill, or asked Hermes to write you one?",
    hint: "Your agent has hundreds of skills — the question is whether you've ever driven them yourself.",
    options: [
      { v: "done",  label: "Yes — I drive them",   d: "I browse, install, and have had custom skills written for me." },
      { v: "topup", label: "I've seen them",       d: "I know they exist and get used; I've never managed them." },
      { v: "full",  label: "Not really",           d: "They're a black box to me." }
    ]
  },
  {
    id: "q5", moduleId: "m5",
    q: "Do you create, pause and edit your scheduled jobs yourself — or split big jobs across parallel workers?",
    hint: "You have jobs running (the evening export, the morning read) — but were they set up by you or for you?",
    options: [
      { v: "done",  label: "Yes — I run them",     d: "I create and manage jobs in plain chat, and use parallel workers." },
      { v: "topup", label: "They run, not me",     d: "Jobs exist and fire on schedule; I've never steered one myself." },
      { v: "full",  label: "Not really",           d: "Automation is something my agent does, not something I drive." }
    ]
  },
  {
    id: "q6", moduleId: "m6",
    q: "Do you know what Hermes is allowed to do on its own — and what stops to ask you first, and why?",
    hint: "",
    options: [
      { v: "done",  label: "Yes — the rails",      d: "I understand approvals, what's auto-allowed, and what never runs." },
      { v: "topup", label: "Partly",               d: "I've seen approval buttons and wondered what they mean." },
      { v: "full",  label: "Not really",           d: "I trust it works; I don't know where the lines are." }
    ]
  }
];

/* Default answers, pre-filled from what we know about the user.
   He can change any of them on the assessment screen. */
const DEFAULT_ANSWERS = { q1: "topup", q2: "full", q3: "topup", q4: "full", q5: "topup", q6: "topup" };

const MODULES = [
  {
    id: "m1", num: 1, title: "Know the machine",
    label: "The map",
    sub: "The five pieces every Hermes is made of — and where they live on your Mac.",
    whyFull: "You use Hermes daily, but a power user understands the machine behind the chat. This module gives you a clean mental model: what a profile is, what a session is, what memory and skills actually are — so that when something feels off, you know which drawer to open.",
    whyTop: "You clearly know your way around already. This module is a quick map so the rest of the course has landmarks. Skim the pieces you recognise, and keep the ones that make you pause.",
    mins: "12–20 min"
  },
  {
    id: "m2", num: 2, title: "Other ways in",
    label: "CLI, desktop & voice",
    sub: "The terminal, the desktop app, and voice — three doors into the same agent.",
    whyFull: "You live in Discord, which is great — but you're using one of four doors into your own agent. This module walks you through the handful of terminal commands worth knowing (even for a non-terminal person), what the desktop app is really for, and what voice can do beyond what you've already set up.",
    whyTop: "You've poked at the desktop app or voice. This module fills the gaps: the five terminal commands that matter, the new multi-machine desktop feature you asked about recently, and voice capabilities you may not have touched.",
    mins: "20–30 min"
  },
  {
    id: "m3", num: 3, title: "Inside the memory",
    label: "Memory",
    sub: "What your agent remembers, how to tidy it, and how to find anything you've ever said.",
    whyFull: "Your agent keeps two small, deliberately-limited files of permanent notes about you and its world, injected into every conversation. This module shows you what's in there, what belongs in memory versus session history, and how to keep it sharp.",
    whyTop: "Your agent's memory is nearly full — and that's exactly the situation this module fixes. You'll learn how an audit works, what's worth keeping, and how to search the full archive of every conversation you've ever had.",
    mins: "15–25 min"
  },
  {
    id: "m4", num: 4, title: "Skills: teach once, use forever",
    label: "Skills",
    sub: "You have hundreds of skills. You've never really driven them.",
    whyFull: "Skills are written procedures your agent follows — TradeMe listings, golf gear research, fantasy drafts. Most of yours were installed for you. This module hands you the wheel: what they are, how to browse your library, how to install new ones safely, and — the real prize — how to create your own in plain language, no code.",
    whyTop: "You know skills exist and get used. Now learn to browse your library like a toolbox, install deliberately, and create your own with the /learn trick — the move that separates power users from the rest.",
    mins: "25–35 min"
  },
  {
    id: "m5", num: 5, title: "Automation: make it run itself",
    label: "Automation",
    sub: "Scheduled jobs you steer yourself, plus parallel workers for the big jobs.",
    whyFull: "Your agent already runs scheduled jobs for you — the evening Discord export, the morning read. This module takes you from passenger to driver: creating jobs in plain chat, understanding how they actually run, and splitting one big job across parallel workers that work while you sleep.",
    whyTop: "You have working automations — now take the wheel. Learn to see, pause, edit and create jobs yourself in plain chat, then meet delegation: fanning one big job out across several workers at once.",
    mins: "25–35 min"
  },
  {
    id: "m6", num: 6, title: "Keys & upkeep",
    label: "Security",
    sub: "The safety rails, who can talk to your agent, and three housekeeping habits.",
    whyFull: "A power user knows the rails: what Hermes does on its own, what stops and asks first, and why. Plus the small monthly habits that prevent most “things feel weird” moments in a long-running setup.",
    whyTop: "You've seen approval buttons and wondered. This module explains the rails properly — and gives you the upkeep routine that keeps an always-on setup healthy.",
    mins: "15–25 min"
  }
];

const LESSONS = {
  /* ---------------- Module 1 ---------------- */
  "m1-l1": {
    id: "m1-l1", moduleId: "m1", n: 1,
    title: "The five pieces of every Hermes",
    mins: "6 min", tag: "core",
    modes: ["full", "topup"],
    summary: "Name the five pieces — gateway, profile, session, memory, skill — and every feature is just “which piece does this change?”.",
    blocks: [
      { h: "Every Hermes is the same five pieces" },
      { p: "Every agent you talk to — this one on your Mac, Marco on his travel profile, any bot anywhere — is made of the same five pieces. Once you can name them, everything else in this course is just “which piece does this change?”." },
      { ul: [
        "**Gateway** — the engine that stays running and connects Hermes to the outside world: Discord, Telegram, voice. Yours runs as a background service on your Mac that starts itself when you log in. If your chats stop answering, the gateway is the first thing to check.",
        "**Profile** — one isolated agent identity with its own memory, skills and chats. You have a few: the default one you're talking to now, and Marco, your travel agent. They don't share memories unless that's set up on purpose.",
        "**Session** — one conversation thread. Every chat you've had is a session. Sessions can be paused, resumed, searched, or started fresh. Memory spans across sessions; a session is just one conversation.",
        "**Memory** — the small permanent notes your agent keeps about you and its world. Two tiny files, injected at the start of every session like a briefing note.",
        "**Skills** — instruction sheets the agent loads only when a job needs them. “How to list on TradeMe”, “how to check golf club specs” — written procedures so the job comes out right every time."
      ] },
      { callout: { t: "why", label: "Why bother naming them?", text: "Because troubleshooting becomes trivial. “It forgot something” → that's memory. “It doesn't remember this chat” → that's a session. “It did the job wrong” → that's a missing or stale skill. When something feels off, you'll know which drawer to open." } },
      { p: "One way to keep it straight: **memory is the long game, sessions are individual conversations, and skills are the how-to manuals.**" }
    ],
    ex: {
      p: "Quick self-check — no typing needed. For each situation, name the piece involved. If you hesitate on any, that's the one to watch as you go through the course.",
      steps: [
        "Your agent remembers you prefer light mode and that Tony is your boss → which piece? (Memory)",
        "You ask to find the chat where you built the travel itinerary PDF → which piece? (Session history)",
        "Marco doesn't know anything you've told your default agent → why? (Separate profiles)",
        "The agent suddenly knows how to draft a proper TradeMe listing → which piece did it just load? (A skill)"
      ],
      note: "You don't have to be right — the point is noticing which answers feel automatic."
    },
    docs: [{ label: "Docs: memory system", url: "https://hermes-agent.nousresearch.com/docs/user-guide/features/memory" }]
  },

  "m1-l2": {
    id: "m1-l2", moduleId: "m1", n: 2,
    title: "Where things actually live on your Mac",
    mins: "6 min", tag: "new",
    modes: ["full"],
    summary: "The drawer-by-drawer tour of ~/.hermes — because that's where you go when something breaks.",
    blocks: [
      { p: "Power users know where the files are, because that's where you look when something breaks or when you want to peek under the bonnet. Everything for your main agent lives in one folder: `~/.hermes` (a hidden folder in your home directory)." },
      { h: "The drawer-by-drawer tour" },
      { ul: [
        "`config.yaml` — the settings file: model, provider, platforms, approvals, cron defaults. You rarely edit it by hand — commands like `hermes model` change it for you — but it's where the answers live.",
        "`memories/` — the two memory files as plain text: MEMORY.md (agent notes) and USER.md (about you). You can open and read these any time.",
        "`skills/` — every skill you own, one folder each with its SKILL.md inside. Hundreds by now, organised into categories.",
        "`cron/jobs.json` — your scheduled jobs (evening export+review, morning read) as readable text.",
        "`state.db` — the database of every past session, full-text searchable.",
        "`.env` — secrets: API keys and passwords. Never pasted into chats, never committed to git."
      ] },
      { code: "open ~/.hermes    # in Terminal; or in Finder press Cmd+Shift+G and paste the path" },
      { callout: { t: "example", label: "From your setup", text: "You're running more than one Hermes home: Marco has his own separate folder, because each profile gets its own home. That's why he can't see your chats — and why that's a good thing." } },
      { callout: { t: "careful", label: "Never share secrets", text: "If anything ever asks you to paste an API key or password into a chat — even your own agent — stop. Secrets belong in `.env` and your keychain. Say “wire it up the proper way” and it will be." } }
    ],
    ex: {
      p: "The tour, live. Two minutes, no risk:",
      steps: [
        "In Terminal, type `open ~/.hermes` and press Return — Finder opens the folder.",
        "Look at the folder names: memories, skills, cron. That's the whole machine, visible.",
        "Open memories and read USER.md — that's what your agent knows about you."
      ],
      note: "Reading is always safe. Nothing here can break from looking."
    },
    docs: [{ label: "Docs: which file does what", url: "https://hermes-agent.nousresearch.com/docs/user-guide/which-file-does-what" }]
  },

  "m1-l3": {
    id: "m1-l3", moduleId: "m1", n: 3,
    title: "Sessions: conversations you can actually manage",
    mins: "5 min", tag: "core",
    modes: ["full", "topup"],
    summary: "Start fresh on purpose, resume when it matters, and search the full archive of anything you've ever said.",
    blocks: [
      { p: "Most people treat each chat as throwaway. A power user treats sessions as a library — and knows three moves:" },
      { ul: [
        "**Start fresh on purpose.** New topic, new session — it keeps context clean and the agent sharper. In any chat, `/new` clears the thread and starts one. Nothing is lost; the old session stays searchable.",
        "**Resume when it matters.** Multi-day jobs are one long session. The agent keeps working across replies in the same thread, and `hermes --continue` in the terminal reopens your last session.",
        "**Search everything.** Every session you've ever had is stored and searchable. Ask “when did we first set up the Lazarus dashboard?” and the agent can scroll back to the actual conversation and answer with receipts."
      ] },
      { callout: { t: "why", label: "Memory vs sessions", text: "Your agent's memory holds only a couple of kilobytes of permanent notes. Sessions hold everything. The trick power users know: **memory is for the highlights, sessions are the full archive** — and the archive is always searchable." } },
      { p: "You've seen this in action: when the agent hands you an `@session:...` link, it's pointing at the exact past conversation. Knowing it exists means you can ask for it on purpose — “find the chat where we…” — instead of hoping it comes up." }
    ],
    ex: {
      p: "Make the archive real to you:",
      steps: [
        "Ask: “search our past conversations for the day we built the travel itinerary PDF builder.”",
        "Look at what comes back — the actual conversation, not a summary.",
        "Tap any session link you're given and scroll — you're inside your own history."
      ],
      note: "Your agent can search its own history only — not other people's chats or things it never saw."
    },
    docs: [{ label: "Docs: sessions", url: "https://hermes-agent.nousresearch.com/docs/user-guide/sessions" }]
  },

  /* ---------------- Module 2 ---------------- */
  "m2-l1": {
    id: "m2-l1", moduleId: "m2", n: 1,
    title: "The terminal: five commands worth knowing",
    mins: "7 min", tag: "core",
    modes: ["full", "topup"],
    summary: "You don't need to live in the terminal — you need five commands you can run when something needs checking.",
    blocks: [
      { p: "The terminal (the Terminal app on your Mac — the window where you type text commands) is where the full power of Hermes lives. You don't need to become a terminal person to be a power user. You need a handful of commands you trust, mostly for when something needs checking or fixing." },
      { h: "The five to know" },
      { ul: [
        "`hermes` — start a chat right in the terminal. The same agent you talk to here.",
        "`hermes --continue` — reopen your last session and carry on where you left off.",
        "`hermes doctor` — the health check. Diagnoses your whole setup and names what's wrong. This is the first command to run when something misbehaves.",
        "`hermes update` — get the latest version. Your gateway is a background service, so after an update it needs a restart — I can do that, or you can ask.",
        "`hermes backup` — snapshot your whole setup (config, memory, skills, cron) so you can move machines or restore after a mistake."
      ] },
      { callout: { t: "why", label: "Your shortcut", text: "You never have to type these yourself — asking me “run a health check” does the same thing. The reason to know the names is so you know what to ask for, and so that when a guide says “run hermes doctor” it doesn't sound like a foreign language." } },
      { code: "hermes doctor      # health check\nhermes --version   # which version you're on" }
    ],
    ex: {
      p: "The one exercise that pays forever — two commands, two minutes:",
      steps: [
        "Open the Terminal app (Spotlight → type “Terminal”).",
        "Type `hermes doctor` and press Return. Watch it check your setup.",
        "Type `hermes --version` — good to know when you read release notes."
      ],
      note: "If Terminal feels intimidating, just ask me to run them and read you the output."
    },
    docs: [
      { label: "Docs: CLI guide", url: "https://hermes-agent.nousresearch.com/docs/user-guide/cli" },
      { label: "Docs: updating", url: "https://hermes-agent.nousresearch.com/docs/getting-started/updating" }
    ]
  },

  "m2-l2": {
    id: "m2-l2", moduleId: "m2", n: 2,
    title: "The desktop app — and the new multi-machine trick",
    mins: "7 min", tag: "core",
    modes: ["full", "topup"],
    summary: "A proper window into your agent — and the recent update that can watch several machines at once.",
    blocks: [
      { p: "The Hermes desktop app is the native Mac app: the same agent core as everywhere else, wrapped in a proper window with a file browser, cron list, skill browser and settings. It's also the surface that just gained the feature you asked about recently." },
      { h: "What changed in the desktop app (v0.21)" },
      { p: "The app can now hold **many connections at once, persistently** — this Mac, plus remote machines or Hermes Cloud instances, all remembered in one sidebar. The honest version for your setup: everything you run lives on this one MacBook, so there's nothing to connect yet. The moment you add a second machine (that beefier Mac for local models you keep weighing up) or a 24/7 cloud agent for the SEO side-hustle, you register it once under **Settings → Gateways** and both are one click away forever." },
      { h: "Worth doing in the app" },
      { ul: [
        "Browse skills and cron jobs as a visual list — much easier to scan than asking.",
        "Watch tool output stream live — see the agent work instead of just reading the result.",
        "Use **Update all instances** once more than one machine is connected.",
        "Everything stays in sync with your chat agents — same profiles, same memory, same sessions."
      ] },
      { callout: { t: "example", label: "From your setup", text: "Your gateway runs as a background service (launchd, name `ai.hermes.gateway`), so your Discord and Telegram agents keep running even with the app closed. The app is a window; the gateway is the engine. Both talk to the same agent." } }
    ],
    ex: {
      p: "Open the door you haven't used:",
      steps: [
        "Open the Hermes desktop app on your Mac.",
        "Open Settings (Cmd+,) → Gateways. Look at the Registered gateways list — that's your local machine, app-managed.",
        "Click the plug icon in the sidebar if you want to see the “connect another gateway” flow — no need to add anything yet."
      ],
      note: "No changes needed — this is a look-around, not a setup task."
    },
    docs: [
      { label: "Docs: desktop app", url: "https://hermes-agent.nousresearch.com/docs/user-guide/desktop" },
      { label: "Docs: many Hermes instances", url: "https://hermes-agent.nousresearch.com/docs/user-guide/multi-connection-desktop" }
    ]
  },

  "m2-l3": {
    id: "m2-l3", moduleId: "m2", n: 3,
    title: "Voice: past the basics",
    mins: "6 min", tag: "core",
    modes: ["full", "topup"],
    summary: "You've already got voices set up. Here's the full range of what voice mode can do.",
    blocks: [
      { p: "You've done the setup that trips most people: local speech-to-text and distinct voices (Guy on the Edge voice, Charon on the Gemini one). What's left is knowing the range of what voice can actually do." },
      { ul: [
        "**Voice chat almost anywhere** — real-time spoken conversation works beyond the terminal: in the desktop app, over Telegram, and in Discord voice channels.",
        "**Voice memos that become text** — send a voice memo and it gets transcribed and acted on, so you can dictate tasks hands-free and they land in your session history.",
        "**Voice messages as replies** — on platforms that support it, replies can come back as native voice bubbles rather than text.",
        "**Tune the delivery** — pace, tone, even instructions like “speak calmly and quietly” change how the voice reads back to you."
      ] },
      { callout: { t: "why", label: "Why bother", text: "Voice is the fastest input you have when you're driving, cooking, or mid-task — and because the transcript still lands in your session history, nothing you say is lost to the wind. It's a power input, not a toy." } }
    ],
    ex: {
      p: "Try one thing you haven't:",
      steps: [
        "Send a voice memo instead of typing your next request — watch it transcribe and act.",
        "Or ask for a reply with a tone: “read that back to me slowly, calmly.”",
        "Notice the transcript in the chat afterwards — it's part of your searchable history now."
      ],
      note: "Voice setup lives in your Hermes config — ask me to show you the current voices if you want to tweak them."
    },
    docs: [{ label: "Docs: voice mode", url: "https://hermes-agent.nousresearch.com/docs/user-guide/features/voice-mode" }]
  },

  /* ---------------- Module 3 ---------------- */
  "m3-l1": {
    id: "m3-l1", moduleId: "m3", n: 1,
    title: "Memory 101: the two files",
    mins: "7 min", tag: "new",
    modes: ["full"],
    summary: "What Hermes actually remembers — and the strict limits that keep it sharp.",
    blocks: [
      { p: "Memory isn't a transcript of everything. It's two deliberately small plain-text files, injected at the start of every session like a briefing note the agent reads before talking to you:" },
      { ul: [
        "**USER.md — about you.** Preferences, how you like things explained, the rules you've set (no tables in Discord, sign off as Ringo, no third-party mirror links). Cap: 1,375 characters — about half a page.",
        "**MEMORY.md — the agent's notes on its world.** Your setup, projects, quirks, lessons learned. Cap: 2,200 characters."
      ] },
      { p: "Those limits are the feature, not the bug. Memory that never stopped growing would dilute everything, so the agent is forced to keep only the best facts and consolidate the rest. When a new fact won't fit, the agent tidies first: merges related notes, drops stale ones, then saves." },
      { callout: { t: "why", label: "The one trick to know", text: "You can always just ask. Say “what do you remember about me?” and the agent reads out its own memory. There's no separate viewer — the memory is the briefing note, and the agent can recite it." } },
      { h: "What belongs in memory — and what doesn't" },
      { ul: [
        "**Belongs:** stable facts. Your boss is Tony. You prefer light mode. Port 5000 is taken on this Mac.",
        "**Doesn't:** task logs, one-off file paths, anything stale in a week. That lives in session history, which is searchable anyway — no need to burn memory on it."
      ] }
    ],
    ex: {
      p: "See your own memory, right now:",
      steps: [
        "Ask your agent: “what do you remember about me?”",
        "Then ask: “what notes do you keep about my setup?”",
        "Notice how compact the entries are — that's the discipline working."
      ],
      note: "Memory entries are scanned for safety before they're saved, and exact duplicates are rejected automatically."
    },
    docs: [{ label: "Docs: memory system", url: "https://hermes-agent.nousresearch.com/docs/user-guide/features/memory" }]
  },

  "m3-l2": {
    id: "m3-l2", moduleId: "m3", n: 2,
    title: "Memory hygiene: yours is at 97%",
    mins: "6 min", tag: "action",
    modes: ["full", "topup"],
    summary: "What to do when the tank is nearly full — and how a memory audit actually works.",
    blocks: [
      { p: "Right now your agent's notes sit around 97% full. That's not an emergency — it means the agent is being selective and consolidating as it goes — but it *is* the moment for a deliberate tidy, before genuinely important new facts start elbowing out older ones." },
      { h: "How an audit works" },
      { ul: [
        "The agent reads every entry in both stores and sorts them: keep as-is, shorten and merge, or remove.",
        "Obvious removals go first — anything stale, superseded, or from finished projects.",
        "Related entries get merged into one dense note (three separate golf notes become one).",
        "**You stay in control.** Nothing is deleted without coming back to you as a plain-English list to approve."
      ] },
      { callout: { t: "example", label: "From your setup", text: "Your memory holds a lot of small project notes — the A-Team naming rules, PoolPal, the 3DN league settings, travel-agent details. An audit compresses the housekeeping and leaves room for what's coming next, without losing anything you care about." } },
      { p: "A good rhythm: audit when the agent mentions memory is above 80% — or every couple of months as a habit. It takes two minutes and keeps the briefing note sharp." }
    ],
    ex: {
      p: "Do this one now — it's the highest-value two minutes in the course:",
      steps: [
        "Ask: “run a memory audit and show me what you'd keep, shorten and remove.”",
        "Read the list. Approve what makes sense; push back on anything that doesn't.",
        "Then ask “what do you remember about me now?” and see the tighter result."
      ],
      note: "An audit is read-only until you approve — nothing disappears without your say-so."
    },
    docs: [{ label: "Docs: memory system", url: "https://hermes-agent.nousresearch.com/docs/user-guide/features/memory" }]
  },

  "m3-l3": {
    id: "m3-l3", moduleId: "m3", n: 3,
    title: "Find anything you've ever said",
    mins: "5 min", tag: "core",
    modes: ["full", "topup"],
    summary: "Session search: the full archive behind your memory — every conversation, searchable.",
    blocks: [
      { p: "Memory holds the highlights. **Every conversation you've ever had is stored and searchable** — and when you need the actual detail (“how did we set up the Lazarus scoring?”, “what did we decide about the Dragon's Den API port?”), that's where the answer lives." },
      { h: "How you use it" },
      { ul: [
        "**Ask naturally:** “find the chat where we worked out my golf club specs.” The agent searches its full history and comes back with the real conversation.",
        "**Follow the links:** when it finds the session it may hand you an `@session:...` link — tap it and you're inside that old thread.",
        "**Know the boundary:** the agent searches its own history — not other people's chats, not things it never saw."
      ] },
      { callout: { t: "why", label: "The power move", text: "Most people re-explain things to their agent every few weeks. Power users say “remember when we…” and get the actual answer, with receipts. Your memory is small by design — your history isn't." } }
    ],
    ex: {
      p: "One search, and the archive becomes real:",
      steps: [
        "Pick something from months ago — a decision, a setup, a list you made.",
        "Ask: “search our past conversations for [it] and tell me what we decided.”",
        "If you get a session link, tap it and scroll the original thread."
      ],
      note: "Search returns actual messages from your history — not an AI summary of them."
    },
    docs: [{ label: "Docs: sessions", url: "https://hermes-agent.nousresearch.com/docs/user-guide/sessions" }]
  },

  /* ---------------- Module 4 ---------------- */
  "m4-l1": {
    id: "m4-l1", moduleId: "m4", n: 1,
    title: "What a skill actually is",
    mins: "6 min", tag: "new",
    modes: ["full"],
    summary: "Instruction sheets your agent follows — loaded only when needed, and reusable forever.",
    blocks: [
      { p: "A skill is a written, reusable procedure. Think of the difference between asking someone to “sell my clubs on TradeMe” and handing them your well-tested step-by-step checklist for listing, pricing and posting. Same job — but the checklist version comes out right every time." },
      { ul: [
        "**On-demand:** the agent keeps a one-line index of every skill and loads the full instructions only when a job needs them. No wasted effort, no clutter.",
        "**Every skill is a slash command:** in any chat, `/trademe-listings`, `/golf-equipment-research`, `/sleeper-fantasy-football`. Typing the name loads the skill and the agent follows its procedure.",
        "**Stackable:** you can load several at once — `/trademe-companion /trademe-listings` — and their instructions combine for one job.",
        "**Three sources:** bundled with Hermes (dozens ship by default), installed from the Skills Hub (community-made), or written for you — the most valuable kind."
      ] },
      { callout: { t: "example", label: "From your setup", text: "Every specialist thing you do — the A-Team roles, golf club checks, the TradeMe pipeline, fantasy league workflows — runs on skills or families of skills. When a job feels inconsistent, or you keep re-explaining it, that's a skill waiting to be written." } },
      { p: "One more piece: **the agent writes skills from its own experience.** After a complex job it will often offer to save the approach as a skill — that's how your library keeps growing without you lifting a finger." }
    ],
    ex: {
      p: "Meet one of yours in the flesh:",
      steps: [
        "In any chat, ask: “what skills do you have for marketplace or selling?”",
        "Pick one, say: “show me the trademe-listings skill.”",
        "Read what it contains — triggers, steps, pitfalls. That's a skill."
      ],
      note: "Skills follow one standard format (SKILL.md), so they're portable and shareable between agents."
    },
    docs: [{ label: "Docs: skills system", url: "https://hermes-agent.nousresearch.com/docs/user-guide/features/skills" }]
  },

  "m4-l2": {
    id: "m4-l2", moduleId: "m4", n: 2,
    title: "Your library — browse it like a toolbox",
    mins: "6 min", tag: "core",
    modes: ["full", "topup"],
    summary: "See everything you have, search it, and let the curator keep it healthy.",
    blocks: [
      { p: "Your agent has a large library organised into categories — finance, research, fantasy sports, marketplace, creative and more. Knowing what's on the shelf is half the power, and most people never look." },
      { h: "How to browse" },
      { ul: [
        "Ask in any chat: “what skills do you have?” — you get the whole index, grouped, and can drill into any one.",
        "Narrow it: “list your research skills” or “what do you have for golf?”",
        "Inspect before using: “show me the trademe-companion skill” — you see exactly what the agent will follow."
      ] },
      { p: "Skills also maintain themselves. A background curator tracks which skills are used, flags stale ones, and can archive what's gone cold. If a skill misbehaves, the fix is conversational: tell the agent, and it updates the skill itself with what it learned. You never edit files by hand." },
      { callout: { t: "why", label: "The power habit", text: "Once a month, ask “what skills do you have?” and read the list like a menu. You'll regularly discover you already own the answer to whatever you were about to re-explain." } }
    ],
    ex: {
      p: "Take stock of your toolbox:",
      steps: [
        "Ask: “list your skills, grouped, with a one-line description each.”",
        "Pick one you've never looked at and ask “show me that skill.”",
        "Ask: “which of my skills look stale or unused?” — that's your curator at work."
      ],
      note: "Slash commands work the same way: typing /skills list does it from the terminal."
    },
    docs: [{ label: "Docs: working with skills", url: "https://hermes-agent.nousresearch.com/docs/guides/work-with-skills" }]
  },

  "m4-l3": {
    id: "m4-l3", moduleId: "m4", n: 3,
    title: "Installing skills — and your personal rule",
    mins: "6 min", tag: "core",
    modes: ["full", "topup"],
    summary: "The Skills Hub, official vs community, and why your own rule is exactly right.",
    blocks: [
      { p: "New skills come from the **Skills Hub** — think of it as an app store for agent procedures, built on the open agentskills.io standard — plus official optional packs that ship with Hermes. In chat you can search and install with `/skills search` and `/skills install`, or simply ask your agent, which is usually easier." },
      { h: "The trust question" },
      { p: "Skills are instructions your agent will follow, so they deserve the same caution as installing software. You already run a smart personal rule: **your own agent and its team can install anything; community or third-party skills get your explicit go-ahead first.** Keep that rule — it's exactly right. When a skill comes from an untrusted source, the agent flags it and asks before loading or installing." },
      { callout: { t: "example", label: "From your setup", text: "When you want a new capability — say, a weekly watch on a specific golf club's price across NZ retailers — just say so: “set up a skill that watches the price of X.” If it needs a community skill, you'll be told where it's from and what it does, and you give the nod." } }
    ],
    ex: {
      p: "Shop for a capability, not a file:",
      steps: [
        "Think of one recurring job you wish the agent handled more consistently.",
        "Ask: “is there a skill for that? search the hub and show me what exists.”",
        "Read what comes back — you're now shopping for abilities instead of re-explaining."
      ],
      note: "Installs from the hub run security checks; a `--force` flag exists but you'll rarely need it."
    },
    docs: [{ label: "Docs: skills hub", url: "https://hermes-agent.nousresearch.com/docs/user-guide/features/skills" }]
  },

  "m4-l4": {
    id: "m4-l4", moduleId: "m4", n: 4,
    title: "Create your own skill — no code needed",
    mins: "7 min", tag: "action",
    modes: ["full", "topup"],
    summary: "The /learn trick: point at anything — a procedure, a document, a pile of notes — and it becomes a reusable skill.",
    blocks: [
      { p: "This is the move that separates power users from the other 95%. You don't write files — you describe, and the agent writes the skill. The magic word is `/learn`." },
      { h: "What /learn can do" },
      { ul: [
        "**Turn a document into knowledge:** “/learn this PDF about pool chemistry and make it a reference I can ask about” — the agent distils it into an indexed skill.",
        "**Capture a procedure you just walked through:** “/learn how we just built the itinerary PDF” — the steps get written down so next time it's automatic.",
        "**Convert a pile of notes:** pasted notes, a webpage, a folder of files — all fair game.",
        "**Fold new material into an existing skill:** re-running /learn on the same topic improves the one you have instead of duplicating it."
      ] },
      { p: "The agent writes to strict house standards — clear triggers, numbered steps, pitfalls, verification — so your custom skills end up as consistent as the professionally-shipped ones." },
      { callout: { t: "example", label: "From your world", text: "Say we spend an hour perfecting a pre-round checklist for golf days — gear, bookings, weather checks. At the end you say “save this as a skill.” Next time, “run my golf day prep” just does it. Same for the TradeMe listing flow, fantasy draft day, or the SEO weekly report." } }
    ],
    ex: {
      p: "Pick the skill you'd most want to exist, and say the words:",
      steps: [
        "Choose something you do often, or a document you keep re-reading.",
        "Say: “/learn [the thing]” — one line, plain language.",
        "When it's done, ask “what did you save?” and try triggering it by name."
      ],
      note: "Rule of thumb: if you've explained it twice, it's ready to become a skill."
    },
    docs: [{ label: "Guide: working with skills", url: "https://hermes-agent.nousresearch.com/docs/guides/work-with-skills" }]
  },

  /* ---------------- Module 5 ---------------- */
  "m5-l1": {
    id: "m5-l1", moduleId: "m5", n: 1,
    title: "Cron, from the ground up",
    mins: "7 min", tag: "new",
    modes: ["full"],
    summary: "How scheduled jobs actually work: fresh sessions, self-contained prompts, safe delivery.",
    blocks: [
      { p: "A cron job is a task your agent runs on a schedule, completely on its own. Two things make scheduled jobs behave differently from normal chats, and understanding them saves you real frustration:" },
      { ul: [
        "**Every run is a fresh session.** The job starts a brand-new agent with no memory of your chats. The prompt must be self-contained: “check on that thing” fails; “check the NZ retail sites for golf club X, note any price change, send me a summary” works.",
        "**Jobs can't ask questions.** No one is there. If something is unclear or blocked, the job reports back or fails — it never pauses waiting for input."
      ] },
      { h: "Creating one — in plain chat" },
      { p: "You don't need cron syntax. Say it in conversation: “every weekday at 7am, search for new golf club listings under $400 on TradeMe and message me anything good.” The agent handles the scheduling. Schedules understand everyday words: “every 2 hours”, “every Monday at 9am”, “in 30 minutes”." },
      { h: "Delivery and safety rails" },
      { ul: [
        "Deliver to this chat, your home channel, local files, or any configured target.",
        "Jobs get a pre-flight check: if the config is broken (bad model, missing skill, unreachable target), the job tells you once and never wastes a run.",
        "Dangerous commands inside jobs default to **deny** — a scheduled job can't run destructive things on its own."
      ] },
      { callout: { t: "why", label: "The golden rule", text: "Self-contained prompts. When a job keeps doing the wrong thing, it's almost always because the prompt assumed context the fresh session didn't have. Bake everything in." } }
    ],
    ex: {
      p: "Understand by watching one:",
      steps: [
        "Ask: “what cron jobs are scheduled right now?” — you'll see your two.",
        "Ask one job's details: “what exactly does the morning read do, and where does it deliver?”",
        "Look at the schedule and the prompt — that's a fresh-session recipe in the wild."
      ],
      note: "Jobs can also attach skills, pin their own model, or run a plain script with no agent at all."
    },
    docs: [{ label: "Docs: scheduled tasks", url: "https://hermes-agent.nousresearch.com/docs/user-guide/features/cron" }]
  },

  "m5-l2": {
    id: "m5-l2", moduleId: "m5", n: 2,
    title: "Your jobs — take the wheel",
    mins: "7 min", tag: "action",
    modes: ["full", "topup"],
    summary: "See what's scheduled, then pause, edit, trigger and create — all in plain chat.",
    blocks: [
      { p: "You already run two recurring jobs — the evening Discord export+review (23:30) and the morning read (06:00) — that were set up for you. Time to drive them yourself. Every control below works in plain chat. No config files, no syntax." },
      { ul: [
        "**See them:** “what cron jobs are scheduled?” → name, schedule, last run, status.",
        "**Pause / resume:** “pause the morning read while I'm on holiday.”",
        "**Trigger now:** “run the export job now” — fires it immediately.",
        "**Edit:** “change the morning read to 7am and deliver to Telegram instead.”",
        "**Create:** “every Sunday 8pm, summarise my fantasy league scores and send them here.”"
      ] },
      { h: "Watch the health signals" },
      { ul: [
        "Each job reports how its last run went — if one keeps failing you'll be told, and you can ask “why did that job fail?” for the reason.",
        "Delivery problems are tracked separately from run failures — worth knowing which one you're looking at.",
        "From the terminal, `hermes cron doctor` checks the whole fleet's health in one go."
      ] },
      { callout: { t: "example", label: "From your setup", text: "Your two jobs are the classic personal-automation pair: one tidies the day's output into the vault, one opens the morning with a briefing. The upgrade path is chaining them — the export's output feeding the morning read — or attaching a skill so a job follows your exact procedure." } }
    ],
    ex: {
      p: "Steer one of yours, live:",
      steps: [
        "Ask: “what cron jobs are running right now?” — read the list like a control panel.",
        "Trigger one manually: “run the morning read job now.”",
        "Create a throwaway: “send me a one-line reminder every day at 8am this week” — then pause it."
      ],
      note: "Jobs aren't permanent fixtures — they're yours to steer. Pausing and editing is the real skill."
    },
    docs: [{ label: "Docs: scheduled tasks", url: "https://hermes-agent.nousresearch.com/docs/user-guide/features/cron" }]
  },

  "m5-l3": {
    id: "m5-l3", moduleId: "m5", n: 3,
    title: "Parallel work: delegation",
    mins: "7 min", tag: "core",
    modes: ["full", "topup"],
    summary: "One big job, split across several workers at once — with you steering from the middle.",
    blocks: [
      { p: "Some jobs are one stream of thought. Others are several independent jobs wearing one coat — “research three different things and compare them” is the classic. **Delegation** is when the agent spins up separate sub-agents that work in parallel, each with its own fresh context, then gathers their results into one answer." },
      { ul: [
        "**Ask for it in plain language:** “research the cheapest flights, the best accommodation deals, and car hire for my South Island trip — delegate each to a separate worker and combine the results.”",
        "**Workers are isolated:** each has its own conversation and tools; they can't pollute each other or the main thread.",
        "**You can steer mid-flight:** spot a worker going down a rabbit hole and you can redirect or stop it while the others keep working.",
        "**Results get verified:** workers report back as claims — the main agent checks the important ones (links work, files exist) before telling you it's done."
      ] },
      { callout: { t: "example", label: "From your world", text: "Your A-Team runs on this same idea — separate named specialists, each owning their lane. Delegation is the same principle for one-off jobs: a trip plan, a product comparison, a draft campaign — fanned out across workers, then combined." } }
    ],
    ex: {
      p: "Next time, add one sentence:",
      steps: [
        "Take a multi-part request you were about to make.",
        "Add: “delegate each part to a separate worker and combine the results.”",
        "Watch it happen — then ask “how did you split that up?” to learn the pattern."
      ],
      note: "Delegation shines on research-heavy jobs; for tiny tasks it adds overhead for no gain."
    },
    docs: [
      { label: "Docs: delegation", url: "https://hermes-agent.nousresearch.com/docs/user-guide/features/delegation" },
      { label: "Guide: delegation patterns", url: "https://hermes-agent.nousresearch.com/docs/guides/delegation-patterns" }
    ]
  },

  "m5-l4": {
    id: "m5-l4", moduleId: "m5", n: 4,
    title: "Ready-made automations (blueprints)",
    mins: "5 min", tag: "core",
    modes: ["full", "topup"],
    summary: "Proven job templates you can snap in — no designing from scratch.",
    blocks: [
      { p: "Hermes ships with a catalogue of **automation blueprints** — proven job designs for common patterns: scheduled briefings, content monitoring, event triggers, multi-skill workflows. Instead of describing a job from scratch, you pick a blueprint and it sets the whole thing up for you." },
      { ul: [
        "Browse from the desktop app, the dashboard, or just ask: “show me automation blueprints for monitoring.”",
        "The catalogue covers daily briefings, competitor-news watches, price watchers, GitHub event triggers and more.",
        "One step further: **event-driven jobs** that fire when something *happens* — a GitHub push, an incoming message pattern — not just on a clock."
      ] },
      { callout: { t: "why", label: "Why bother", text: "Blueprints are the difference between “I could automate this” and “it's running.” They encode the pitfalls already solved — you get the proven version and tweak the details, rather than designing from a blank page." } }
    ],
    ex: {
      p: "Window-shop the catalogue:",
      steps: [
        "Ask: “what automation blueprints are available?”",
        "Pick one that's 80% of something you want.",
        "Say “set that up with these details” — then steer it like the previous lesson taught you."
      ],
      note: "Blueprints work from the dashboard, CLI, desktop app, or any messenger — same result."
    },
    docs: [{ label: "Guide: automation blueprints", url: "https://hermes-agent.nousresearch.com/docs/guides/automation-blueprints" }]
  },

  /* ---------------- Module 6 ---------------- */
  "m6-l1": {
    id: "m6-l1", moduleId: "m6", n: 1,
    title: "Why Hermes sometimes stops and asks",
    mins: "7 min", tag: "core",
    modes: ["full", "topup"],
    summary: "Approvals, smart mode, and the line even “allow always” can't cross.",
    blocks: [
      { p: "Hermes is built to act — but acting on your machine means running commands. Before anything risky, it checks against a danger list and behaves one of three ways:" },
      { ul: [
        "**Smart (the default):** a quick risk-check runs first. Clearly harmless commands (“list the files in this folder”) go ahead silently. Clearly dangerous ones (“delete this folder tree”) stop and ask. Anything uncertain asks you too.",
        "**When it asks, you're the boss:** approve once, allow always for that command, or refuse. “Allow always” covers that specific command — not everything forever.",
        "**The floor:** a few commands are so catastrophic — wiping the whole disk, formatting drives — that they're blocked permanently. No button, no allow-always, no override. If a legitimate job ever needs one, you run it yourself outside the agent."
      ] },
      { p: "There's also a “no prompts at all” switch (YOLO mode) that bypasses approval for a session. Power users know it exists, use it only in disposable environments, and never leave it on. Your setup keeps the safe default — including for scheduled jobs: **cron jobs can't approve dangerous commands for themselves.** They're denied automatically, which is a feature, not a bug." },
      { callout: { t: "example", label: "From your setup", text: "When a command pops an approval in Discord or the desktop app, that's the system working. Read the one-line reason; if it looks right, approve. That's the human-in-the-loop doing its job — you're the boss, and the rails make sure you stay the boss." } }
    ],
    ex: {
      p: "Know your own rails:",
      steps: [
        "Ask: “what approval mode am I running?”",
        "The healthy answer is smart — most things flow, risky things pause, catastrophic things never run.",
        "Ask: “what would stop and ask you before running?” — good to have in your head."
      ],
      note: "You can add personal deny rules too — e.g. “never git push --force, ever” — as an extra floor under YOLO."
    },
    docs: [{ label: "Docs: security model", url: "https://hermes-agent.nousresearch.com/docs/user-guide/security" }]
  },

  "m6-l2": {
    id: "m6-l2", moduleId: "m6", n: 2,
    title: "Who can talk to your agent",
    mins: "6 min", tag: "new",
    modes: ["full"],
    summary: "The doors in: pairing, allowlists, isolation — and where the secrets live.",
    blocks: [
      { p: "Your agent is always on, so it needs a front-door policy. Hermes handles it in layers:" },
      { ul: [
        "**Platform pairing:** on messaging platforms, only paired and allowed users can talk to it — that's you, plus anyone you explicitly add. A stranger's first message doesn't get through.",
        "**Gateway isolation:** the always-on engine that connects Discord and Telegram is separate from where commands actually run. A chat message can't reach your filesystem directly — tools run through the agent with approval rails on top.",
        "**Secrets:** API keys and passwords live in `~/.hermes/.env` with locked-down permissions, plus your Mac keychain — never in chats, never in skills, never in git. Optional integrations (Bitwarden, 1Password) exist if you ever want centralised secret management.",
        "**Walled-off sessions:** one conversation can't reach into another's data, and cron storage is hardened against tampering."
      ] },
      { callout: { t: "why", label: "Why this matters for you", text: "You run Hermes against your real accounts — Gmail, business stuff, a browser profile. That's exactly the setup worth protecting: these rails are what make it safe to let an always-on agent loose on your real life. If you ever connect a new platform, the pairing step is the gate." } }
    ],
    ex: {
      p: "Check your front door:",
      steps: [
        "Ask: “which platforms am I connected on, and who's allowed to talk to me?”",
        "Look for your Discord and Telegram setups — paired to you.",
        "Note where secrets live if you want: `~/.hermes/.env` — never opened in a chat."
      ],
      note: "Context files from untrusted sources are scanned for injection attempts before they're loaded — another rail you never see."
    },
    docs: [{ label: "Docs: security model", url: "https://hermes-agent.nousresearch.com/docs/user-guide/security" }]
  },

  "m6-l3": {
    id: "m6-l3", moduleId: "m6", n: 3,
    title: "Three housekeeping habits",
    mins: "6 min", tag: "core",
    modes: ["full", "topup"],
    summary: "The 10-minute monthly routine that prevents most of the “things feel weird” moments.",
    blocks: [
      { ul: [
        "**Health check when things feel off.** Run `hermes doctor` (or ask me to) — it's the agent's own MOT, covering config, providers, gateway and sessions, and it names the problem instead of leaving you guessing. Order of operations when something breaks: doctor → ask your agent → restart the gateway → update.",
        "**Update on a beat.** Hermes ships new versions often — you're on the 0.21 line with the multi-gateway desktop feature. Update when release notes mention something you want, or monthly, then restart the gateway so the running engine picks it up.",
        "**Backup before you break things.** `hermes backup` snapshots config, memory, skills and cron. Five seconds before any big change — moving machines, major config edits, an update you're nervous about."
      ] },
      { callout: { t: "example", label: "From your setup", text: "Your gateway runs as a launchd service (`ai.hermes.gateway`) and auto-starts at login — the set-and-forget part is done right. The habit to add is the monthly check: ask me to run doctor, confirm the version, and verify your jobs in one go. “Monthly health check” is the whole command." } }
    ],
    ex: {
      p: "Do the monthly check right now — it takes two minutes:",
      steps: [
        "Say: “run a health check and tell me anything that needs attention.”",
        "Ask: “what version am I on, and is an update worth doing?”",
        "Done — that's the habit. Repeat monthly, or whenever things feel off."
      ],
      note: "These three habits catch the vast majority of issues before you ever notice them."
    },
    docs: [
      { label: "Docs: updating", url: "https://hermes-agent.nousresearch.com/docs/getting-started/updating" },
      { label: "FAQ & troubleshooting", url: "https://hermes-agent.nousresearch.com/docs/reference/faq" }
    ]
  }
};

/* Level per module from answers:
   done -> in routine (hidden from plan)
   topup -> top-up lessons only
   full -> every lesson */
function moduleLevel(answers, moduleId) {
  const q = QUESTIONS.find(x => x.moduleId === moduleId);
  if (!q) return "full";
  const v = (answers && answers[q.id]) || DEFAULT_ANSWERS[q.id];
  return v || "full";
}

function visibleLessons(answers, moduleId) {
  const level = moduleLevel(answers, moduleId);
  if (level === "done") return [];
  const list = Object.values(LESSONS).filter(l => l.moduleId === moduleId);
  return list.filter(l => l.modes.includes(level)).sort((a, b) => a.n - b.n);
}

function lessonListFor(moduleId) {
  return Object.values(LESSONS).filter(l => l.moduleId === moduleId).sort((a, b) => a.n - b.n);
}
