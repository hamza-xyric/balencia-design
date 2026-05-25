# Competitor UI/UX Evidence Pack

**Captured:** 2026-05-20 16:15 PKT  
**Scope:** Public iOS mobile evidence only. No account-gated app capture.  
**Competitors:** Bevel, ChatGPT, Habitica  
**Purpose:** Build a visual evidence base for a later UI/UX-focused rewrite of `Screen-Drafts/competitor-analysis.md`.

## Methodology

- Used public App Store pages, official product pages, and public UI galleries.
- Downloaded direct image assets when public URLs were available.
- Kept 60fps.design Bevel motion evidence as still thumbnails and source links, not full videos.
- Reviewed public YouTube metadata and automatic captions for selected Bevel and Habitica videos; captions were temporary and are not stored in the repo.
- Did not modify `Screen-Drafts/competitor-analysis.md`.
- Excluded two Bevel official metadata images after inspection because they were brand/placeholder assets, not useful UI evidence.

## Folder Map

- `screenshots/bevel/` - Bevel official product images, ScreensDesign captures, and 60fps motion thumbnails.
- `screenshots/chatgpt/` - ChatGPT public App Store iPhone screenshots.
- `screenshots/habitica/` - Habitica public App Store iPhone screenshots.
- `notes/` - UI/UX extraction notes by competitor.
- `notes/youtube-video-uiux.md` - Timestamped video evidence from Bevel and Habitica YouTube sources.
- `uiux-pattern-index.md` - Cross-competitor patterns and Balencia implications.

## Primary Source Pages

- Bevel official site: https://www.bevel.health/
- Bevel App Store: https://apps.apple.com/us/app/bevel-ai-health-coach/id6456176249
- Bevel on ScreensDesign: https://screensdesign.com/showcase/bevel-health-performance
- Bevel on 60fps.design: https://60fps.design/apps/bevel
- ChatGPT App Store: https://apps.apple.com/us/app/chatgpt/id6448311069
- ChatGPT official page: https://openai.com/chatgpt/
- ChatGPT Voice Mode FAQ: https://help.openai.com/en/articles/8400625-voice-mode-faq
- Habitica App Store: https://apps.apple.com/us/app/habitica-gamified-taskmanager/id994882113
- Habitica iOS wiki: https://habitica.fandom.com/wiki/Mobile_App_for_iOS:_Habitica

## Video Evidence Inventory

**Reviewed:** 2026-05-20 18:20 PKT  
**Method:** `yt-dlp --skip-download` for metadata and temporary automatic captions in `/private/tmp/yhealth-youtube-evidence/`. No full videos, frames, or transcript files are stored in this repo.

| Product | Video | Channel | Published | Status | URL |
|---|---|---:|---:|---|---|
| Bevel | Introducing Bevel 3.0 | Bevel | 2026-04-27 | Included | https://www.youtube.com/watch?v=LBgTTTMgWwA |
| Bevel | Why I'm Not Paying $129 for Bevel 3.0 (And You Probably Shouldn't Either) | Mekawi | 2026-05-03 | Included for pricing/value perception | https://www.youtube.com/watch?v=hYJxwxMwPng |
| Bevel | Meet the New Bevel Intelligence | Bevel | 2026-04-27 | Included | https://www.youtube.com/watch?v=fV28YVFTQTc |
| Bevel | Bevel: The ONLY app you need | Bevel | 2026-02-05 | Reviewed but low-signal | https://www.youtube.com/watch?v=3u0_VbuwQdY |
| Habitica | How to Master Productivity and Crush Your Tasks with Habitica | OMG It's Derek | 2024-08-20 | Included | https://www.youtube.com/watch?v=A5fHK6ndXQU |
| Bevel | Biological Age is finally here! | Bevel | 2026-04-27 | Included extra candidate | https://www.youtube.com/watch?v=QVEhng6A8ts |
| Bevel | Bevel 3.0 transforme votre Apple Watch en coach IA | LoKan Sardari | 2026-04-28 | Reviewed metadata only; captions rate-limited | https://www.youtube.com/watch?v=BgkyeDwhyx8 |
| Bevel | Bevel 3.0 jetzt auf Whoop Niveau? Mein Fazit! | HealthTechFries | 2026-05-10 | Reviewed metadata only; captions rate-limited | https://www.youtube.com/watch?v=J7HEiFEF2bs |
| Habitica | Habitica vs Lifeup: Which App Is Better for Productivity? | DIY GUIDES | 2025-12-11 | Included extra candidate | https://www.youtube.com/watch?v=tFFTa76ZikE |
| Habitica | Five Great Apps to Gamify Your Life | Lifehacker | 2022-10-29 | Supplemental, low-detail | https://www.youtube.com/watch?v=WRONq7Le23w |
| Habitica | Habitica: The App That Makes Your Life a Game! Full Review | UK Best Reviewer | 2023-06-01 | Supplemental | https://www.youtube.com/watch?v=0WLIE6GnPXs |

Detailed timestamped observations are in `notes/youtube-video-uiux.md`.

## Screenshot Inventory

| File | Surface | Source URL |
|---|---|---|
| `screenshots/bevel/bevel-official-strain-phone.jpg` | Strain chart detail | https://cdn.prod.website-files.com/69d57061165346ff54989dc6/69e29794843c16ad9870fa2f_strain-phone-zp.jpg |
| `screenshots/bevel/bevel-official-sleep-phone.jpg` | Sleep stages detail | https://cdn.prod.website-files.com/69d57061165346ff54989dc6/69e297943fcb01097ffd4380_sleep-phone-zp.jpg |
| `screenshots/bevel/bevel-official-recovery-phone.jpg` | Recovery dashboard | https://cdn.prod.website-files.com/69d57061165346ff54989dc6/69e281381fc216bcbf92f6e4_af224fb6459e6328d6e630687f957fdc_recovery-phone-small.jpg |
| `screenshots/bevel/bevel-official-intelligence-floating.png` | AI reminder extraction | https://cdn.prod.website-files.com/64dcc8c57b43bbf105fd381f/69ebf72bc357aabbeb6efccb_intelligence_floating-2-p-500.png |
| `screenshots/bevel/bevel-screendesign-01.webp` | Apple Health permission | https://media.screensdesign.com/avs-pp/0a9ab40fed154ffa9886cad66222f04e.webp |
| `screenshots/bevel/bevel-screendesign-02.webp` | Paywall | https://media.screensdesign.com/avs-pp/1cbf642dab3b4e828e6faab4dcb45dbb.webp |
| `screenshots/bevel/bevel-screendesign-03.webp` | Strength onboarding | https://media.screensdesign.com/avs-pp/51a435d1a1ca45f9ba55214af8977fcc.webp |
| `screenshots/bevel/bevel-screendesign-04.webp` | Food logging | https://media.screensdesign.com/avs-pp/574ff27484df46c994fcbfd7176f1635.webp |
| `screenshots/bevel/bevel-screendesign-05.webp` | Welcome onboarding | https://media.screensdesign.com/avs-pp/922f8a93f1004b6c9c8b3a92216a7eb7.webp |
| `screenshots/bevel/bevel-screendesign-06.webp` | Personalized onboarding copy | https://media.screensdesign.com/avs-pp/b53931c0732647a39ad551b84831e885.webp |
| `screenshots/bevel/bevel-screendesign-07.webp` | Fitness onboarding | https://media.screensdesign.com/avs-pp/db59b8644f434c838d9a5816c9c6bdb6.webp |
| `screenshots/bevel/bevel-screendesign-08.webp` | Mood/journal logging | https://media.screensdesign.com/avs-pp/df75c276b1054ddaaba19248baed7d72.webp |
| `screenshots/bevel/bevel-60fps-thumbnail-01.png` | Loading state / Energy Bank | https://video.gumlet.io/66b49d08225b7b88f78b7b44/66b4bcfe371d29849d7bd9a9/thumbnail-1-0.png |
| `screenshots/bevel/bevel-60fps-thumbnail-02.png` | Motion thumbnail | https://video.gumlet.io/66b49d08225b7b88f78b7b44/66b4bcfe61d73e2622b35407/thumbnail-1-0.png |
| `screenshots/bevel/bevel-60fps-thumbnail-03.png` | Motion thumbnail | https://video.gumlet.io/66b49d08225b7b88f78b7b44/66b4bd01225b7b88f78c778e/thumbnail-1-0.png |
| `screenshots/bevel/bevel-60fps-thumbnail-04.png` | Motion thumbnail | https://video.gumlet.io/66b49d08225b7b88f78b7b44/66e473a298a6ede244b0a50e/thumbnail-1-0.png |
| `screenshots/bevel/bevel-60fps-thumbnail-05.png` | Motion thumbnail | https://video.gumlet.io/66b49d08225b7b88f78b7b44/67a78b354ce2a75beb140aab/thumbnail-1-0.png |
| `screenshots/bevel/bevel-60fps-thumbnail-06.png` | Motion thumbnail | https://video.gumlet.io/66b49d08225b7b88f78b7b44/692710deb7ac8e3f14180c04/thumbnail-1-0.png |
| `screenshots/chatgpt/chatgpt-appstore-iphone-01.jpg` | Image generation/editing | https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/99/94/c6/9994c63c-d6e8-1289-1e12-6ce146d33193/1_iPhone.jpg/600x1300bb-60.jpg |
| `screenshots/chatgpt/chatgpt-appstore-iphone-02.jpg` | Visual learning response | https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/cb/a6/ed/cba6ed2f-4ce8-373d-19a8-51c4854f0c20/2_iPhone.jpg/600x1300bb-60.jpg |
| `screenshots/chatgpt/chatgpt-appstore-iphone-03.jpg` | Long-form guidance | https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/5e/26/97/5e269786-9cff-988e-c926-b20f8bc085c5/3_iPhone.jpg/600x1300bb-60.jpg |
| `screenshots/chatgpt/chatgpt-appstore-iphone-04.jpg` | Photo-to-writing assistance | https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/9d/f8/e5/9df8e5af-c7ec-e928-dfe6-4379124f5998/4_iPhone.jpg/600x1300bb-60.jpg |
| `screenshots/chatgpt/chatgpt-appstore-iphone-05.jpg` | Voice choice setup | https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/f7/26/b6/f726b6ba-662b-5766-0389-987d8eb2919b/5_iPhone.jpg/600x1300bb-60.jpg |
| `screenshots/chatgpt/chatgpt-appstore-iphone-06.jpg` | Photo understanding | https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/f3/41/0e/f3410e97-8435-e350-98b0-8907f40303fc/6_iPhone.jpg/600x1300bb-60.jpg |
| `screenshots/chatgpt/chatgpt-appstore-iphone-07.jpg` | Creative prompt response | https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/a1/ea/e8/a1eae833-bd13-d46d-47ff-f82e3c93bd93/7_iPhone.jpg/600x1300bb-60.jpg |
| `screenshots/chatgpt/chatgpt-appstore-iphone-08.jpg` | Personalized image edit | https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/9a/da/08/9ada0874-6bed-50df-21f8-a85d462c29a9/8_iPhone.jpg/600x1300bb-60.jpg |
| `screenshots/habitica/habitica-appstore-iphone-01-overview.png` | Main dailies overview | https://is1-ssl.mzstatic.com/image/thumb/PurpleSource115/v4/f7/37/74/f73774c6-3257-296c-0f8e-d513978e1f71/82d6b698-202c-4028-a142-fce77e33184c_1_mockup_5.5.png/392x696bb.png |
| `screenshots/habitica/habitica-appstore-iphone-02-tasks.png` | Task list states | https://is1-ssl.mzstatic.com/image/thumb/PurpleSource125/v4/a5/73/82/a57382c8-a4ae-1f87-8d63-d3041bed9dea/4cb74a63-395f-4035-8e05-a50f00a2771a_2_tasks_5.5.png/392x696bb.png |
| `screenshots/habitica/habitica-appstore-iphone-03-task-creation.png` | Task creation form | https://is1-ssl.mzstatic.com/image/thumb/PurpleSource125/v4/5a/b1/99/5ab1997d-fc08-c2b4-31d3-cbf23db45bb0/801dc732-ced8-4c1d-bf3d-2a1bd8202040_3_creation_5.5.png/392x696bb.png |
| `screenshots/habitica/habitica-appstore-iphone-04-rewards.png` | Rewards economy | https://is1-ssl.mzstatic.com/image/thumb/PurpleSource125/v4/3c/f7/bb/3cf7bb43-ac26-d55a-554e-c9268f7a149d/d0ab92e6-d763-4076-a37c-d6daf40244d9_4_rewards_5.5.png/392x696bb.png |
| `screenshots/habitica/habitica-appstore-iphone-05-quests.png` | Party quest accountability | https://is1-ssl.mzstatic.com/image/thumb/PurpleSource125/v4/41/b3/1b/41b31bb9-5794-def0-083f-df26e0e56ff7/4fbf3edb-d09c-4a20-80a4-f2c3125b7d43_5_quests_5.5.png/392x696bb.png |
| `screenshots/habitica/habitica-appstore-iphone-06-pets.png` | Collection progression | https://is1-ssl.mzstatic.com/image/thumb/PurpleSource115/v4/e7/4e/3e/e74e3e85-b4c1-028c-334c-2dfc37c3048a/053f9b9e-0641-4118-9f1a-f3061c2519fe_6_pets_5.5.png/392x696bb.png |

## Evidence Coverage

| Product | Onboarding | Primary screen | Navigation / IA | Differentiating flow | Paywall / monetization |
|---|---|---|---|---|---|
| Bevel | Yes | Partial | Partial | Health metric detail, logging, mood, AI reminders | Yes |
| ChatGPT | Partial | Yes | Partial | Chat, voice setup, image/photo workflows | Not captured |
| Habitica | Partial | Yes | Yes | Task loops, rewards, quests, collection | Not captured |

## Limitations

- Public sources do not expose every full flow. Missing states should be captured later from installed apps if product decisions depend on them.
- Bevel App Store lookup did not expose iPhone screenshots directly, so the Bevel pack uses the official site, ScreensDesign, and 60fps.design.
- ChatGPT notes rely on current public App Store screenshots plus OpenAI Help Center references for voice behavior.
