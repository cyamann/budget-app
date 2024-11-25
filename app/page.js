"use client";
import { currencyFormatter } from '../app/lib/utils';
import { Doughnut } from "react-chartjs-2";
import Modal from '@/components/Modal';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [savings, setSavings] = useState(100);
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Eğlence", color: "#FF6384", amount: 500, date: new Date(), limit: 600 },
    { id: 2, title: "Kira", color: "#36A2EB", amount: 7000, date: new Date(), limit: 8000 },
    { id: 3, title: "Yakıt", color: "#FFCE56", amount: 2000, date: new Date(), limit: 2500 },
  ]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [limit, setLimit] = useState("");

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleLimitChange = (e) => setLimit(e.target.value);

  // Uyarı kontrolü
  useEffect(() => {
    expenses.forEach((expense) => {
      if (expense.amount >= expense.limit * 0.8) {
        alert(
          `${expense.title} kategorisi için belirlenen bütçenin %80'ine ulaşıldı! (${currencyFormatter(
            expense.amount
          )}/${currencyFormatter(expense.limit)})`
        );
      }
    });
  }, [expenses]);

  const addIncomeHandler = (e) => {
    e.preventDefault();
    const newIncomeAmount = parseFloat(amount);

    if (!isNaN(newIncomeAmount) && newIncomeAmount > 0) {
      setSavings((prevSavings) => prevSavings + newIncomeAmount);
    }

    resetModal();
  };

  const addExpenseHandler = (e) => {
    e.preventDefault();
    const newExpenseAmount = parseFloat(amount);
    const newExpenseLimit = parseFloat(limit);

    if (!isNaN(newExpenseAmount) && newExpenseAmount > 0 && !isNaN(newExpenseLimit)) {
      setSavings((prevSavings) => Math.max(prevSavings - newExpenseAmount, 0));
      setExpenses((prevExpenses) => [
        ...prevExpenses,
        {
          id: prevExpenses.length + 1,
          title: description || `Harcama ${prevExpenses.length + 1}`,
          color: getRandomColor(),
          amount: newExpenseAmount,
          date: new Date(),
          limit: newExpenseLimit,
        },
      ]);
    }

    resetModal();
  };

  const resetModal = () => {
    setAmount("");
    setDescription("");
    setLimit("");
    setShowAddIncomeModal(false);
    setShowAddExpenseModal(false);
  };

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;

  return (
    <>
      {/* Gelir Ekle Modal */}
      <Modal show={showAddIncomeModal} onClose={setShowAddIncomeModal}>
        <form onSubmit={addIncomeHandler} className="input-group">
          <div>
            <label htmlFor="gelirMiktar">Gelir Miktarı</label>
            <input
              name="gelirMiktar"
              value={amount}
              onChange={handleAmountChange}
              required
              type="number"
              placeholder="Gelir Miktarını Yazın"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Ekle
          </button>
        </form>
      </Modal>

      {/* Harcama Ekle Modal */}
      <Modal show={showAddExpenseModal} onClose={setShowAddExpenseModal}>
        <form onSubmit={addExpenseHandler} className="input-group">
          <div>
            <label htmlFor="harcamaMiktar">Harcama Miktarı</label>
            <input
              name="harcamaMiktar"
              value={amount}
              onChange={handleAmountChange}
              required
              type="number"
              placeholder="Harcama Miktarını Yazın"
            />
          </div>
          <div>
            <label htmlFor="harcamaAçıklama">Açıklama</label>
            <input
              name="harcamaAçıklama"
              value={description}
              onChange={handleDescriptionChange}
              required
              type="text"
              placeholder="Açıklamayı Yazın"
            />
          </div>
          <div>
            <label htmlFor="bütçeLimiti">Bütçe Limiti</label>
            <input
              name="bütçeLimiti"
              value={limit}
              onChange={handleLimitChange}
              required
              type="number"
              placeholder="Bütçe Limitini Yazın"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Ekle
          </button>
        </form>
      </Modal>

      <main className="container max-w-2xl px-6 py-6 mx-auto">
        <section>
          <small>Birikim</small>
          <h2>{currencyFormatter(savings)}</h2>
        </section>

        <section>
          <button onClick={() => setShowAddExpenseModal(true)} className="btn btn-primary">
            + Harcamalar
          </button>
          <button onClick={() => setShowAddIncomeModal(true)} className="btn btn-secondary">
            + Gelirler
          </button>
        </section>

        <section>
          <h3>İstatistikler</h3>
          <Doughnut
            data={{
              labels: expenses.map((expense) => expense.title),
              datasets: [
                {
                  label: "Harcamalar",
                  data: expenses.map((expense) => expense.amount),
                  backgroundColor: expenses.map((expense) => expense.color),
                },
              ],
            }}
          />
        </section>

        <section>
          <h3>Giderler</h3>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                <strong>{expense.title}</strong> - {currencyFormatter(expense.amount)} (
                {expense.date.toLocaleDateString()}) - Limit: {currencyFormatter(expense.limit)}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
