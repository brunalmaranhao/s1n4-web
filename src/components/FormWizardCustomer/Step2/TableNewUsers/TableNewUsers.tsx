import React, { Key } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useFormWizardContext } from "@/context/FormWizardCustomerContext";
import { VerticalDotsIcon } from "@/assets/verticalDotIcon";

type ColumnKeys = "firstName" | "lastName" | "email" | "role" | "actions";

const columns = [
  {
    key: "firstName",
    label: "Nome",
  },
  {
    key: "lastName",
    label: "Sobrenome",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "role",
    label: "Função",
  },
  {
    key: "actions",
    label: "Ações",
  },
];

export default function TableNewUsers() {
  const { users, setUsers } = useFormWizardContext();

  const renderCell = React.useCallback(
    (
      customer: INewUserCustomer,
      columnKey: Key,
      usersSaved: INewUserCustomer[],
    ) => {
      let column = columnKey as ColumnKeys;
      const cellValue = customer[column];
      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2 text-black dark:text-white ">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu className="text-black dark:text-white">
                  <DropdownItem onPress={() => remove(customer, usersSaved)}>
                    Excluir
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return <p className="text-black dark:text-white">{cellValue}</p>;
      }
    },
    [],
  );

  function remove(item: INewUserCustomer, usersSaved: INewUserCustomer[]) {
    const updatedUsers = usersSaved.filter((user) => user.email !== item.email);
    setUsers(updatedUsers);
  }

  return (
    <Table aria-label="Table Users" selectionMode="single">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={users}
        emptyContent={"Não existem usuários adicionados."}
      >
        {(item) => (
          <TableRow key={item.email}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey, users)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
