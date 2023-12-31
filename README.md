# Bandeiras do Brasil

#### Why?

This project was done as the final project to the [CS50x course.](https://cs50.harvard.edu/x/2023/project/).

demo: [bandeiras.pages.dev](https://bandeiras.pages.dev/)
<br/>

<img src='https://github.com/vasfvitor/bandeiras/blob/master/samples/sample1.gif' width='480"'>
<br/>

<img src='https://github.com/vasfvitor/bandeiras/blob/master/samples/sample2.gif' width='480"'>
<br/>

## Made with Astro + Tailwind + Typescript

#### Video Demo: <[VIDEO](https://youtu.be/nzZ-GWVJp7E)>

#### Description:

Get to know each flag and coat of arms from Brazil. This project contains pictures of all flags and coat of arms, along with descriptions (written in Portuguese). To further expand, there's a quiz to challenge your knowledge.

Each of 27 pages for each state are dynamically generated by Astro using `/src/pages/uf/[UF].astro` template. Data is sourced from `src/pages/uf/estados.json`. Flags and coat of arms are in a lightbox where one can zoom and see the details. 

The quiz is written entirely in typescript. Features includes random sorting of flags, score based on number of tries vs correct answers, visual indication of whether the question was answered in first try (green), before the tip (yellow) and with the tip (red). The tip is actually the answer, and it shows up in the 5th wrong try. It works both on mobile and desktop, note that on mobile the page will auto scroll to the answer position.

The Brazil map `BR.svg` came [from this project](https://github.com/ahuseyn/interactive-svg-maps). The map code logic is based in the same mentioned project script, but it was redone in TypeScript and heavily modified to match my ideas.


### Commands


| Command            | Action                                             |
| :------------------| :------------------------------------------------- |
| `pnpm install`     | Installs dependencies                              |
| `pnpm dev`         | Local dev server at `localhost:3000`               |
| `pnpm build`       | Build to `./dist/`                                 |
| `pnpm preview`     | Preview your build located at `./dist/`            |
| `pnpm format`      | Prettier format                                    | 
| `pnpm astro ...`   | Run CLI commands like `astro add`, `astro preview` |

<br>

The file tree below represents relevant files to the project. Configuration files are ommited.

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
    ├───map -- Map of Brazil component
    │       BR.svg
    │       Brazil.astro
    │
    ├───layouts
    │       BaseLayout.astro
    │       EstadoLayout.astro
    │
    ├───pages
    │   │   index.astro -- Main page
    │   │   quiz.astro  -- Quiz page
    │   │
    │   └───uf          -- /uf route with dynamic generated pages
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

### Improvements Ideas

Better touch interaction specially for small touch areas. Perhaps a button to navigate the map from 1 to 27.

### Contributing

If you have any idea, suggestions or find any bugs, feel free to open an issue or create a pull request. I would be happy to listen and take action.


