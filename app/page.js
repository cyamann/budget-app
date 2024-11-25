"use client";
import { currencyFormatter } from '../app/lib/utils';
import ExpenseCategoryItem from '@/components/ExpenseCategoryItem';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { useState } from 'react';
import Modal from '@/components/Modal';
// ChartJS modülünü kaydedin
ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: "Eğlence",
    color: "#000",
    amount: 500
  },
  {
    id: 2,
    title: "Kira",
    color: "#000",
    amount: 7000
  },
  {
    id: 3,
    title: "Yakıt",
    color: "#000",
    amount: 2000
  },
];

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);

  return (
    <>
      <Modal show= {showAddIncomeModal} onClose={setShowAddIncomeModal}>
        <form className='input-group'>
          <div className='input-group'>
          <label htmlFor='miktar'>
            Gelir Miktarı
          </label>
          <input name = "miktar" required step={0.1} type='number' min = {0.1} placeholder='Gelir Miktarını Yazın'/>
          </div>
          <div className='flex flex-col gap-4'>
          <label htmlFor='Açıklama'>
            Açıklama
          </label>
          <input name='açıklama' required  type='number'  placeholder='Açıklamayı Yazın'/>
          </div>
          <button type='submit' className='btn btn-primary'>Ekle</button>
        </form>
      </Modal>
      
      <main className="container max-w-2xl px-6 py-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">
            Birikim
          </small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button onClick={()=> {setShowAddIncomeModal(true)}}   className="btn btn-primary">+ Harcamalar</button>
          <button onClick={()=> {setShowAddIncomeModal(true)}} className="btn btn-primary-outline">+ Gelirler</button>
        </section>

        <section className="py-6">
          <h3>Harcamalarım</h3>
          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_DATA.map((expense) => {
              return (
                <ExpenseCategoryItem
                  key={expense.id}
                  color={expense.color}
                  title={expense.title}
                  amount={expense.amount}
                />
              );
            })}
          </div>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">İstatistikler</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: DUMMY_DATA.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Harcamalar",
                    data: DUMMY_DATA.map((expense) => expense.amount),
                    backgroundColor: DUMMY_DATA.map((expense) => expense.color),
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
