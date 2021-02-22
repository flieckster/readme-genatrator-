const inquirer=require('inquirer');
const fs=require("fs");
const util=require("util");

const writeFileAsync=util.promisify(fs.writeFile);

// Starting with the series of prompts
function promptUser(){
    return inquirer.prompt([
        {
            type:"input",
            message:"What's your title of your project?",
            name:"title"
        },
        {
             type:"input",
            message:"what is this project description? ",
            name:"description"
         },
        {
            type:"list",
            message:"Please select one of these licenses: ",
            name:"badge",
            choices:[
                "Apache",
                "IBM",
                "MIT",
                "Perl"
            ]
        },
        {
            type:"input",
            message:"Provide your e-mail address: ",
            name:"Email"
        },
        {
            type:"input",
            message:"provide your github ID:",
            name:"github"
        },
      ]);
    } 

    function generateMD(answers){
        var profile=("https://github.com/"+answers.github)
    return `
    # ${answers.title}
    ${answers.badge ==="Apache" ? "Apache"+""+'<br>'+""+"[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)" : answers.badge ==="MIT" ? "MIT"+""+'<br>'+""+"[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)" : answers.badge==="IBM" ? "IBM"+""+'<br>'+""+"[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)" : "Perl"+""+'<br>'+""+"[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)"}
    ## Description 
         ${answers.description}
    ## Table of contents
    * [Description](#description)
    * [Installation](#installation)
    * [Usage](#usage)
    * [License](#license)
    * [Contributing](#contributing)
    * [Tests](#tests)
    * [Questions](#questions)
    ## License
            ${answers.badge}
    ## Questions
    For questions regarding this application please contact me at:
        - E-mail ${answers.Email}
        - Github:
        <${profile}>
        `; 
    }

    async function init() {
        console.log("Welcome to my README generator!");
        try{
            const answers=await promptUser();
            const md=generateMD(answers);
            await writeFileAsync("README.md",md);
            console.log("Success writing to README.md !!");
        } catch(err){
            console.log(err);
        }
    }
    init();