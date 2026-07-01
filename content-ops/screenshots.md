# Screenshot library

Reusable real screenshots for blog posts. Reference these in any post by URL; capture
new ones only when a post needs something not here. Raw originals are dropped in
`content-ops/incoming/` (gitignored); processed webp copies live under `public/`.

## Click to Censor
Path: `/images/blog/shared/click-to-censor/`

| File | Shows | Suggested alt text |
|---|---|---|
| `selecting-element.webp` | An element outlined in blue with a "Click to censor" tooltip, mid-selection | A webpage element outlined in blue with a "Click to censor" tooltip |
| `mode-menu.webp` | The popup's mode dropdown: Blur, Blackout, Hide | The Click to Censor menu showing Blur, Blackout, and Hide options |
| `popup-gmail.webp` | The popup open over Gmail, list of censored elements, emails blacked out behind | The Click to Censor popup open over Gmail with emails blacked out |
| `popup-gemini-blackout.webp` | The popup open on a page with one element blacked out | The Click to Censor popup open with one element blacked out |
| `blackout-wikipedia.webp` | A Wikipedia page with several elements blacked out | A Wikipedia page with several elements blacked out |
| `blur-and-blackout-drive.webp` | A Google Drive file list with names and owners blurred and blacked out | A Google Drive list with file names and owners hidden by blur and blackout |
| `finance-dashboard.webp` | Mock payments dashboard, all figures and customer data visible (the "before") | A payments dashboard with account balance, revenue, and customer names and emails all visible |
| `finance-dashboard-censored.webp` | Same mock dashboard, balances blacked out and customer names/emails blurred (the "after") | A payments dashboard with the balance and revenue figures blacked out and customer names and emails blurred |
| `crm-customers.webp` | Mock CRM customer list, real names and emails visible (the "before") | A CRM customer list showing customer names, emails, companies, plans, and revenue |
| `crm-customers-censored.webp` | Same CRM list, customer names and emails blurred (the "after") | A CRM customer list with every customer name and email blurred |
| `api-keys-settings.webp` | Mock API keys settings page, secret keys visible (the "before") | A developer API keys settings page with secret keys visible in plain text |
| `api-keys-settings-censored.webp` | Same page, secret key values blacked out (the "after") | The same API keys page with the secret key values blacked out |
| `shared-spreadsheet.webp` | Mock compensation spreadsheet, names/emails/salaries visible (the "before") | A shared spreadsheet of staff compensation with names, emails, and salaries visible |
| `shared-spreadsheet-censored.webp` | Same spreadsheet, names/emails/salaries blurred (the "after") | The same spreadsheet with names, emails, and salaries blurred |
| `zoom-share-picker.webp` | Mock "choose a window to share" picker; one app window selected, Entire Screen/Inbox/Messages flagged private | A screen-share window picker with one app window selected and the entire-screen, inbox, and messages options flagged as private |
| `zoom-sharing-frame.webp` | Mock dashboard inside a green "You're sharing this window" frame, balance and customer data visible (the "before") | A dashboard inside a green "you're sharing this window" frame with the account balance, revenue, and customer names and emails all visible |
| `zoom-sharing-frame-censored.webp` | Same shared-window dashboard, balance blacked out and customer names/emails blurred (the "after") | The same shared-window dashboard with the balance and revenue blacked out and customer names and emails blurred |
| `account-profile.webp` | Mock personal account/profile page, name/email/phone/address visible (the "before") | A personal account profile page showing the full name, email address, phone number, and mailing address in plain text |
| `account-profile-censored.webp` | Same profile page, email and phone blurred, name/address left visible (the "after") | The same account profile page with the email address and phone number blurred while the name and address remain visible |

Mock scenes (for capturing new states) live at `src/components/mocks/`, rendered via dev-only
routes under `src/pages/mock/`. Capture with `npm run shot -- mock/<route> <out-name>`.
Full process: see `content-ops/MOCKS-PLAYBOOK.md`.

## Herald
None yet (app not released; use the mockups on the /herald page if needed).
