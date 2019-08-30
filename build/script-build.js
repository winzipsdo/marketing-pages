// todo refactor
const fs = require('fs')
const inquirer = require('inquirer')
const child_process = require('child_process')

const pages = fs.readdirSync('./pages/')

function start(dir) {
  const DIR = `./pages/${dir}`
  const childProcess = child_process.exec(`DIR=${DIR} npm run vue-build`)
  childProcess.stdout.pipe(process.stdout)
  childProcess.stderr.pipe(process.stdout)
}

if (process.argv[2]) {
  start(process.argv[2])
} else {
  inquirer.prompt([{
    type: 'list',
    name: 'dir',
    message: 'Choose your project directory: ',
    default: pages[0],
    choices: pages,
  }]).then((answer) => { start(answer.dir) })
}
