yHealth App - Comprehensive Feature Audit

 Context

 This is a complete inventory of every feature in the yHealth app (/Users/hamza/yHealth/yhealth-app), compiled to compare
 against the Balencia rebrand and identify any gaps. The app is a Next.js 16 web application (client) with an Express 5
 backend (server), PostgreSQL database, Redis caching, and real-time Socket.IO.

 ---
 1. AUTHENTICATION & ACCOUNT

 - Email/Password registration with OTP email verification
 - Email/Password login with JWT tokens (3-day expiry)
 - Google OAuth sign-in
 - Apple Sign-In
 - WhatsApp enrollment and OTP verification (optional)
 - Forgot password flow (email-based)
 - Reset password flow
 - Change password (authenticated)
 - Token refresh (automatic refresh on expiry)
 - Logout
 - Session management (cookie-based, secure in production)

 ---
 2. ONBOARDING (Multi-step wizard)

 1. Welcome step (intro)
 2. Assessment mode selection (quick vs. deep)
 3. Health assessment questionnaire (single select, multi select, slider, emoji scale, number input, date picker, text input)
 4. Deep assessment step (detailed health questions)
 5. Life goals selection
 6. Goal setup / configuration
 7. Body image upload (body composition baseline)
 8. Integrations step (connect wearables/services)
 9. Preferences step (app preferences)
 10. AI plan generation step (personalized plan created)
 - Progress indicator and step navigation throughout
 - Product tour system after onboarding (spotlight overlay, interactive tooltips, welcome modal, completion modal, progress
 bar)

 ---
 3. DASHBOARD (Main hub, tab-based navigation)

 3a. Overview Tab

 - Health metrics summary (heart rate, steps, calories, water, sleep)
 - Circular health metric visualizations
 - Real-time WHOOP data integration widgets
 - Weather widget
 - AI tip widget
 - Sub-tabs: Analytics, Scoring, Predictions, Reporting

 3b. Goals Tab

 - Goal list (Kanban, calendar, list views)
 - Create goal (manual + AI-assisted)
 - Edit goal
 - Goal detail view
 - Goal progress tracking
 - Task progress within goals
 - Goals analytics and insights

 3c. Plans Tab

 - Active plan widget
 - Current plan card
 - Plan list
 - Create plan modal
 - Diet plans list
 - Plan detail view
 - Plan completion celebration

 3d. Workouts Tab

 - Workout cards (list/grid view)
 - Workout analytics (performance metrics)
 - Workout schedule tasks
 - Workout calendar view
 - Workout journey stat cards
 - Create workout modal
 - Edit workout modal (day-specific)
 - Reschedule workout modal
 - Rest timer modal
 - Workout completion modal
 - Session selector
 - Workout constraints (equipment, time, location)

 3e. Nutrition Tab

 - Meal cards and meal list
 - Create meal modal
 - Meal history
 - Recipe list and recipe cards
 - Recipe details modal
 - Create recipe modal
 - Macro circular chart and macro hero card
 - Macro overview
 - Plate calculator (portion calculation)
 - Nutrition analytics and trends
 - Daily nutrition insights
 - Calories widget
 - Nutrition label scanning result
 - Shopping list widget
 - AI-generated shopping list
 - Shopping item management
 - Sub-tabs: Today, Plans, Recipes, Insights

 3f. Activity Tab

 - Activity logging
 - Activity selector
 - Real-time activity card
 - Log activity modal
 - Status picker modal
 - Activity event form

 3g. Progress Tab

 - Weight and body measurement trends
 - Body image photo comparison
 - Progress overview with charts
 - Weekly focus section
 - Progress metrics dashboard

 3h. Achievements Tab

 - Achievement cards
 - Achievement detail drawer
 - Achievement hero section (featured)
 - Achievement progress ring
 - Achievement stats bar
 - Achievement unlock celebration (confetti animation)
 - Achievement toast notifications

 3i. AI Coach Tab

 - AI coach chat interface (message history)
 - AI coach input (prompt)
 - AI coach sidebar navigation
 - AI coach welcome screen
 - Agent timeline (reasoning visualization)
 - Artifact card (generated content)
 - Core profile panel (user context)
 - Deep analysis timeline
 - Files panel (intelligence files)
 - Memory card display
 - Message actions (save, share)
 - Transparency panel (reasoning transparency)
 - Save to wiki modal
 - Wiki integration

 3j. Voice Assistant Tab

 - Voice call coaching sessions
 - Call purpose selector
 - Active call view
 - Call summary view
 - Voice assistant settings

 3k. Voice Call Tab

 - Real-time voice coaching interface
 - Voice recording and transcription

 3l. Notifications Tab

 - Notification list/history
 - Notification types: achievements, goals, workouts, social, system
 - Mark as read/unread
 - Notification preferences management

 3m. Chat History Tab

 - AI coach conversation history and archives
 - Message search

 3n. Preferences Tab

 - App preferences configuration

 3o. Settings Tab

 - Account, profile, security, privacy, appearance, notifications, subscriptions, integrations settings

 3p. Profile Tab

 - Quick profile view with stats
 - Avatar, bio, health score, activity summary

 3q. Wellbeing Tab

 - Mental health overview
 - Mood tracking
 - Stress management
 - Energy level tracking
 - Wellbeing trend charts
 - Habit completion charts

 3r. Intelligence Tab

 - AI insights and data correlations
 - Correlation dashboard and explorer
 - AI-generated recommendations

 3s. Finance Tab (Money Map)

 - Financial data overview
 - Budget management
 - Spending tracker
 - Transactions list
 - Financial goals
 - Receipt scanning
 - Statement scanning
 - Financial analytics

 3t. Accountability Tab

 - Accountability contracts
 - Contract management
 - Social accountability features
 - Partner/buddy tracking

 3u. Social Tab

 - Buddy system (add/remove buddies)
 - Buddy profile modal
 - Connections modal
 - Social accountability section
 - Activity sharing
 - Social leaderboards

 ---
 4. WELLBEING MODULE (Full sub-app)

 - Breathing exercises (/wellbeing/breathing/)
 - Mood tracking (/wellbeing/mood/)
 - Stress management (/wellbeing/stress/)
 - Energy level tracking (/wellbeing/energy/)
 - Emotional check-in flows (/wellbeing/emotional-checkin/)
 - Journal (/wellbeing/journal/)
   - Morning check-in
   - Evening review
   - Daily check-in flow
   - Distraction-free editor mode
   - Journal hub (overview/history)
   - Journaling mode selector
   - Lessons learned extraction
   - Lesson reminder banner (spaced repetition)
   - Day comparison card
   - Voice journaling (record, transcribe, summarize)
   - Constellation mode (creative visualization)
   - Agentric editor (AI-assisted journaling)
 - Habit tracker (/wellbeing/habits/)
   - Habit form modal
   - Habit completion tracking
   - Habit analytics
 - Wellbeing insights (/wellbeing/insights/)
 - Schedule management (/wellbeing/schedule/)
   - Schedule editor
   - Activity form modal
   - Date-specific schedule views
 - Vision board (/wellbeing/vision/)

 ---
 5. WORKOUT & EXERCISE FEATURES

 - Exercise library (/exercises/) - searchable database of exercises
 - Exercise detail pages (/exercises/[id]/) - form, target areas, variations
 - Exercise execution drawer (how-to guide)
 - Exercise search
 - Yoga module (/yoga/)
   - Pose library (searchable)
   - Pose cards and detail sidebar with images
   - Session player (play yoga sessions)
   - Session player controls (pause, resume, speed)
   - AI yoga coach (real-time pose detection via webcam)
   - Camera viewport (webcam feed for pose tracking)
   - Body part highlighting
   - Pose accuracy score ring
   - Pose selector
   - Coaching panel
   - Yoga progress dashboard
   - Demo video modal
   - Eye exercise animations

 ---
 6. VOICE & AI FEATURES

 - AI Coach chat (LangGraph-based, multi-model: Claude, OpenAI, Google AI)
 - Voice assistant (/voice-assistant/) - always-available floating button
 - Voice call coaching (/voice-call/) - real-time voice sessions
 - Voice assistant modal (overlay)
 - Voice coach settings (voice selection, persona)
 - Call purpose selector (choose coaching topic)
 - Call summaries (post-call review)
 - Speech-to-text transcription
 - Text-to-speech (Google Cloud TTS)
 - Vision coaching (computer vision, image analysis)
 - Camera emotion detection
 - AI-generated plans (workout, nutrition, wellness)
 - AI goal creation (AI-assisted)
 - AI community generator (admin)
 - AI blog generator (admin)
 - AI webinar generator (admin)
 - AI shopping list generator
 - Knowledge graph (user context/insights graph with D3 visualization)
   - Force-directed graph
   - Graph controls (zoom, pan)
   - Graph filters and search
   - Node detail modal and panel
   - Graph legend
 - Memory extraction (extract key insights from user data)
 - Daily analysis (AI-generated daily summaries)

 ---
 7. HEALTH DATA & INTEGRATIONS

 Supported Providers:

 - WHOOP (full OAuth + webhook integration)
   - Recovery score, sleep stages, strain, HRV, resting HR, SpO2, skin temp
   - WHOOP dashboard page (/whoop/)
   - Sleep analysis charts
   - Strain tracking charts
   - Recovery monitoring charts
   - Stress monitor
   - Workout charts
   - Cycle analysis
   - Recoveries table
   - WHOOP metrics cards
   - WHOOP credentials management
 - Apple Health (native iOS)
 - Fitbit (wearables, activity/sleep)
 - Garmin (GPS, fitness metrics)
 - Oura Ring (sleep, readiness, HRV)
 - Samsung Health (Android)
 - Strava (running/cycling)
 - MyFitnessPal (nutrition)
 - Nutritionix (nutrition)
 - Cronometer (nutrition)
 - Google Calendar (event sync, two-way)
   - Calendar connected view
   - Calendar sync settings
   - Create events from plans
 - Spotify (music/soundscapes)
   - Spotify player
   - Playlist browser
   - Track list
   - Listening history tracking
   - Spotify connect prompt

 Data Types Tracked:

 - Heart rate, HRV, sleep, steps, workouts, calories, nutrition, strain, recovery, body temp, VO2 max, training load, GPS
 activities

 ---
 8. SOUNDSCAPE & MUSIC

 - Soundscape page (/soundscape/) - ambient soundscapes
 - Persistent music player (always available)
 - Spotify integration (browse playlists, play tracks)
 - Jamendo music service integration
 - Motivational video recommendations
 - YouTube video recommendations

 ---
 9. SOCIAL & COMMUNITY

 - Community hub (/community/)
 - Community detail pages (/community/[slug]/)
 - Community discussions
 - Buddy system (add, manage workout buddies)
 - Follow/unfollow users
 - Public user profiles (/profile/[id]/)
 - Direct messaging (/messages/)
 - Group messaging (group info, chat settings modals)
 - Social leaderboards
 - Activity sharing
 - Social accountability partnerships

 ---
 10. COMPETITIONS & LEADERBOARDS

 - Leaderboard page (/leaderboard/)
   - Ranked user list
   - Top three podium
   - "Around me" view (nearby ranks)
   - User row breakdown
   - Rank badges
   - Daily score card
   - Score history chart
 - Competitions page (/competitions/)
   - Competition detail view
   - Join competition modal
   - Competition live chat
   - Stream controls
   - Camera stream placeholder
   - Go live button
   - Competition analytics (admin)
   - Auto-created seasonal competitions

 ---
 11. ACCOUNTABILITY

 - Accountability contracts (/contracts/)
 - Contract creation and management
 - Contract evaluation (automated checks)
 - Social accountability (buddy-based)
 - Accountability tab in dashboard

 ---
 12. SCHEDULING & CALENDAR

 - Schedule page (/schedule/) - full calendar view
 - Schedule item actions (edit, delete, reschedule)
 - Edit schedule item modal
 - Calendar conflict detection and banner
 - Google Calendar sync (two-way)
 - Wellbeing schedule with date-specific views
 - Schedule automation (automated adjustments)
 - Activity types: workout, meal, sleep routine, mindfulness, habit, check-in, reflection, learning

 ---
 13. PROGRESS & ANALYTICS

 - Progress page (/progress/)
 - Body measurements tracking
 - Body image comparison (photo upload + AI analysis)
 - Weight trends
 - Health score (card, hero, breakdown)
   - Score badge, metric ring, double ring arc, multi ring arc, wave arc
 - Predictions (AI-based health predictions)
 - Correlation dashboard (multi-metric correlations)
 - Weekly/daily analytics
 - Activity status (/activity-status/) - calendar/timeline view

 ---
 14. FINANCIAL TRACKING (Money Map)

 - Money Map page (/money-map/)
 - Budget management
 - Transaction tracking
 - Spending analysis
 - Financial goals
 - Receipt scanning (camera-based)
 - Bank statement scanning
 - Financial analytics dashboard

 ---
 15. LIFE AREAS

 - Life Areas page (/life-areas/)
 - Life area overview widget
 - Create/edit life area modals
 - Life domain carousel
 - Goal management per life area

 ---
 16. NOTIFICATION SYSTEM

 - Push notifications (Firebase FCM)
 - Email notifications (BullMQ queued)
 - SMS notifications (Twilio)
 - In-app notification dropdown (header)
 - In-app notification toast
 - Notification history page
 - Per-category opt-in/opt-out
 - Desktop notification prompt
 - Real-time notification delivery (Socket.IO bridge)
 - Notification types: achievements, goals, workouts, social, system, reminders, proactive AI messages

 ---
 17. CONTENT & EDUCATIONAL

 - Blog system (/blogs/, /blogs/[slug]/)
   - Blog cards, search, filters, pagination
   - Blog reactions (like/react)
 - Help center (/help/, /help/[slug]/)
 - FAQ page (/faq/)
 - Webinars (/webinars/, /webinars/[slug]/)
 - Contact page (/contact/)
 - About page (/about/)
 - Careers page (/careers/)
 - Press/media page (/press/)

 ---
 18. SUBSCRIPTION & BILLING

 - Subscription page (/subscription/)
 - Subscription success page
 - Upgrade page (/upgrade/)
 - Stripe checkout integration
 - Billing portal (Stripe customer portal)
 - Billing settings (/settings/billing/)
 - Credits management (/settings/billing/credits/)
   - Plan credits (monthly reset)
   - Bonus credits (permanent)
   - Optimistic debit with rollback
 - Subscription states: none, active, trialing, past_due, grace (7-day), canceled, incomplete
 - Payment retry (dunning: +3d, +5d, +7d)
 - Feature entitlements based on subscription tier
 - Paywall/upgrade modals
 - Locked content pages (/locked/[pageKey]/)

 ---
 19. PROFILE & ACCOUNT MANAGEMENT

 - View own profile (/profile/)
 - Edit profile (/profile/edit/) - avatar, bio, personal details
 - Public profiles (/profile/[id]/)
 - Avatar upload (camera/file)
 - Profile stats (achievements, activity, health score)
 - Security settings (/security/) - password, sessions
 - Account settings - email, username
 - Privacy settings - data sharing, visibility
 - Appearance settings - theme (dark/light)
 - Prayer times section (geo-based religious practice tracking)

 ---
 20. CHAT & MESSAGING

 - Chat page (/chat/) - group and direct messaging
 - Chat history (/chat-history/)
 - Messages page (/messages/)
 - Message bubbles with delivery status
 - Message media (image/video attachments)
 - Typing indicator (real-time)
 - View-once messages
 - Group messaging (group info, settings modals)
 - User health profile in chat (view buddy's health data)
 - Competition-specific chat channels
 - Real-time delivery via Socket.IO

 ---
 21. ADMIN PANEL

 - Admin dashboard (/admin/)
 - Analytics dashboard (/admin/analytics/)
 - User management (list, create, edit users)
 - Role management (list, create, edit roles)
 - Subscription management
   - Subscription analytics
   - Customer subscriptions
   - Feature management
   - Subscription overrides
   - Promotional codes
   - Usage analytics
   - Abuse detection
 - Blog management (create, edit, AI-generate)
 - Exercise management (exercise database)
 - Contact management (contact form submissions)
 - Testimonial management
 - Newsletter management
 - Competition management (create, analytics)
 - Community moderation
 - Webinar management (create, AI-generate)
 - Help center management (articles)

 ---
 22. OBSTACLES & DIAGNOSTICS

 - Obstacles page (/obstacles/[id]/)
 - Obstacle detection (automated anomaly detection)
 - Obstacle diagnosis detail views

 ---
 23. QUICK NOTES

 - Quick Notes feature (/quick-notes/) - rapid capture

 ---
 24. STREAKS & GAMIFICATION

 - Streak tracking (daily activity streaks)
 - Streak validation
 - Micro-wins (small achievement notifications)
 - Engagement scoring (user engagement metrics)
 - Score badges and rank system

 ---
 25. LANDING PAGE & MARKETING

 - Hero section with animations
 - Pricing section
 - Features carousel
 - Voice coach section
 - Testimonials
 - Coming soon page (/coming-soon/)
 - Maintenance page (/maintenance/)
 - Offline page (/offline/)

 ---
 26. LEGAL & COMPLIANCE

 - Terms of service (/terms/)
 - Privacy policy (/privacy/)
 - Cookie policy (/cookies/)
 - HIPAA compliance info (/hipaa/)
 - Contracts page (/contracts/)

 ---
 27. UI/UX INFRASTRUCTURE

 - Dark mode (default) with theme toggle
 - Glassmorphism aesthetic
 - Framer Motion animations throughout
 - GSAP advanced animations
 - Three.js 3D effects
 - Particle effects and particle text
 - Confetti celebrations (canvas-confetti)
 - Lenis smooth scrolling
 - Cinematic splash/preloader
 - Loading skeletons (dashboard, app, immersive)
 - Responsive design (mobile-first)
 - Mobile bottom navigation
 - Breadcrumb navigation
 - 75+ modals/dialogs
 - Rich text editor (Tiptap with tables, code blocks, alignment)
 - Slash menus in editor
 - Bubble toolbar in editor
 - Full ARIA accessibility support
 - Keyboard navigation
 - Reduced motion safe animations
 - Language selector (multi-language support)
 - Error states and empty states
 - Unauthorized/Forbidden pages

 ---
 28. REAL-TIME FEATURES

 - Socket.IO for all real-time features
 - Live chat messaging
 - Live leaderboard updates
 - Competition streams
 - Vision coaching live feedback
 - Notification delivery in real-time
 - Typing indicators
 - Activity updates
 - Entitlement change broadcasting

 ---
 29. BACKGROUND JOBS & AUTOMATION (45+ jobs)

 - Daily analysis generation
 - WHOOP data sync (nightly)
 - Google Calendar event sync
 - Memory extraction from user data
 - Leaderboard materialization
 - Engagement scoring
     - Google Calendar event sync
     - Memory extraction from user data
     - Leaderboard materialization
     - Engagement scoring
     - Nutrition analysis
     - Exercise data sync
     - Daily health scoring
     - Micro-wins notification
     - Obstacle detection
     - Proactive AI messaging
     - Email digest (periodic summaries)
     - Check-in call scheduling
     - Dunning retry (failed payments)
     - Grace period expiration
     - Monthly credit reset
     - Seasonal competition auto-creation
     - Contract evaluation
     - Core profile calibration (AI coach updates)
     - Embedding computation (vector search)
     - Activity event processing
     - Exercise ingestion
     - Email delivery queue
     - Streak event processing
     - AI coach call processing
