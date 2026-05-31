#!/usr/bin/env python3
"""One-off, idempotent propagation of GA4 + favicon/manifest + working mobile nav
across all site pages. Safe to re-run. Deleted after use."""
import re, sys

PAGES = [
    "about.html", "cv.html", "contact.html", "agents.html", "blog.html",
    "featuredproject.html", "casestudy.html", "playwright.html", "pythonBDD.html",
    "restAssured.html", "performance.html", "python_practice_sandbox.html",
    "sql_practice_sandbox.html", "book.html", "TestAutomationPlayground.html",
]

HEAD_BLOCK = """    <!-- Favicon & Web App Manifest -->
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="favicon.svg">
    <link rel="manifest" href="site.webmanifest">

    <!-- ============================================================
         Google Analytics 4
         ACTION REQUIRED: replace G-XXXXXXXXXX with your real GA4
         Measurement ID (Admin -> Data Streams -> Web in analytics.google.com)
         ============================================================ -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
    </script>
</head>"""

for path in PAGES:
    try:
        with open(path, encoding="utf-8") as fh:
            text = fh.read()
    except FileNotFoundError:
        print(f"SKIP (missing): {path}")
        continue

    actions = []
    original = text

    # 1) Head additions (GA4 + favicon + manifest) — only if GA4 not already present
    if "gtag/js?id=" not in text and "</head>" in text:
        text = text.replace("</head>", HEAD_BLOCK, 1)
        actions.append("head(GA4+favicon)")

    # 2) Mobile nav: add toggle button + id on the first .nav-links list
    if "nav-toggle" not in text:
        m = re.search(r'([ \t]*)<ul class="nav-links"', text)
        if m:
            indent = m.group(1)
            toggle = (
                f'{indent}<button class="nav-toggle" aria-label="Toggle navigation menu" '
                f'aria-expanded="false" aria-controls="primary-nav">\n'
                f'{indent}    <span class="menu-label">Menu</span>\n'
                f'{indent}    <span class="hamburger"></span>\n'
                f'{indent}</button>\n'
            )
            # insert toggle immediately before the <ul ...> and add the id
            start = m.start()
            ul_tag_end = text.index(">", start) + 1
            ul_tag = text[m.end() - len('<ul class="nav-links"'):ul_tag_end]
            new_ul_tag = ul_tag.replace('class="nav-links"', 'class="nav-links" id="primary-nav"', 1)
            text = text[:m.end() - len('<ul class="nav-links"')] + new_ul_tag + text[ul_tag_end:]
            # now re-find insertion point (indent + <button...) before the ul line
            insert_at = text.index(f'{indent}<ul class="nav-links" id="primary-nav"')
            text = text[:insert_at] + toggle + text[insert_at:]
            actions.append("nav-toggle")

    # 3) Ensure script.js is loaded (needed for the toggle) — only if a nav exists
    if "primary-nav" in text and "script.js" not in text and "</body>" in text:
        text = text.replace("</body>", '    <script src="script.js"></script>\n</body>', 1)
        actions.append("script.js")

    if text != original:
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(text)
        print(f"UPDATED {path}: {', '.join(actions)}")
    else:
        print(f"unchanged {path}")
