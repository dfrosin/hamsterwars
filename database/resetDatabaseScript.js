import { collection, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebase.js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const freshHamsters = require('../data.json')
const colRef = collection(db, 'hamsters')

console.log('resetting...')

const snapshot = await getDocs(colRef)
snapshot.docs.forEach(async (snapshot) => {
  const docRef = doc(colRef, snapshot.id)
  await deleteDoc(docRef)
})

let isFinished = false
let n = 1
freshHamsters.forEach(async (data) => {
  if (!isFinished) {
    console.log('\x1b[32m', '--- DELETED ALL DOCS ---')
    console.log('\x1b[0m', 'adding new docs from JSON file...')
  }
  isFinished = true
  await addDoc(colRef, data)
  n++
  if (n === freshHamsters.length) {
    console.log('\x1b[32m', '--- RESET FINISHED ---')
    process.exit()
  }
})
