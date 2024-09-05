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

type ColumnKeys = "name" | "workspaceId" | "reportId" | "actions";

const columns = [
  {
    key: "name",
    label: "Nome",
  },
  {
    key: "workspaceId",
    label: "PBI Workspace Id",
  },
  {
    key: "reportId",
    label: "PBI Report Id",
  },
  {
    key: "actions",
    label: "Ações",
  },
];

export default function TableNewReports() {
  const { reports, setReports } = useFormWizardContext();

  const renderCell = React.useCallback(
    (report: INewReport, columnKey: Key, reportsSaved: INewReport[]) => {
      let column = columnKey as ColumnKeys;
      const cellValue = report[column];
      switch (columnKey) {
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
                  <DropdownItem onPress={() => remove(report, reportsSaved)}>
                    Deletar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return <p className="text-black">{cellValue}</p>;
      }
    },
    []
  );

  function remove(item: INewReport, reportsSaved:INewReport[] ) {
    const updatedReports = reportsSaved.filter((report) => report.reportId !== item.reportId);
    setReports(updatedReports)
  }

  return (
    <Table aria-label="Table Reports" selectionMode="single">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={reports}
        emptyContent={"Não existem relatórios adicionados."}
      >
        {(item) => (
          <TableRow key={item.reportId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey, reports)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
