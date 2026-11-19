# Focusi: moving blog, planners and email capture to Shopify

Your live site keeps running on Lovable + Supabase until Phase 5. Phases 1 to 4 only add things in Shopify and test locally, so they cannot break the live site as long as you follow the "Do not" list.

**Do not, until Phase 5 is complete:**
- delete, rotate or regenerate your existing Storefront access token
- deploy the new build anywhere public
- cancel or pause Lovable or Supabase, or delete any Supabase data

Menu names below follow the current Shopify admin. Shopify renames things occasionally, so if a label differs slightly, look for the closest match.

---

## Phase 1: Storefront token permissions (about 10 minutes)

The app reads the blog and planners through the Storefront API. Your token needs two extra read-only permissions. Adding read permissions does not affect products, cart or checkout.

1. In Shopify admin go to **Settings > Apps and sales channels**.
2. Look for **Headless** in the list and open it. You will see a list of storefronts.
3. Open each storefront and compare its **public access token** with the one in `src/lib/shopify.ts`.

**Case A: your token is listed in Headless.**
1. Open that storefront and find the **Storefront API permissions** card. Click **Edit**.
2. Tick the permission for reading **content** (articles, blogs, pages). This corresponds to the scope `unauthenticated_read_content`.
3. Tick the permission for reading **metaobjects**. This corresponds to `unauthenticated_read_metaobjects`.
4. Leave every box that is already ticked as it is. Click **Save**.

(Permissions are shared across all storefronts in the Headless channel. Since you are only adding read access, this is safe.)

**Case B: your token is not listed there.** It was probably created by Lovable's Shopify integration or by a custom app. Do not change it.
1. Install the free **Headless** sales channel from the Shopify App Store if it is not installed.
2. In Headless click **Add storefront**, name it for example "Focusi custom storefront".
3. Set its Storefront API permissions to everything your site already uses (products, product listings, collections, checkouts) plus the two new read permissions above.
4. Copy its **Public access token**.
5. In your project create a file `.env.local` (it is not committed) containing:
	VITE_SHOPIFY_STOREFRONT_TOKEN=paste-the-new-public-token
   The code uses this token when present and falls back to the old one. The live site is unaffected.

---

## Phase 2: Planners (about 30 minutes)

### 2a. Create the definition --Done
1. Go to **Settings > Custom data > Metaobjects** (also reachable from **Content > Metaobjects**). Click **Add definition**.
2. **Name:** `Planner`. Shopify generates the **type** from the name. Check that it reads exactly `planner` before saving. Edit it if not.
3. Add the fields below with **Add field**. After choosing the type, check the field's **key** (shown in the field settings) and edit it to match the Key column exactly.

   | Field name | Key | Field type | Required |
   |---|---|---|---|
   | Title | `title` | Single line text | Yes (click the asterisk) |
   | Description | `description` | Multi-line text | No |
   | File | `file` | File > **File** (not "Image") | Yes |
   | Group name | `group_name` | Single line text | No |
   | Group description | `group_description` | Multi-line text | No |
   | Sort order | `sort_order` | Integer | No |

   The old `icon` column is not needed: the page picks icons from the planner title.
4. Set **Display name** to the Title field.
5. Under **Access**, make sure **Storefronts** is ticked. It is on by default. Without it the app cannot read the planners.
6. Leave **Active-draft status** on. Click **Save**.

### 2b. Add one entry per planner
1. Go to **Content > Metaobjects > Planner > Add entry**.
2. Fill in:
   - **Title**: as shown on the site today.
   - **Description**: short text shown under the title.
   - **File**: click **Add file**, upload the PDF (or pick it if already in **Content > Files**).
   - **Group name**: the exact category name, for example `Free Focus & Task Planners`. Spelling must match for all planners in the same category. Three category names have special handling in the page code: `Free Planning & Progress Planners`, `Free Focus & Task Planners`, `Free Daily Routine Planners`.
   - **Group description**: the same text on every planner in that group.
   - **Sort order**: see below.
3. Set the entry status to **Active** (drafts are invisible to the app) and save.

### 2c. Sort order convention
The old admin page used blocks of 1000 per group. Do the same:
- first group: 0, 1, 2, 3...
- second group: 1000, 1001, 1002...
- third group: 2000, 2001...

Groups are shown in order of their lowest number, files within a group in ascending order.

### 2d. Where to get the current PDFs
Download each one from the live **Free Planners** page (the download button), or from Lovable's storage view. Keep the originals until Phase 5 is finished.

---

## Phase 3: Blog posts (about 10 to 20 minutes per post)

1. Go to **Content > Blog posts** (older admin: Online Store > Blog posts). If you have no blog yet, Shopify creates one named "News".
2. Find your blog's **handle**: click **Manage blogs**, open the blog, and look at the URL handle under **Search engine listing**. A default blog has the handle `news`. If yours is different, edit `BLOG_HANDLE` in `src/lib/shopifyContent.ts`.
3. Click **Add blog post** and fill in:
   - **Title**.
   - **Content**: the post body.
   - **Excerpt**: the preview text shown on the blog list and home page.
   - **Featured image**: this is the old cover image.
   - **Author**: name shown on the post.
   - **Visibility**: Visible, with a publish date that is not in the future.
   - **URL handle** (under Search engine listing): set it to the old post's slug. This keeps old links such as `/blog/my-post` working.
4. **Images inside the post:** insert them with the editor's image button so they are uploaded to Shopify. Do not leave images that still point at your Supabase storage; they will disappear when Supabase is turned off. To check, open the editor's **Show HTML** (`<>`) view and search for `supabase.co`.
5. Save.

If you have many posts, tell me how many. I can write an import script that downloads each post's images, uploads them to Shopify Files, rewrites the links and creates the articles through the Admin API. For fewer than about 10 posts, doing it by hand is faster.

---

## Phase 4: Verify locally (live site still untouched)

### 4a. Check the API directly
Replace the placeholders and run in a terminal:
```
curl -s https://ec49b1-17.myshopify.com/api/2025-07/graphql.json \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Storefront-Access-Token: YOUR_PUBLIC_TOKEN" \
  -d '{"query":"{ metaobjects(type:\"planner\", first:5){ edges{ node{ id fields{ key value } } } } blog(handle:\"news\"){ articles(first:3){ edges{ node{ title handle } } } } }"}'
```
You should see your planner fields and article titles. If you see `ACCESS_DENIED`, a scope from Phase 1 is missing on the token you used.

### 4b. Check the app
1. Run `npm run dev` and open `/blog`, a post, `/shop` (latest posts section) and `/free-planners`.
2. On `/free-planners` submit a test email and download a planner.
3. Open **Customers** in Shopify admin. Within a minute or two the email should appear, subscribed to email marketing and tagged `planner-lead` plus the planner name.
4. For step 3 when running locally, create `.env.local` with
   ```
   VITE_SHOPIFY_STORE_URL=https://your-primary-domain
   ```
   using your store's **primary domain** (Settings > Domains), not the `myshopify.com` address.

### 4c. Troubleshooting

| Symptom | Likely cause |
|---|---|
| Blog list is empty | Wrong `BLOG_HANDLE`; posts not Visible; publish date in the future; content scope missing |
| Planners list is empty | Metaobject type is not exactly `planner`; entries are Draft; Storefronts access off; metaobjects scope missing; entry has no title or no file |
| A planner is missing | It has no file, or no title (the app hides it on purpose) |
| Groups in the wrong order | Check Sort order numbers |
| Email not in Customers | Wrong or `myshopify.com` domain in `VITE_SHOPIFY_STORE_URL`; wait a couple of minutes; Shopify can silently block suspicious submissions |
| Images missing in posts | They still point at Supabase or were pasted from the old site |

---

## Phase 5: Cutover

Only start when all of these are true:
- [ ] every blog post exists in Shopify with the same URL handle, featured image, excerpt and working images
- [ ] every planner PDF is uploaded and shows correctly in `/free-planners`
- [ ] `/blog`, a post and `/free-planners` all work locally
- [ ] a test email appeared in Customers

Then:
1. Deploy the new build the same way you deployed the current one. If your host supports previews, use a preview URL first and test it.
2. Test the live site: blog, a post, free planners, add to cart and checkout.
3. **Rollback if needed:** redeploy the previous build. It still works as long as Supabase is still running.
4. Keep Lovable and Supabase running for 2 to 4 weeks after cutover as a safety net.
5. Before turning them off, export from Supabase: the `planner_downloads` table (collected emails) and anything else you want to keep. Importing these emails into Shopify customers should only be done for people who agreed to receive marketing. Check your consent obligations before importing.
6. After that period you can safely end the Lovable and Supabase subscriptions.
