const fs = require('fs')
const p = new Promise((resolve, reject) => {
  fs.readFile('./文本文件/name.md', (err, data) => {
    if (err) reject(err)
    resolve(data)
  })
})
p.then(value => {
  return new Promise((resolve, reject) => {
    fs.readFile('./文本文件/age.md', (err, data) => {
      if (err) reject(err)
      resolve([value, data])//将两次获取的数据放入数组
    })
  })
}).then(value => {
  return new Promise((resolve, reject) => {
    fs.readFile('./文本文件/address.md', (err, data) => {
      if (err) reject(err)
      value.push(data) //将三个数据都放入数组
      resolve(value)
    })
  })

}).then(value => {
  console.log(value.toString())

})