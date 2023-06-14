# BRASILERO

#### Video Demo: <URL HERE>

#### Description:

TODO

For this project I chose AstroJS framework. I could well enough code each of the 27 pages for each state in Brazil but since I learnt to avoid repetition I decided that vanilla HTML + CSS + JS would be too much a hassle.

Project Structure:
|-- .bowerrc
|-- .jshintrc
|-- .jshintrc2
|-- Gruntfile.js
|-- README.md
|-- bower.json
|-- karma.conf.js
|-- package.json
|-- app
|-- app.js
|-- db.js
|-- directoryList.md
|-- index.html
--generate

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

For this reason I decided to use a database and found out about Xata on Astro.js documentation, so I gave it a try. Note:

Another challenge was to make the project mobile friendly.

The map main logic came from and adaptation from https://github.com/ahuseyn/interactive-svg-maps

explains your project.

at least be several hundred words that describe things in detail!

Your README.md file should be minimally multiple paragraphs in length,
should explain what your project is,
what each of the files you wrote for the project contains and does,
and if you debated certain design choices,
explaining why you made them.

Ensure you allocate sufficient time and energy to writing a README.md that documents your project thoroughly.
Be proud of it! If it is too short, the system will reject it.

Execute the submit50 command below from within your project directory (or from whichever directory contains README.md file and your project’s code, which must also be submitted), logging in with your GitHub username and password when prompted. For security, you’ll see asterisks instead of the actual characters in your password.
