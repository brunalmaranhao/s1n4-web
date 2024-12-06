import { getUserById } from "@/app/admin/actions";
import { fetchBudgetExpensesByCustomer } from "@/app/customer/dashboard/financial/actions";
import { decodeToken } from "@/services/jwt-decode/decode";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { formatter } from "@/util/formatter";

// exemplo de objeto mapeado para as linhas da tabela:
//   {
//     key: "1",
//     expenseTitle: "Tony Reichert",
//     description: "CEO",
//     project: "Active",
//     expenseValue: "R$ 1000",
//   }

const columns = [
  {
    key: "expenseTitle",
    label: "TÍTULO",
  },
  {
    key: "description",
    label: "DESCRIÇÃO",
  },
  {
    key: "project",
    label: "Projeto",
  },
  {
    key: "expenseValue",
    label: "Valor",
  },
];

export default function CustomerExpensesTable() {
  const { "sina:x-token": sessionKey } = parseCookies();

  const decoded = decodeToken(sessionKey);
  const userId = decoded?.sub;

  const [listOfExpenses, setListOfExpenses] = useState<IExpensesRow[]>([]);

  const handleCustomerExpenses = async (id: string, token: string) => {
    const result = await fetchBudgetExpensesByCustomer(id, token);
    return result.expenses;
  };

  const handleUserById = async (id: string, token: string) => {
    const result = await getUserById(id, token);
    return result.user;
  };

  useEffect(() => {
    handleUserById(userId || "", sessionKey).then((data) => {
      handleCustomerExpenses(data?.user.customerId || "", sessionKey).then(
        (expenses) => {
          const mappedExpenses = (expenses ?? []).map((expense) => ({
            key: expense.id,
            expenseTitle: expense.title,
            description: expense.description ?? "",
            project: expense.project.name,
            expenseValue: formatter.format(expense.amount),
          }));

          console.log(mappedExpenses);
          setListOfExpenses(mappedExpenses);
        },
      );
    });
  }, []);

  return (
    <Table aria-label="Example table with dynamic content" className="mt-8">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={listOfExpenses}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell className="text-[#000] dark:text-white">
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
