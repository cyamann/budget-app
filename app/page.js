"use client";
import { currencyFormatter } from '../app/lib/utils';
import ExpenseCategoryItem from '@/components/ExpenseCategoryItem';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { useState } from 'react';
import Modal from '@/components/Modal';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [savings, setSavings] = useState(100);
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Eğlence", color: "#FF6384", amount: 500 },
    { id: 2, title: "Kira", color: "#36A2EB", amount: 7000 },
    { id: 3, title: "Yakıt", color: "#FFCE56", amount: 2000 },
  ]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

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

    if (!isNaN(newExpenseAmount) && newExpenseAmount > 0) {
      setSavings((prevSavings) => Math.max(prevSavings - newExpenseAmount, 0));
      setExpenses((prevExpenses) => [
        ...prevExpenses,
        {
          id: prevExpenses.length + 1,
          title: description || `Harcama ${prevExpenses.length + 1}`,
          color: getRandomColor(),
          amount: newExpenseAmount,
        },
      ]);
    }

    resetModal();
  };

  const resetModal = () => {
    setAmount("");
    setDescription("");
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
          <div className="input-group">
            <label htmlFor="gelirMiktar">Gelir Miktarı</label>
            <input
              name="gelirMiktar"
              value={amount}
              onChange={handleAmountChange}
              required
              step={0.1}
              type="number"
              min={0.1}
              placeholder="Gelir Miktarını Yazın"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="gelirAçıklama">Açıklama</label>
            <input
              name="gelirAçıklama"
              value={description}
              onChange={handleDescriptionChange}
              required
              type="text"
              placeholder="Açıklamayı Yazın"
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
          <div className="input-group">
            <label htmlFor="harcamaMiktar">Harcama Miktarı</label>
            <input
              name="harcamaMiktar"
              value={amount}
              onChange={handleAmountChange}
              required
              step={0.1}
              type="number"
              min={0.1}
              placeholder="Harcama Miktarını Yazın"
            />
          </div>
          <div className="flex flex-col gap-4">
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
          <button type="submit" className="btn btn-primary">
            Ekle
          </button>
        </form>
      </Modal>

      <main className="container max-w-2xl px-6 py-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">Birikim</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(savings)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => setShowAddExpenseModal(true)}
            className="btn btn-primary"
          >
            + Harcamalar
          </button>
          <button
            onClick={() => setShowAddIncomeModal(true)}
            className="btn btn-primary-outline"
          >
            + Gelirler
          </button>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">İstatistikler</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Harcamalar",
                    data: expenses.map((expense) => expense.amount),
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
