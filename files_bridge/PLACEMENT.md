# Bridge Program — file placement

Copy each file to the matching path in your repo (~/karan):

| This file | Goes to |
|---|---|
| data/bridge-program.json | data/bridge-program.json |
| components/sections/BridgeProgram.tsx | components/sections/BridgeProgram.tsx |
| components/sections/BridgeProgramCta.tsx | components/sections/BridgeProgramCta.tsx |
| components/sections/BridgeProgram.module.css | components/sections/BridgeProgram.module.css |
| app/bridge-program/page.tsx | app/bridge-program/page.tsx |
| app/bridge-program/page.module.css | app/bridge-program/page.module.css |

## The ONLY existing-file edit — data/site.json

Add the Bridge Program entry to navLinks (after Early Learning Centre):

    "navLinks": [
      { "label": "Home", "href": "/" },
      { "label": "Services", "href": "/services" },
      { "label": "Early Learning Centre", "href": "/early-learning-centre" },
      { "label": "Bridge Program", "href": "/bridge-program" },
      { "label": "About", "href": "/about" },
      { "label": "Gallery", "href": "/gallery" },
      { "label": "Contact", "href": "/contact" }
    ],

Updates both the navbar and the footer Quick Links automatically.

NOTE ON MENU LENGTH: you'll now have 7 top-level items, two of them long
("Early Learning Centre", "Bridge Program"). On desktop this may get tight.
If so, consider shorter labels ("Early Learning", "Bridge Program") OR
grouping both under a "Programs" dropdown later. Check it locally first.

## Test locally
    npm run dev
    # open http://localhost:3000/bridge-program

## Ship it (you can add this to your existing branch, or a new one)
    git add .
    git commit -m "Add Bridge Program page (Std I-V skill-gap bridges)"
    git push
