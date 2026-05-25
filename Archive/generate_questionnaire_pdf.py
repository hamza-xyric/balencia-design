from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, black, white
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, ListFlowable, ListItem, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import re

OUTPUT_PATH = "/Users/hamza/yHealth/Balencia-UIUX-Vision-Questionnaire.pdf"

doc = SimpleDocTemplate(
    OUTPUT_PATH,
    pagesize=A4,
    rightMargin=2*cm,
    leftMargin=2*cm,
    topMargin=2*cm,
    bottomMargin=2*cm,
)

styles = getSampleStyleSheet()

# Custom styles
styles.add(ParagraphStyle(
    name='DocTitle',
    fontSize=22,
    leading=28,
    spaceAfter=6,
    textColor=HexColor('#1a1a2e'),
    fontName='Helvetica-Bold',
    alignment=TA_CENTER,
))

styles.add(ParagraphStyle(
    name='Subtitle',
    fontSize=10,
    leading=14,
    spaceAfter=4,
    textColor=HexColor('#555555'),
    fontName='Helvetica',
    alignment=TA_CENTER,
))

styles.add(ParagraphStyle(
    name='SectionHeader',
    fontSize=16,
    leading=22,
    spaceBefore=20,
    spaceAfter=10,
    textColor=HexColor('#1a1a2e'),
    fontName='Helvetica-Bold',
))

styles.add(ParagraphStyle(
    name='QuestionTitle',
    fontSize=11,
    leading=15,
    spaceBefore=14,
    spaceAfter=4,
    textColor=HexColor('#2d2d44'),
    fontName='Helvetica-Bold',
))

styles.add(ParagraphStyle(
    name='BodyText2',
    fontSize=9.5,
    leading=13,
    spaceAfter=4,
    textColor=HexColor('#333333'),
    fontName='Helvetica',
))

styles.add(ParagraphStyle(
    name='ContextNote',
    fontSize=8.5,
    leading=12,
    spaceAfter=4,
    textColor=HexColor('#666666'),
    fontName='Helvetica-Oblique',
    leftIndent=10,
    borderPadding=4,
))

styles.add(ParagraphStyle(
    name='OptionText',
    fontSize=9.5,
    leading=13,
    spaceAfter=2,
    textColor=HexColor('#333333'),
    fontName='Helvetica',
    leftIndent=14,
))

styles.add(ParagraphStyle(
    name='AnswerBox',
    fontSize=9.5,
    leading=13,
    spaceBefore=6,
    spaceAfter=10,
    textColor=HexColor('#888888'),
    fontName='Helvetica-Oblique',
    leftIndent=10,
    borderPadding=6,
))

styles.add(ParagraphStyle(
    name='TableCell',
    fontSize=8.5,
    leading=11,
    textColor=HexColor('#333333'),
    fontName='Helvetica',
))

styles.add(ParagraphStyle(
    name='TableHeader',
    fontSize=8.5,
    leading=11,
    textColor=white,
    fontName='Helvetica-Bold',
))

def escape_html(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def parse_inline(text):
    text = text.replace('**', '<b>').replace('**', '</b>')
    count = 0
    result = []
    i = 0
    bold_open = False
    while i < len(text):
        if text[i:i+2] == '**':
            if not bold_open:
                result.append('<b>')
                bold_open = True
            else:
                result.append('</b>')
                bold_open = False
            i += 2
        else:
            result.append(text[i])
            i += 1
    return ''.join(result)

def format_bold(text):
    parts = text.split('**')
    result = ''
    for i, part in enumerate(parts):
        if i % 2 == 1:
            result += f'<b>{escape_html(part)}</b>'
        else:
            result += escape_html(part)
    return result

def build_story():
    story = []

    # Title page section
    story.append(Spacer(1, 2*cm))
    story.append(Paragraph("Balencia UI/UX Vision Questionnaire", styles['DocTitle']))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="60%", thickness=1, color=HexColor('#1a1a2e'), spaceAfter=12))
    story.append(Spacer(1, 6))

    story.append(Paragraph(
        "<b>Purpose:</b> Capture every design decision before a single screen gets built. "
        "Your answers here become the source of truth for the entire UI/UX revamp.",
        styles['Subtitle']
    ))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "<b>How to use:</b> Answer each question inline below the Answer marker. "
        "If a decision is final and locked, change the status to FINAL. If unsure, mark it OPEN.",
        styles['Subtitle']
    ))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "<b>Framing:</b> Balencia is an AI Life Coach — not a health app, not a fitness tracker. "
        "It connects every part of a user’s life system (career, relationships, spirituality, finance, "
        "fitness, creativity, learning) and reveals the connections they can’t see themselves.",
        styles['Subtitle']
    ))
    story.append(Spacer(1, 12))

    # Context sources
    story.append(Paragraph("<b>Context sources referenced:</b>", styles['BodyText2']))
    for src in [
        "Direction Reset (2026-03-12) — team decisions on Life Coach identity, AI-first UX, motivation tiers",
        "Old UI/UX meeting (2026-04-23 with Salman) — preliminary design decisions, NOT binding",
        "Current codebase — 8 life domains, 60+ pages, 220+ services, deep cross-domain AI intelligence",
    ]:
        story.append(Paragraph(f"• {src}", styles['ContextNote']))

    story.append(Spacer(1, 1*cm))
    story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor('#cccccc'), spaceAfter=10))

    # --- SECTIONS ---
    sections = [
        build_section_1,
        build_section_2,
        build_section_3,
        build_section_4,
        build_section_5,
        build_section_6,
        build_section_7,
        build_section_8,
        build_section_9,
        build_section_10,
        build_section_11,
        build_section_12,
        build_section_13,
        build_section_14,
        build_section_15,
        build_section_16,
        build_section_17,
        build_section_18,
    ]

    for section_builder in sections:
        story.append(PageBreak())
        section_builder(story)

    return story


def add_section_header(story, title):
    story.append(Paragraph(title, styles['SectionHeader']))
    story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor('#1a1a2e'), spaceAfter=8))


def add_question(story, title, context=None, body=None, options=None, has_answer=True):
    story.append(Paragraph(title, styles['QuestionTitle']))
    if context:
        for c in (context if isinstance(context, list) else [context]):
            story.append(Paragraph(f"“{escape_html(c)}”", styles['ContextNote']))
    if body:
        for b in (body if isinstance(body, list) else [body]):
            story.append(Paragraph(format_bold(b), styles['BodyText2']))
    if options:
        for opt in options:
            story.append(Paragraph(f"• {format_bold(opt)}", styles['OptionText']))
    if has_answer:
        story.append(Spacer(1, 4))
        story.append(HRFlowable(width="100%", thickness=0.3, color=HexColor('#dddddd'), spaceBefore=2, spaceAfter=2))
        story.append(Paragraph("Your Answer:", styles['AnswerBox']))
        story.append(Spacer(1, 20))
        story.append(HRFlowable(width="100%", thickness=0.3, color=HexColor('#dddddd'), spaceBefore=0, spaceAfter=6))


def build_section_1(story):
    add_section_header(story, "1. Core Philosophy & Identity")

    add_question(story,
        "1.1 What is the single sentence that describes what Balencia IS?",
        context=[
            "If you are striving to improve yourself then Balencia is for you. Identity: Life Coach, not Health Coach.",
            "Balencia sees what we can't see. Balencia connects different parts of your life system together."
        ],
        body="Refine this into the one sentence a user should feel when they open the app."
    )

    add_question(story,
        '1.2 "Balencia sees what we can\'t see" — what does this mean concretely in the UI?',
        body="This is a powerful positioning statement. But what does the user actually SEE that makes them feel this?",
        options=[
            'SIA says "I noticed your spending goes up on days you skip exercise"',
            "A visual thread connecting your sleep data to your work productivity goal",
            'A weekly insight card: "3 things connected in your life this week"',
            "The Knowledge Graph showing relationships between your habits, goals, and outcomes",
        ]
    )

    add_question(story,
        "1.3 What is the emotional arc of a user's first 5 minutes?",
        body="Walk through it: they download the app, open it for the first time. What do they see, feel, and do — screen by screen. Think life system, not health assessment."
    )

    add_question(story,
        "1.4 Who is the primary user persona we're designing for?",
        context=[
            'Users range from "wanting to be a better Muslim" to "reduce screen time" to "improve marriage" to "get fit."',
            "90% of users are non-technical, don't know what features exist."
        ],
        body="Describe your primary user in 2-3 sentences: age range, tech comfort, what's going on in their life, what brought them to Balencia, what would make them leave."
    )

    add_question(story,
        "1.5 What are the 3 apps whose feel/vibe you want Balencia to channel?",
        body="Not copy — channel. The emotional quality, the polish level, the way they make you feel. Can be from any category."
    )

    add_question(story,
        "1.6 How do you describe Balencia to someone in 10 seconds?",
        body="The elevator pitch. Not a feature list — the feeling and value proposition. This shapes every design decision."
    )


def build_section_2(story):
    add_section_header(story, "2. The AI Coach (SIA) Experience")

    add_question(story,
        "2.1 What is SIA's personality in 3 adjectives?",
        context=["Brand guidelines: grounded, curious, warm, playful, quietly confident.",
                 "Tone adapts by motivation tier — gentle for low, structured for medium, challenging for high."],
        body="Is this still right? Does SIA have a distinct character beyond a generic AI assistant?"
    )

    add_question(story,
        "2.2 What does the SIA chat screen look like?",
        options=[
            "A) Full-screen chat like iMessage/WhatsApp — clean and focused",
            "B) Split view with a side panel showing relevant data",
            "C) Chat with rich inline cards (like Perplexity or Claude artifacts)",
            "D) Something else",
        ],
        body="Should SIA be able to show charts, goal progress, meal plans, financial summaries directly in the conversation?"
    )

    add_question(story,
        "2.3 How does SIA connect life domains in conversation?",
        body="This is the core differentiator. When SIA references cross-domain connections:",
        options=[
            "Does SIA proactively surface connections, or only when asked?",
            "Should there be visual indicators (colored domain tags, connection lines) in the chat?",
            "How often should SIA make cross-domain observations?",
        ]
    )

    add_question(story,
        "2.4 How does SIA deep-link into features?",
        context=["Old meeting Q2: Unresolved — How does SIA deep-link into modules?"],
        options=[
            "A) A rich card appears in chat, tapping it opens the relevant screen",
            "B) SIA navigates you to that screen directly",
            "C) SIA creates a task/action in your daily schedule",
            "D) All of the above depending on context",
        ]
    )

    add_question(story,
        "2.5 Voice interaction — how prominent?",
        context=["Salman uses voice daily with Gemini. Direction Reset mentions voice journaling as lower-friction input."],
        options=[
            "A) Prominent mic button + dedicated full-screen voice mode (like Gemini Live)",
            "B) Mic button available but voice is secondary to text",
            "C) Voice only for journaling and quick check-ins",
            "D) Voice-first: the primary way most users interact with SIA",
        ]
    )

    add_question(story,
        "2.6 Should SIA have a visual avatar/face?",
        options=[
            "A) Yes, a 3D animated avatar that speaks and reacts",
            "B) A simple animated icon/logo that pulses when SIA is thinking/speaking",
            "C) No avatar — just conversation",
            "D) Avatar for voice calls only, text chat has no avatar",
        ]
    )

    add_question(story,
        '2.7 What\'s the difference between "AI Coach" and "Chat"?',
        body='Current app has both /ai-coach and /chat. Are these separate experiences? Or should they merge into one unified SIA conversation?'
    )

    add_question(story,
        "2.8 Proactive messages from SIA — where do they appear?",
        context=["AI-first means SIA initiates. 18 proactive message types already exist in the backend."],
        options=[
            "A) As a push notification that opens SIA chat",
            "B) On the home screen as a card/banner",
            "C) Both — notification + home card",
            "D) In a separate 'insights' feed",
        ]
    )


def build_section_3(story):
    add_section_header(story, "3. Onboarding & First Experience")

    add_question(story,
        "3.1 How many screens should onboarding have?",
        context=["Old meeting: ~3 screens. Direction Reset: Registration → AI assessment → AI suggests goals → AI generates plan → user customizes.",
                 "Current app: 8-step flow."],
        body="What are the mandatory steps before a user can start using Balencia?"
    )

    add_question(story,
        "3.2 Chatbot-driven or traditional screen-based onboarding?",
        options=[
            "A) Chatbot-driven: SIA asks life questions conversationally",
            "B) Traditional: Clean selection screens with pre-built options",
            "C) Hybrid: SIA introduces each step with personality, but the UI is structured",
        ]
    )

    add_question(story,
        "3.3 What information do you absolutely need before the user can start?",
        body="Pick the minimum viable set. Which can be deferred?",
        options=[
            "Name",
            "Life areas of interest (from the 8 domains)",
            "Primary life goal (free text or pre-built)",
            "Motivation level (low/medium/high)",
            "What they've tried before",
            "Biggest obstacle",
            "Age/gender",
            "Integrations (WHOOP, Google Calendar, Spotify)",
            "Subscription plan",
        ]
    )

    add_question(story,
        "3.4 Should there be an intro video/animation from SIA?",
        context=["Hamza wanted 'a 30-second intro video to amaze the shit out of users.'"],
        options=[
            "A) A pre-recorded video showing cross-domain intelligence in action",
            "B) An animated avatar welcoming you and explaining the life system concept",
            "C) A cinematic motion sequence showing life domains connecting",
            "D) Skip it — get users into the experience faster",
        ]
    )

    add_question(story,
        "3.5 The AI assessment conversation — how deep does it go?",
        options=[
            "A) Immediately generate a plan and let them start (fast, may feel generic)",
            "B) Ask 2-3 follow-up questions per goal to personalize deeply",
            "C) Have a full 5-10 minute conversation to deeply understand the user",
            "D) Depends on motivation tier — low gets fast start, high gets deep conversation",
        ]
    )

    add_question(story,
        '3.6 How do you handle the "I just want to try it" user?',
        options=[
            "A) Force minimum onboarding (1-2 questions, then let them in)",
            "B) Let them skip entirely and explore, prompt for onboarding later",
            "C) Give a 'guest mode' preview with sample data",
            'D) SIA says "No worries, let\'s just start. Tell me one thing on your mind"',
        ]
    )


def build_section_4(story):
    add_section_header(story, "4. Navigation & Information Architecture")

    add_question(story,
        "4.1 What are the primary navigation items (max 5)?",
        context=["Current app: Sidebar with 30+ items. Old meeting: minimal sidebar, pin system, Explore page."],
        body="If the bottom nav (mobile) or sidebar (desktop) shows only 4-5 items, what are they?",
        options=[
            "Home / Today",
            "SIA (AI Coach)",
            "My Goals / Life Areas",
            "Explore (discover modules)",
            "Schedule / Calendar",
            "Community",
            "Profile",
        ]
    )

    add_question(story,
        "4.2 How do 8 life domains organize in the UI?",
        context=["3 pillars (Fitness, Nutrition, Wellbeing) are the DATA FOUNDATION. Life Goals are the USER-FACING LAYER."],
        options=[
            "A) Goal-centric: Users see goals, each links to relevant domain features. Domains are invisible.",
            "B) Domain tabs: Each life area has its own tab/section",
            "C) AI-organized: SIA decides what to show based on time of day, user state, active goals",
            "D) Hybrid: Goals are primary, users can drill into domain dashboards from Explore",
            "E) Something else",
        ]
    )

    add_question(story,
        "4.3 Pin-to-sidebar system — still want it?",
        context=["Old meeting decision D4: Users pin favorite modules from Explore page to sidebar."],
        body="If yes: what's the default set of pinned items? How many pins max?"
    )

    add_question(story,
        "4.4 The Explore page — what does it look like?",
        options=[
            "A) Grid of module cards with domain-colored icons and descriptions",
            "B) Categorized by life domain (Career section, Finance section, etc.)",
            "C) AI-curated: 'Recommended for you' based on goals, with full catalog below",
            "D) Something else",
        ]
    )

    add_question(story,
        "4.5 How does navigation differ between mobile and desktop?",
        body="Should they show the same items? Does the mobile bottom bar adapt based on user's active goals?"
    )

    add_question(story,
        "4.6 Where does the admin panel live?",
        body="Current: /admin with 19+ sub-routes. Completely separate layout, section within settings, or role-based toggle?"
    )


def build_section_5(story):
    add_section_header(story, "5. Home Screen / Daily Experience")

    add_question(story,
        "5.1 What IS the home screen?",
        context=["Old meeting Q4: If SIA is primary, what is the dashboard?",
                 "AI-first means the home experience is suggestion-driven, not log-driven."],
        options=[
            "A) SIA IS the home screen — you open the app to a conversation",
            "B) A 'Today' view: SIA's greeting, AI-suggested actions, key metrics, quick actions",
            "C) A full dashboard with KPI cards/charts — but not the default landing",
            "D) Personalized: users choose what widgets/cards appear on their home",
        ]
    )

    add_question(story,
        "5.2 What are the top 5 things visible on the home/today screen?",
        body="Pick from:",
        options=[
            "SIA's greeting / proactive message of the day",
            "Today's AI-suggested actions (across all life domains)",
            "Active life goals with progress",
            "Daily schedule / upcoming events",
            "Streak count / motivation indicator",
            "Cross-domain insight",
            "Quick check-in prompt (mood/energy/intention)",
            "Recent activity feed",
            "Community highlights",
            "Weather / prayer times / contextual info",
            "Motivational quote or SIA encouragement",
        ]
    )

    add_question(story,
        "5.3 How much data density is appropriate?",
        context=["So many numbers scare people away.",
                 "Depends on motivation tier — low gets minimal, high gets detailed."],
        options=[
            "A) Minimal — one or two key numbers, mostly conversational",
            "B) Moderate — 4-6 cards, one visual, a schedule preview",
            "C) Dense — multi-section with charts, tables, feeds",
            "D) Adaptive — density changes based on motivation tier",
        ]
    )

    add_question(story,
        "5.4 Should there be a daily check-in?",
        options=[
            "A) Yes — quick mood/energy/intention check before they see anything else",
            "B) Yes, but part of SIA's greeting — conversational, not a form",
            "C) No mandatory check-in — SIA might ask naturally",
            "D) Optional: user enables/disables daily check-in in preferences",
        ]
    )

    add_question(story,
        "5.5 How do cross-domain connections surface on the home screen?",
        options=[
            "A) An 'Insight of the day' card with a cross-domain observation",
            "B) Visual connection lines between goal cards",
            "C) SIA mentions it in the greeting",
            "D) A dedicated 'Connections' section or widget",
            "E) Subtly woven in — domain-colored tags on action items",
        ]
    )


def build_section_6(story):
    add_section_header(story, "6. Life Domains & Feature Organization")

    add_question(story,
        "6.1 How do the 8 life domains present themselves in the UI?",
        options=[
            "A) Invisible infrastructure: Users never see 'domains' — only goals and daily actions",
            "B) Colored tags: Each domain has a color, actions and insights are tagged",
            "C) Domain dashboards: Each domain has its own dashboard from Explore",
            "D) Life wheel: A visual wheel/radar showing all domains with progress",
            "E) A combination — describe:",
        ]
    )

    add_question(story,
        "6.2 The AI-first interaction pattern — does it apply to ALL domains?",
        context=["Universal pattern: AI suggests → user reviews → accepts/edits/skips → AI learns."],
        body="Does this apply equally to all domains, or are there domains where the user should drive more and AI drive less?",
        options=[
            "Workout plans, Meal suggestions, Journal prompts",
            "Budget advice, Relationship reminders, Prayer/spiritual practice",
            "Learning goals, Career actions",
        ]
    )

    add_question(story,
        "6.3 Per-domain design intent",
        body="For each domain, describe in 1-2 sentences what the primary user experience should be:",
        options=[
            "Fitness & Movement:",
            "Nutrition & Diet:",
            "Mental Health & Wellbeing:",
            "Finance & Money:",
            "Career & Work:",
            "Relationships:",
            "Spirituality & Religion:",
            "Learning & Growth:",
            "Creativity:",
        ]
    )

    add_question(story,
        "6.4 Custom life domains — how does a user add one?",
        options=[
            "A) User types domain name, AI auto-generates tracking suggestions and metrics",
            "B) User picks from 20+ pre-built domains, 'Custom' is last resort",
            "C) User just sets a goal — the AI figures out which domain it belongs to",
        ]
    )

    add_question(story,
        "6.5 Which domains are v1 priority vs later?",
        body="Rank each domain: Full / Moderate / Light / Later",
        options=[
            "Fitness & Movement:",
            "Nutrition & Diet:",
            "Mental Health & Wellbeing:",
            "Finance & Money:",
            "Career & Work:",
            "Relationships:",
            "Spirituality & Religion:",
            "Learning & Growth:",
            "Creativity:",
        ]
    )

    add_question(story,
        "6.6 Cross-domain intelligence — how are connections shown?",
        options=[
            "A) SIA tells them in conversation",
            "B) A dedicated 'Insights' or 'Connections' screen with visualizations",
            "C) The Knowledge Graph — interactive visualization",
            "D) Cards on the home screen: 'Connection spotted' with a visual",
            "E) All of the above, in different contexts",
        ]
    )

    add_question(story,
        "6.7 Wellbeing sub-features — consolidate or keep separate?",
        context=["Current: 10+ sub-modules under Wellbeing (journal, mood, stress, energy, breathing, etc.)"],
        options=[
            "A) Remain as separate screens/modules accessible from Explore",
            "B) Consolidate into 2-3 screens (Mind, Habits, Mindfulness)",
            "C) Become SIA-invoked features — no standalone screens",
            "D) Mix: core ones get standalone screens; rest are SIA-invoked",
        ]
    )

    add_question(story,
        "6.8 Finance depth — how much of a finance app is this?",
        options=[
            "A) A full finance dashboard (like Mint/YNAB) embedded in the life system",
            "B) Goal-oriented finance tracking tied to life goals, but not full budgeting",
            "C) Light: AI monitors spending patterns and flags insights only",
            "D) Depends on user's plan/subscription",
        ]
    )

    add_question(story,
        "6.9 Spirituality & religion — how explicitly religious vs spiritual?",
        options=[
            "A) Explicitly multi-faith: prayer tracking for Islam, Christianity, Judaism, etc.",
            "B) Spiritually agnostic: 'spiritual practice' that works for any faith or secular",
            "C) Start with Islamic features as primary, expand later",
            "D) Let the AI handle it — user states goals, SIA adapts without religion-specific UI",
        ]
    )

    add_question(story,
        "6.10 What existing features should be REMOVED from the app?",
        body="Looking at: quick notes, voice calls, soundscapes/music player, yoga library, blogs, webinars, careers page, HIPAA page, money map, knowledge graph, competitions, leaderboard, vision board. Which are cut entirely? Which are deprioritized?"
    )


def build_section_7(story):
    add_section_header(story, "7. Goals & Plans System")

    add_question(story,
        "7.1 Goal decomposition — how much does the user see?",
        context=["AI decomposes any goal into daily actions, tracking signals, milestones."],
        options=[
            'A) Just the daily actions ("Today: 15 min Quran reading, pray Dhuhr on time")',
            "B) The full decomposition: all actions, domains, milestones, reasoning",
            "C) Summary with expandable detail: '7 actions across 3 life areas' → tap for full breakdown",
            "D) Depends on motivation tier: low sees only today's actions, high sees full plan",
        ]
    )

    add_question(story,
        "7.2 What do life goal cards look like?",
        body="Pick the essential elements for a goal card:",
        options=[
            "Progress ring/bar",
            "Motivation tier badge (low/med/high)",
            "Connected domain colors/icons",
            "Current streak",
            "Next action due",
            "AI coaching note",
            "Time since last activity",
        ]
    )

    add_question(story,
        "7.3 Motivation tiers — how do they manifest in the UI?",
        options=[
            "A) Yes — low-motivation users see simpler UI; high-motivation sees dense dashboards",
            "B) No visible change — AI's suggestions/tone change, UI layout stays same",
            "C) Subtle: same layout, but number of cards/actions shown adapts",
            "D) User chooses view density independently of motivation tier",
        ]
    )

    add_question(story,
        "7.4 Progress visualization — per-goal, per-domain, or unified?",
        options=[
            "A) Per-goal progress bars/rings",
            "B) Per-domain scores (Career: 72%, Fitness: 85%)",
            "C) Unified 'Life Score' — one number for overall life balance",
            "D) A life wheel/radar chart showing all domains",
            "E) Multiple views available — list, wheel, and per-goal",
        ]
    )

    add_question(story,
        "7.5 Milestones & celebrations — how big is the moment?",
        options=[
            "A) Full-screen celebration with animation, confetti, SIA congratulations",
            "B) A toast/banner notification with a brief message",
            "C) SIA brings it up in the next conversation naturally",
            "D) Depends on milestone size — small = toast, big = celebration",
            "E) Adapted by motivation tier — heavy for low, subtle for high",
        ]
    )


def build_section_8(story):
    add_section_header(story, "8. Knowledge System & Intelligence")

    add_question(story,
        "8.1 Knowledge Graph — user-facing or behind the scenes?",
        options=[
            "A) User-facing: visual graph users interact with, seeing how life data connects",
            "B) Behind the scenes: exists for AI intelligence, users see its outputs as SIA insights",
            "C) Power-user feature: available in Explore for those who want it, not promoted",
            "D) Showcase feature: shown during onboarding as wow moment, then lives in Explore",
        ]
    )

    add_question(story,
        "8.2 Personal Wiki — visible to the user?",
        options=[
            "A) Yes — a 'My Life Wiki' section to browse what Balencia knows",
            "B) No — it's SIA's memory. User experiences it through better AI responses.",
            "C) Partially — users see key facts but not the full compiled wiki",
        ]
    )

    add_question(story,
        "8.3 Cross-domain insights — how are they delivered?",
        options=[
            "A) Dedicated 'Insights' feed/page",
            "B) SIA mentions them in conversation when relevant",
            "C) Home screen cards: 'Connection spotted' with visual",
            "D) Weekly digest: 'This week's life connections'",
            "E) All of the above, in different contexts",
        ]
    )

    add_question(story,
        "8.4 Memory transparency — should users see what SIA remembers?",
        options=[
            "A) See all stored memories in a 'What SIA knows' page, with ability to delete",
            "B) See memory referenced inline but not browse all memories",
            "C) Not see the memory system at all — it just works",
            "D) Privacy control: user manages a 'memory vault'",
        ]
    )


def build_section_9(story):
    add_section_header(story, "9. Social & Community")

    add_question(story,
        "9.1 How prominent should social features be?",
        options=[
            "A) Core: social is central to motivation — feed, challenges, accountability are prominent",
            "B) Optional add-on: available for those who want it, solo experience is complete",
            "C) Minimal for v1: basic accountability partner system, no feed or leaderboard",
            "D) None for v1: focus entirely on the personal AI coach experience",
        ]
    )

    add_question(story,
        "9.2 Leaderboard — motivating or anxiety-inducing?",
        options=[
            "A) Keep and make prominent (Duolingo-style)",
            "B) Keep but opt-in only",
            "C) Replace with non-competitive comparisons",
            "D) Remove for v1",
        ]
    )

    add_question(story,
        "9.3 Competitions & shared challenges — keep for v1?",
        options=[
            "A) Keep and polish — competitions across all life domains",
            "B) Simplify to 'shared challenges' with friends",
            "C) Deprioritize — build after core AI coach is solid",
            "D) Remove entirely",
        ]
    )

    add_question(story,
        "9.4 Accountability — AI-driven or social?",
        options=[
            "A) AI-driven: SIA is your accountability partner",
            "B) Social: invite a friend/partner as accountability buddy",
            "C) Both: SIA as default, with option to add human partners",
            "D) Neither for v1 — just streaks and personal tracking",
        ]
    )


def build_section_10(story):
    add_section_header(story, "10. Gamification & Motivation")

    add_question(story,
        "10.1 How prominent are streaks?",
        options=[
            "A) Duolingo-prominent: streak is THE motivator, visible everywhere",
            "B) Present but not central: shown on home, celebrated at milestones",
            "C) Subtle: SIA mentions streaks in conversation, no persistent visual counter",
            "D) Per-domain streaks: separate streaks for fitness, journaling, prayer, etc.",
        ]
    )

    add_question(story,
        "10.2 Achievement system — how does it work across all life domains?",
        body="Should achievements span ALL life domains equally? Or domain-specific?",
        options=[
            "'Connected 3 life areas this week' (cross-domain)",
            "'30-day prayer streak' (spirituality-specific)",
            "'Saved $500 toward your goal' (finance-specific)",
            "'Life balanced: all domains above 50%' (holistic)",
        ]
    )

    add_question(story,
        "10.3 Micro-wins — surface them or let them accumulate?",
        options=[
            "A) Celebrate immediately: small animation + XP popup",
            "B) Batch them: '7 wins today!' summary at end of day",
            "C) SIA acknowledges naturally: 'Nice, that's 3 actions done today'",
            "D) Adapted by motivation tier: immediate for low, subtle for high",
        ]
    )

    add_question(story,
        "10.4 Does gamification intensity adapt by motivation tier?",
        context=["Low motivation: Heavy. Every tiny win celebrated. XP for logging in. | High motivation: Light. Focus on metrics."],
        body="Confirm: should the gamification system fundamentally change based on motivation tier?"
    )


def build_section_11(story):
    add_section_header(story, "11. Subscription & Monetization")

    add_question(story,
        "11.1 Free vs paid — what can free users access?",
        body="What's the free experience? Can they:",
        options=[
            "Chat with SIA? (how many messages/sessions?)",
            "See the dashboard/home screen?",
            "Track goals in 1-2 life domains?",
            "Use basic features (journal, habits, mood)?",
            "See cross-domain insights?",
        ]
    )

    add_question(story,
        "11.2 Subscription model — tiered plans or modular?",
        options=[
            "A) Pre-built tiers (Basic/Pro/Premium) — simple, clear",
            "B) Modular by life domain (Fitness $X, Finance $Y)",
            "C) Both: pre-built tiers + custom build-your-own",
            "D) Usage-based: pay for AI conversation time + premium features",
        ]
    )

    add_question(story,
        '11.3 How do you handle "locked" features?',
        options=[
            "A) Blurred preview with upgrade prompt",
            "B) Don't show it at all until they upgrade",
            "C) One free trial, then lock",
            "D) Grayed out with lock icon and brief explanation",
            "E) SIA mentions it naturally — conversational upsell",
        ]
    )

    add_question(story,
        "11.4 AI usage limits — credit system?",
        context=["Discussed credit-based system, ~10 min sessions, ~$5/user/month AI cost target."],
        options=[
            "A) Unlimited within plan",
            "B) Credit/token system visible to user",
            "C) Soft daily limit: SIA gently suggests coming back tomorrow",
            "D) Tiered: free gets X messages/day, paid gets unlimited",
        ]
    )


def build_section_12(story):
    add_section_header(story, "12. Visual & Emotional Design")

    add_question(story,
        "12.1 Dark mode is primary — how dark?",
        context=["Brand spec: ink-900 #0A0A0F primary background."],
        options=[
            "A) Near-black everywhere (current brand spec) — premium, cinematic",
            "B) Warmer dark with brown undertones — more human, less tech",
            "C) Mix: pure dark for backgrounds, warm dark for card surfaces",
        ]
    )

    add_question(story,
        "12.2 Light mode — how important?",
        options=[
            "A) Not needed for v1 — dark only",
            "B) Available as toggle but dark is default and primary",
            "C) Equal priority — some users strongly prefer light",
        ]
    )

    add_question(story,
        "12.3 How much animation and motion?",
        body="For each area, specify: Cinematic / Polished / Minimal",
        options=[
            "Landing page (public):",
            "Onboarding:",
            "Home/Dashboard:",
            "SIA chat:",
            "Feature screens:",
            "Settings/Profile:",
            "Celebrations/Achievements:",
        ]
    )

    add_question(story,
        "12.4 The continuous stroke line — where does it appear?",
        body="Specifically: home screen? SIA chat? Achievement celebrations? Onboarding only? Domain transitions?"
    )

    add_question(story,
        "12.5 Photography vs illustration vs abstract?",
        options=[
            "A) Warm photography of real people (brand default)",
            "B) Custom illustrations (playful, scalable)",
            "C) Abstract gradients and shapes (techy, less personal)",
            "D) Mix depending on context",
        ]
    )

    add_question(story,
        "12.6 Icon style — outlined or filled?",
        context=["Brand guidelines: Rounded, 2px stroke, outlined only, 24px minimum."],
        body="Still aligned? Should active states use filled variants?"
    )


def build_section_13(story):
    add_section_header(story, "13. Platform & Responsiveness")

    add_question(story,
        "13.1 What is the primary platform?",
        context=["Direction Reset: Web-first confirmed. No mobile native app for now."],
        options=[
            "A) Mobile-first web (designed for phones, scales up)",
            "B) Desktop-first web (designed for desktop, responsive down)",
            "C) Truly equal — both experiences are primary",
            "D) Mobile-first, but SIA voice is primary mobile experience while desktop gets full dashboard",
        ]
    )

    add_question(story,
        "13.2 Are there features that are mobile-only or desktop-only?",
        body="Examples: voice interaction is naturally mobile, knowledge graph is naturally desktop. Any deliberate platform-specific features?"
    )

    add_question(story,
        "13.3 Should the mobile experience feel like a native app?",
        body="Bottom tab bar, swipe gestures, pull-to-refresh, haptic-style feedback? Or clearly a web app that's responsive?"
    )


def build_section_14(story):
    add_section_header(story, "14. Notifications & Engagement")

    add_question(story,
        "14.1 What are the top 3 notification types?",
        body="Pick from:",
        options=[
            "SIA proactive AI insights/suggestions",
            "Goal progress milestones",
            "Streak alerts (about to break)",
            "Daily check-in prompt",
            "Prayer/spiritual reminders",
            "Workout/meal reminders",
            "Social activity",
            "Cross-domain connection discovered",
            "Budget alerts",
        ]
    )

    add_question(story,
        "14.2 Push vs in-app balance?",
        options=[
            "A) Most things in-app only, push reserved for critical",
            "B) User configures per category",
            "C) Adapted by motivation tier",
            "D) Aggressive push to drive engagement",
        ]
    )

    add_question(story,
        "14.3 Proactive AI timing — does it adapt?",
        context=["Low motivation = max 1/day, gentle. Medium = 2-3/day. High = 5+/day, accountability nudges."],
        body="Should notification frequency automatically adapt based on motivation tier and engagement patterns?"
    )


def build_section_15(story):
    add_section_header(story, "15. Data, Privacy & Transparency")

    add_question(story,
        "15.1 How transparent should AI data usage be?",
        body='When SIA gives an insight, should the user see exactly what data was used? A "show me the data" expandable?'
    )

    add_question(story,
        "15.2 Data export — is this a feature?",
        body="Can users download their data (goals, activities, journal entries, finance records, mood history)?"
    )

    add_question(story,
        "15.3 Integration data — how is it presented?",
        body="WHOOP, Spotify, Google Calendar data flows in. Is there a 'Connected Services' dashboard? Or silently woven into AI understanding?"
    )


def build_section_16(story):
    add_section_header(story, "16. Content & Education")

    add_question(story,
        "16.1 Blogs and articles — part of the app or separate?",
        body="Core to the experience, a marketing/SEO play, or SIA-delivered?"
    )

    add_question(story,
        "16.2 Webinars — live or on-demand?",
        body="Live sessions, recorded library, both, or cut for v1?"
    )

    add_question(story,
        "16.3 Help center — standalone or SIA-powered?",
        options=[
            "A) Standalone /help page with FAQ and guides",
            "B) SIA-powered: 'Ask SIA for help'",
            "C) Both: traditional help + SIA can answer help questions",
            "D) Contextual tooltips only — no dedicated help page",
        ]
    )


def build_section_17(story):
    add_section_header(story, "17. Screen Priority Ranking")

    add_question(story,
        "Rank these screen groups by redesign priority (1 = first):",
        body="This determines the order we design and build.",
        options=[
            "Landing page (public marketing site)",
            "Onboarding flow (first-time user experience)",
            "Home / Today (daily experience after login)",
            "AI Coach (SIA) chat + voice experience",
            "Goals & Plans (life goal tracking, progress)",
            "Life Areas overview (holistic life view)",
            "Fitness & Workouts",
            "Nutrition (meal plans, logging, macros)",
            "Wellbeing hub (journal, mood, habits, breathing)",
            "Finance / Money Map",
            "Schedule & Calendar",
            "Community & Social",
            "Knowledge Graph",
            "Explore page (module discovery)",
            "Profile & Settings",
            "Subscription & Billing",
            "Admin panel",
            "Spirituality features",
            "Learning features",
            "Creativity features",
        ]
    )


def build_section_18(story):
    add_section_header(story, "18. Open Questions & Wild Card")

    add_question(story,
        "Q5 (from previous meetings): Community-created modules — scope for v1?",
    )

    add_question(story,
        "18.1 Is there a feature or experience that no existing app does that you want Balencia to pioneer?",
        body='Think about "Balencia sees what we can\'t see." What makes someone say "I\'ve never seen an app do THAT before"?'
    )

    add_question(story,
        "18.2 What's the one thing from the current app you absolutely want to keep?",
    )

    add_question(story,
        "18.3 What's the one thing from the current app that must change?",
    )

    add_question(story,
        "18.4 Any apps, designs, or experiences that recently inspired you?",
        body="Share links, screenshots, or descriptions."
    )

    add_question(story,
        "18.5 What would make a user tell a friend about Balencia?",
        body='Not a feature — the moment. The "holy shit" moment that makes them pull out their phone and show someone.'
    )

    story.append(Spacer(1, 2*cm))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor('#1a1a2e'), spaceAfter=12))
    story.append(Paragraph(
        "<b>Next step:</b> Once answered, we’ll review together, finalize decisions, and use this as input for screen design specs — starting with the highest-priority screens.",
        styles['BodyText2']
    ))


# Build and save
story = build_story()
doc.build(story)
print(f"PDF generated: {OUTPUT_PATH}")
