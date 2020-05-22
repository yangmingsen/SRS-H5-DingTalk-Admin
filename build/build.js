'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const fs = require('fs')
const readline = require('readline');
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const pluginVersion = '@galaplat.test'
const spinner = ora('building for production...')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
try {
  if (process.argv.includes('--jenkins')) {
    return build()
  }
  const nowVersions = require('../versions.json')
  const checkVersionFlags = ['3', '4', '11']
  const versionFlagName = {
    '3': 'Esrcloud-Production',
    '4': 'Yeqee-Production',
    '11': 'Pre-Production'
  }
  if (~checkVersionFlags.indexOf(process.argv[2])) {
    const keyName = versionFlagName[process.argv[2]]
    const nowVersion = nowVersions[keyName]
    if (nowVersion && nowVersion !== pluginVersion) {
      rl.question('当前打包的plugin版本与发布版本不一致，要继续打包吗？是(Y),否(N)', answer => {
        if (answer.toLowerCase() == 'y' || answer.toLowerCase() == 'yes') {
          build()
          return rl.close()
        } else {
          rl.close()
        }
      })
    } else {
      build()
      return rl.close()
    }
  } else {
    build()
    return rl.close()
  }
} catch (error) {
  build()
  return rl.close()
}

function build () {
  spinner.start()

  rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
      recordVersion()
    })
  })
}

function recordVersion () {
  spinner.start('recording version... \n\n')
  writeFile()
  function writeFile () {
    let versions
    try {
      versions = require('../versions.json')
    } catch (error) {
      return fs.open(path.resolve(__dirname, '../versions.json'), 'wx', (err, fd) => {
        if (err) throw err
        fs.writeFileSync(path.resolve(__dirname, '../versions.json'), '{}')
        writeFile()
      })
    }
    switch (process.argv[2]) {
      case '2':
        versions['Test'] = pluginVersion
        break;
      case '3':
        versions['Esrcloud-Production'] = pluginVersion
        break;
      case '4':
        versions['Yeqee-Production'] = pluginVersion
        break;
      case '10':
        versions['Performance-Test'] = pluginVersion
        break;
      case '11':
        versions['Pre-Production'] = pluginVersion
        break;
    }
    fs.writeFileSync('versions.json', JSON.stringify(versions, null, '  '))
    spinner.stop()
    console.log(chalk.yellow(
      '  Recording Version Done.\n'
    ))
  }
}
