# Early Learning Centre — file placement (with logos)

Copy each file to the matching path in your repo (~/karan):

| This file | Goes to |
|---|---|
| public/ankuram.png | public/ankuram.png |
| public/medha-vanam.png | public/medha-vanam.png |
| data/early-learning-centre.json | data/early-learning-centre.json |
| components/sections/EarlyLearningCentre.tsx | components/sections/EarlyLearningCentre.tsx |
| components/sections/EarlyLearningCentreClient.tsx | components/sections/EarlyLearningCentreClient.tsx |
| components/sections/EarlyLearningCentre.module.css | components/sections/EarlyLearningCentre.module.css |
| app/early-learning-centre/page.tsx | app/early-learning-centre/page.tsx |
| app/early-learning-centre/page.module.css | app/early-learning-centre/page.module.css |

NOTE: the logo files are renamed to web-safe names (no spaces):
  "medha vanam.png"  ->  public/medha-vanam.png
The JSON already points at /ankuram.png and /medha-vanam.png, so keep these exact names.

## The ONLY existing-file edit — data/site.json

Add the Early Learning Centre entry to the navLinks array (after Services):

    "navLinks": [
      { "label": "Home", "href": "/" },
      { "label": "Services", "href": "/services" },
      { "label": "Early Learning Centre", "href": "/early-learning-centre" },
      { "label": "About", "href": "/about" },
      { "label": "Gallery", "href": "/gallery" },
      { "label": "Contact", "href": "/contact" }
    ],

This single edit updates BOTH the top navbar and the footer Quick Links.

## Test locally
    npm run dev
    # open http://localhost:3000/early-learning-centre

## Ship it
    git checkout -b early-learning-centre
    git add .
    git commit -m "Add Early Learning Centre page with Ankuram & Medha Vanam logos"
    git push -u origin early-learning-centre
    # open a Pull Request on GitHub, then merge to main when happy
