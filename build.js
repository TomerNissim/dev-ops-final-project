// Build step: fetch the latest simple.jsp from the ORIGINAL repo,
// strip the JSP directive line, and write it as index.html so Vercel serves it.
const fs = require('fs');

// Use GitHub API (not raw URL) to bypass the 5-minute CDN cache on raw.githubusercontent.com.
// The API returns the freshest commit content every time.
const API =
  'https://api.github.com/repos/TomerNissim/dev-ops-final-project/contents/simple.jsp';

fetch(API + '?t=' + Date.now(), {
  cache: 'no-store',
  headers: {
    'Accept': 'application/vnd.github.raw',
    'User-Agent': 'vercel-build',
  },
})
  .then((r) => {
    if (!r.ok) throw new Error('Fetch failed: ' + r.status);
    return r.text();
  })
  .then((jsp) => {
    // Remove any <%@ ... %> JSP directives (Vercel can't run Java)
    const html = jsp.replace(/<%@[\s\S]*?%>\s*/g, '');
    fs.writeFileSync('index.html', html);
    console.log('Built index.html from upstream simple.jsp');
  })
  .catch((err) => {
    console.error('Build error:', err);
    process.exit(1);
  });
