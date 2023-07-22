# BRASILEIRO

#### Video Demo: <URL HERE>

#### Description:

Your README.md file should be minimally multiple paragraphs in length, and should explain what your project is, what each of the files you wrote for the project contains and does, and if you debated certain design choices, explaining why you made them. Ensure you allocate sufficient time and energy to writing a README.md that documents your project thoroughly. Be proud of it! If it is too short, the system will reject it.

TODO

`code`

The file tree below represents relevant files to the project. Thus configuration files are ommited.

```
├───public -- Files that Astro copy over to distribution
│   │   BR-map.js
│   │   flagBrazil.svg
│   │
│   └───states -- Files for each coat of arms and flags
│           {UF}-bandeira.svg
│           {UF}-brasao.svg
│
└───src -- Files used by Astro to generate pages
    │
    ├───components
    │       BaseHead.astro
    │       Footer.astro
    │       Header.astro
    │       HeaderNavigation.astro
    │       SelectUF.astro
    │
    ├───map
    │       BR.svg
    │       Brazil.astro
    │
    ├───layouts
    │       BaseLayout.astro
    │       EstadoLayout.astro
    │
    ├───pages
    │   │   index.astro
    │   │   quiz.astro
    │   │
    │   └───uf
    │           estados.json   -- Data source for [UF].astro template
    │           index.astro    -- Main page
    │           [UF].astro     -- Template to generate each page for 27 states.
    │
    ├───scripts
    │       quiz-animation.ts
    │       quiz-helper.ts
    │       quiz.ts
    │
    └───styles
            global.css
            quiz.css

```

For this project I chose AstroJS framework with Supabase to read data.

Each of 27 pages for each state are dynamically generated using the `/src/pages/uf/[UF].astro` template. Data is sourced from `src/pages/uf/estados.json`.

The Brazil map `BR.svg` came [from this project](https://github.com/ahuseyn/interactive-svg-maps). The logic is based in the same mentioned project script but it was heavily modified to match what I had in mind.

```

```
