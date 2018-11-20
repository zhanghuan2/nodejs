const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)

const question = [
  {
    type: 'input',
    name: 'name',
    message: 'Set the custom name of the template:',
    validate (val) {
      if (tplList[val]) {
        return 'Template is existed!'
      } else if (val === '') {
        return 'Name is required!'
      } else {
        return true
      }
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'description of the template:',
    validate (val) {
      if (val !== '') {
        return true
      }
      return 'description is required!'
    }
  }
]

module.exports = prompt(question).then(({ name, description}) => {
  tplList[name] = {}
  tplList[name]['description'] = description
  writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
    listTable(tplList, 'New template has been added successfully!')
  })
})
