const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)
const { resolve } = require('path')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
var clone = require('git-clone');
var cmd=require('node-cmd');

let tplList = require(`${__dirname}/../templates`)

const question = [
  {
    type: 'input',
    name: 'name',
    message: 'Template name:',
    validate (val) {
      if (tplList[val]) {
        return true
      } else if (val === '') {
        return 'Name is required!'
      } else if (!tplList[val]) {
        return 'This template doesn\'t exists.'
      }
    }
  },
  {
    type: 'input',
    name: 'project',
    message: 'Project name:',
    validate (val) {
      if (val !== '') {
        return true
      }
      return 'Project name is required!'
    }
  },
  {
    type: 'input',
    name: 'place',
    message: 'Where to init the project:',
    default: './'
  },{
    type: 'input',
    name: 'originUrl',
    message: 'Where to push the project:',
    validate (val) {
    if (val !== '') {
      return true
    }
    return 'push link is required!'
    }
  }
]

module.exports = prompt(question).then(({ name, project, place,originUrl}) => {
  const gitPlace = 'git@git.cai-inc.com:ZCY-FE/framework/zcy-projectTemplate-front.git'
  const gitBranch = name
  const gitcheck ={checkout: gitBranch }
  const spinner = ora('Downloading template...')

  spinner.start()
console.log(chalk.green(`project link : ${gitPlace}`))
console.log(chalk.green(`project branch : ${gitBranch}`))
clone(gitPlace,place+project,gitcheck,function(err){
  spinner.stop();
  console.log(chalk.green('New project has been initialized successfully!'));
  //console.log(chalk.green('start cmd'));

  cmd.get(
        `
        cd ${place+project}
        git remote remove origin
        git branch -d master
        git branch -m ${gitBranch} master
        git remote add origin ${originUrl}
        `,
        function(err, data, stderr){
            if (!err) {
              console.log('success!')
            } else {
              console.log('error', err)
            }
          }
        );
})

  //download(`${gitPlace}#${gitBranch}`, `${place}/${project}`, (err) => {
  //  if (err) {
  //    console.log(chalk.red(err))
  //    process.exit()
  //  }
  //  spinner.stop()
  //  console.log(chalk.green('New project has been initialized successfully!'))
  //})
})
