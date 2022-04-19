import { collection, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebase.js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const freshHamsters = require('../data.json')
const colRef = collection(db, 'hamsters')

let n = 1
const snapshot = await getDocs(colRef)
snapshot.docs.forEach(async (snapshot) => {
  const docRef = doc(colRef, snapshot.id)
  await deleteDoc(docRef)
})
freshHamsters.forEach(async (data) => {
  await addDoc(colRef, data)
  n++
  if (n === freshHamsters.length) {
    console.log('\x1b[32m', '--- RESET FINISHED ---')
    process.exit()
  }
})
