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
import { format } from "date-fns";

type ColumnKeys =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "birthdate"
  | "role"
  | "actions";

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
    key: "phone",
    label: "Telefone",
  },
  {
    key: "birthdate",
    label: "Data de Nascimento",
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

export default function TableNewResponsibles() {
  const { responsibles, setResponsibles } = useFormWizardContext();

  const renderCell = React.useCallback(
    (
      responsible: INewResponsible,
      columnKey: Key,
      responsibleSaved: INewResponsible[]
    ) => {
      let column = columnKey as ColumnKeys;
      const cellValue = responsible[column];
      switch (columnKey) {
        case "birthdate":
          if (cellValue) {
            return (
              <p className="text-black">
                {format(new Date(cellValue?.toString()), "dd/MM/yyyy")}
              </p>
            );
          }
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu className="text-black">
                  <DropdownItem
                    onPress={() => remove(responsible, responsibleSaved)}
                  >
                    Deletar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return <p className="text-black">{cellValue?.toString()}</p>;
      }
    },
    []
  );

  function remove(item: INewResponsible, responsiblesSaved: INewResponsible[]) {
    const updatedResponsibles = responsiblesSaved.filter(
      (responsible) => responsible.email !== item.email
    );
    setResponsibles(updatedResponsibles);
  }

  return (
    <Table aria-label="Table Reponsibles" selectionMode="single">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={responsibles}
        emptyContent={
          "Não existem partes responsáveis adicionadas."
        }
      >
        {(item) => (
          <TableRow key={item.email}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey, responsibles)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
