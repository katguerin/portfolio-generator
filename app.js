const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'what is your name? (required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('please enter  your name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'please enter your github username'
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'would you like to enter some information about yourself for an "about section"?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'provide some information about yourself:',
            when: ({ confirmAbout }) => confirmAbout
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
  =================
  Add a New Project
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'what is the name of your project?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'provide a description of the project (Required)'
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'what did you this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'enter the github link to your project. (Required)'
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    })
}
  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);
  });







//   .then(projectData => {
//     portfolioData.projects.push(projectData);
//     if (projectData.confirmAddProject) {
//       return promptProject(portfolioData);
//     } else {
//       return portfolioData;
//     }
//   });
//   .then(projectAnswers => console.log(projectAnswers));


// const fs = require('fs');
// const generatePage = require('./src');
//...

// const pageHTML = generatePage(portfolioData);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });