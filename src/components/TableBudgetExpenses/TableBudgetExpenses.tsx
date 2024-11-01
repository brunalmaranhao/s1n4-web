"use client";
import React, { Key, useEffect, useRef } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  SortDescriptor,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "@/assets/verticalDotIcon";
import {
  ColumnKeysBudgetExpenses,
  columnsBudgetExpenses,
} from "@/util/tableColumns";
import { ViewIcon } from "@/assets/ViewIcon";
import { useFinancialContext } from "@/context/FinancialContext";
import { formatter } from "@/util/formatter";
import { format } from "date-fns";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaFilePdf } from "react-icons/fa";

export default function TableBudgetExpenses() {
  const tableRef = useRef<HTMLDivElement>(null);
  const {
    fetchBudgetExpenses,
    loading,
    page,
    setPage,
    total,
    rowsPerPage,
    budgetExpenses,
    filteredCustomerId,
  } = useFinancialContext();

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const headerColumns = React.useMemo(() => columnsBudgetExpenses, []);

  useEffect(() => {
    if (page > 0) fetchBudgetExpenses(page);
  }, [page]);

  const pages = Math.ceil(total / rowsPerPage);

  const sortedItems = React.useMemo(() => {
    const items = Array.isArray(budgetExpenses) ? budgetExpenses : [];
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a] as number;
      const second = b[sortDescriptor.column as keyof typeof b] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, budgetExpenses]);

  const renderCell = React.useCallback((budgetExpense: any, columnKey: Key) => {
    let column = columnKey as ColumnKeysBudgetExpenses;
    let columnParsed = column === "budget" ? "project" : column;
    const cellValue = budgetExpense[columnParsed];
    switch (columnKey) {
      case "status":
        return (
          <Chip className="capitalize" color="success" size="sm" variant="flat">
            {cellValue?.toString()}
          </Chip>
        );
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
                  startContent={<ViewIcon className={iconClasses} />}
                >
                  Visualizar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      case "project":
      case "customer":
        return cellValue && typeof cellValue === "object" ? cellValue.name : "";
      case "budget":
        return cellValue &&
          typeof cellValue === "object" &&
          "budget" in cellValue
          ? formatter.format(cellValue.budget)
          : "";
      case "amount":
        return (
          <p className="text-black">
            {formatter.format(parseInt(cellValue?.toString()))}
          </p>
        );
      case "createdAt":
        return (
          <p className="text-black">
            {format(new Date(cellValue?.toString()), "dd/MM/yyyy 'às' HH:mm")}
          </p>
        );
      default:
        return <p className="text-black">{cellValue?.toString()}</p>;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) setPage(page + 1);
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  const bottomContent = React.useMemo(
    () => (
      <div className="py-2 px-2 flex justify-between items-center w-full">
        {!filteredCustomerId ||
          (pages > 1 && (
            <div className="flex w-full justify-center gap-2">
              <Button
                isDisabled={pages === 1}
                size="sm"
                variant="flat"
                onPress={onPreviousPage}
              >
                Anterior
              </Button>
              <Pagination
                isCompact
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={setPage}
              />
              <Button
                isDisabled={pages === 1}
                size="sm"
                variant="flat"
                onPress={onNextPage}
              >
                Próximo
              </Button>
            </div>
          ))}
      </div>
    ),
    [total, page, pages]
  );

  const exportToPDF = async () => {
    if (!tableRef.current) return;

    const canvas = await html2canvas(tableRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("table-budget-expenses.pdf");
  };
  return (
    <div className="w-full">
      <div className="w-full flex justify-end mb-2 text-black">
        <Tooltip showArrow={true} content="Exportar para PDF" color="default" className="text-black dark:text-white">
          <Button
            color="primary"
            onPress={exportToPDF}
            className="flex items-center gap-2 min-w-[0px]"
          >
            <FaFilePdf size={20} />
          </Button>
        </Tooltip>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div ref={tableRef}>
          <Table
            aria-label="Table BudgetExpenses"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{ wrapper: "w-full" }}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              emptyContent="Não existem lançamentos cadastrados"
              items={sortedItems}
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell className="text-[#000]">
                      {renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
