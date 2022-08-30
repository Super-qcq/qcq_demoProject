const util = require('util')
const fs = require('fs')
let file = util.promisify(fs.readFile)
async function main() {
  try {
    const result1 = await file('./文本文件/name.md')
    const result2 = await file('./文本文件/age.md')
    const result3 = await file('./文本文件/address.md')
    console.log([result1, result2, result3].toString())
  } catch (e) {
    console.warn(e.code)
  }
}
main()