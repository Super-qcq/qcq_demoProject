import _ from 'lodash'
const arr1 = [
    { id: '01', name: 'qcq1', age: 24 },
    { id: '02', name: 'qcq2', age: 25 },
    { id: '03', name: 'qcq3', age: 26 },  
]
const arr2 = [
    { id: '01', name: 'qcq1', age: 24 },
    { id: '02', name: 'qcq2', age: 25 },
    { id: '03', name: 'qcq3', age: 26 },  
]
console.log(_.isEqual(arr1,arr2))