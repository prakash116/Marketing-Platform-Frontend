# GitHub Pages preview

The `Deploy preview to GitHub Pages` workflow publishes the static site at
https://prakash116.github.io/Marketing-Platform-Frontend/ after each push to `main`.

This is a preview of the current UI. Login, signup, dashboard data, and marketing
claims are mocked. Replace the placeholder claims and photos before a production
launch. The Pages build sets `NEXT_PUBLIC_APP_ENV=staging` so the mock OTP remains
visible. GitHub Pages cannot run the Next.js server or the separate backend.

When a public backend is available, set the repository Actions variable
`NEXT_PUBLIC_API_URL` to its HTTPS origin and redeploy. The API must permit the
Pages origin for CORS and cookie-based auth. The current UI does not call the
backend yet, so that variable alone will not enable real authentication.

The regular `npm run build` and `npm start` keep using the standalone Node.js
server build. The Pages workflow uses `GITHUB_PAGES=true npx next build` to
produce static files in `out/`.
