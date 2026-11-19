# Accessing the Focusi codebase as a developer

This is a how-to answer, so there are no code changes. Approving or skipping the plan both work.

## Option 1: Edit inside Lovable
- Open the Code Editor with the code icon above the preview. Cmd+Shift+F (Ctrl+Shift+F on Windows) opens it with search focused.
- Anyone can view the code. Editing it needs Editor access or higher on the project and a paid workspace plan.
- You can also just describe the change in chat.

## Option 2: Work locally through GitHub (best for developers)
1. A project or workspace owner or admin opens Project settings -> Git (or the chat's + menu -> Project -> GitHub) and connects GitHub. This creates a new private repository.
2. Give your GitHub account write access to that repository.
3. Clone it, run `npm i` and `npm run dev` (Vite, React, TypeScript, Tailwind).
4. Push to the synced branch, usually `main`. Lovable pulls your changes automatically, and its own edits push back to GitHub.

Notes:
- Only the synced branch syncs. Merge feature branches into it.
- Avoid force-pushing or rebasing the synced branch.
- The sync does not apply backend changes like database migrations or server functions. Ask in chat to apply them.

## Option 3: One-off download
On paid plans: Project settings -> Git -> Download codebase. This is a snapshot only and does not sync back.

## Access
If you don't have access yet, the owner clicks Share (top right), invites your email, and picks Editor or Admin.
