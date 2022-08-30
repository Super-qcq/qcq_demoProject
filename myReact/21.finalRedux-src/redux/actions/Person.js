// action.js该文件专门为Person组件生成action对象
import {ADD_PERSON} from '../constant'
export const addPersons = personObj => ({type:ADD_PERSON,data:personObj})