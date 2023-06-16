# BRASILEIRO

#### Video Demo: <URL HERE>

#### Description:

TODO

For this project I chose AstroJS framework with Supabase to read data.

Each of 27 pages for each state are dynamically generated using the /src/pages/uf/[UF].astro template. All data comes from two table. Tha main table contains the bulk of information about each state. The second table is just a list with the names of each region, 5 total.

At times I wonderer If I needed a database running. To spin thing ups I started with a json file as data source, but it was getting in the way of adding more data for each of 27 states could easily get out of control.

Totalizing 164 lines, for each state I had this template:
{
"sigla": "AC",
"nome": "Acre",
"capital": "Rio Branco",
"regiao": "North (Norte)"
}

Soon I needed to add more information as for example details from the symbols and motto:
{
"sigla": "AC",
"nome": "Acre",
"capital": "Rio Branco",
"regiao": "North (Norte)",
"meaning": {
"flag": "The color X means Y",
"coat": "The symbol X means Y"
},
"moto": {
"original": = "Ego sum qui fortissimum et dux (latin)",
"trans": = "I am the strongest and the one who leads"
}
},

That would add at minimum 216 lines to manage with possible much more due to longer lines in meaning section.

For this reason I decided to use a read-only database and found out about Supabase on Astro.js documentation and that's what under the hood.
Another challenge was to make the project mobile friendly.

The Brazil map (BR.svg) came [from this project](https://github.com/ahuseyn/interactive-svg-maps). The logic came from the same mentioned project script but it was heavily modified to match the current projects idea.


at least be several hundred words that describe things in detail!

Your README.md file should be minimally multiple paragraphs in length,
should explain what your project is,
what each of the files you wrote for the project contains and does,
and if you debated certain design choices,
explaining why you made them.

Ensure you allocate sufficient time and energy to writing a README.md that documents your project thoroughly.
Be proud of it! If it is too short, the system will reject it.

Execute the submit50 command below from within your project directory (or from whichever directory contains README.md file and your project’s code, which must also be submitted), logging in with your GitHub username and password when prompted. For security, you’ll see asterisks instead of the actual characters in your password.

```
bandeiras
├─ .npmrc
├─ .vscode
│  ├─ extensions.json
│  └─ launch.json
├─ astro.config.mjs
├─ LICENSE.md
├─ package.json
├─ pnpm-lock.yaml
├─ public
│  ├─ BR-map.js    // Script to make the interactive map work
│  ├─ Brazil.svg   // Brazil flag
│  ├─ favicon.svg
│  └─ states // SVG for each state. Sourced from Wikipedia and slighty modified to size and zoom properly
├─ README.md
├─ src
│  ├─ components
│  │  ├─ BaseHead.astro
│  │  ├─ Footer.astro
│  │  ├─ Header.astro     
│  │  ├─ HeaderLink.astro
│  │  ├─ ListUF.astro     // Select component for each state
│  │  └─ maps
│  │     ├─ BR.svg        // SVG with each state as a separated path and data attributes with info about each of them.
│  │     └─ Brazil.astro  // Brazil map component
│  ├─ consts.ts
│  ├─ env.d.ts
│  ├─ layouts
│  │  ├─ BaseLayout.astro // Layout for the main page
│  │  └─ EstadoLayout.astro // Layout for each state page
│  ├─ pages
│  │  ├─ index.astro // Main page
│  │  └─ uf
│  │     ├─ index.astro // Alternative main page /uf
│  │     └─ [UF].astro  // Template for each state
│  ├─ scripts
│  │  └─ data.json      // Remove
│  ├─ styles
│  │  └─ global.css     // Global css
│  └─ supa.ts
├─ supabase
│  └─ functions
│     └─ .vscode
├─ tailwind.config.cjs
└─ tsconfig.json

```
