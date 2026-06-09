// Build step: fetch the latest simple.jsp from the ORIGINAL repo,
// strip the JSP directive line, and write it as index.html so Vercel serves it.
const fs = require('fs');

const UPSTREAM =
  'https://raw.githubusercontent.com/TomerNissim/dev-ops-final-project/main/simple.jsp';

fetch(UPSTREAM + '?t=' + Date.now(), { cache: 'no-store' })
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
