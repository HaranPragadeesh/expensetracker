// js/data/expenses.js
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "../firebase.js";

const expensesRef = collection(db, "expenses");

export function listenToExpenses(callback) {
  const q = query(expensesRef, orderBy("date", "desc"));

  return onSnapshot(q, snapshot => {
    const expenses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(expenses);
  });
}

export async function addExpense(expense) {
  await addDoc(expensesRef, {
    amount: expense.amount,
    tag: expense.tag,
    note: expense.note,
    color: expense.color,
    date: expense.date,
    createdAt: serverTimestamp()
  });
}
