const fs = require('fs')

function name() {
  return new Promise((resolve, reject) => {
    fs.readFile('./文本文件/name.md', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function age() {
  return new Promise((resolve, reject) => {
    fs.readFile('./文本文件/age.md', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function address() {
  return new Promise((resolve, reject) => {
    fs.readFile('./文本文件/address.md', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}
async function fn() {
  try {
    const a = await name()
    const b = await age()
    const c = await address()
    console.log(`${a}${b}${c}`)
  } catch (e) {
    console.warn(e)
  }
}
fn()