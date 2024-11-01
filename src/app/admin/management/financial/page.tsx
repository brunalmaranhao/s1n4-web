import ModalAddBudgetExpense from "@/components/ModalAddBudgetExpense/ModalAddBudgetExpense";
import TableBudgetExpenses from "@/components/TableBudgetExpenses/TableBudgetExpenses";

export default function Financial() {
  return (
    <main className="min-h-screen w-full">
      <div className="xl:min-w-[1200px] lg:min-w-[900px]">
        <TableBudgetExpenses />
      </div>
      <ModalAddBudgetExpense />
    </main>
  );
}
