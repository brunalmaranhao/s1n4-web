"use client";
import React, { Key, useEffect } from "react";
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
} from "@nextui-org/react";
import { VerticalDotsIcon } from "@/assets/verticalDotIcon";
import {
  ColumnKeysBudgetExpenses,
  columnsBudgetExpenses,
} from "@/util/tableColumns";
import { ViewIcon } from "@/assets/ViewIcon";
import { useFinancialContext } from "@/context/FinancialContext";
import { formatter } from "@/util/formatter";

export default function TableBudgetExpenses() {
  const {
    fetchBudgetExpenses,
    loading,
    page,
    setPage,
    total,
    rowsPerPage,
    budgetExpenses,
  } = useFinancialContext();

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "amount",
    direction: "ascending",
  });
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const headerColumns = React.useMemo(() => {
    return columnsBudgetExpenses;
  }, []);

  useEffect(() => {
    if (page > 0) fetchBudgetExpenses(page);
  }, [page]);

  const pages = Math.ceil(total / rowsPerPage);

  const sortedItems = React.useMemo(() => {
    return [...budgetExpenses].sort((a, b) => {
      if (a["amount"] && b["amount"]) {
        const first = a["amount"];
        const second = b["amount"];
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      } else {
        return 1;
      }
    });
  }, [sortDescriptor, budgetExpenses]);

  const renderCell = React.useCallback(
    (budgetExpense: IBudgetExpense, columnKey: Key) => {
      console.log(budgetExpense);
      let column = columnKey as ColumnKeysBudgetExpenses;
      let columnParsed = column === "budget" ? "project" : column as ColumnKeysBudgetExpenses
      const cellValue = budgetExpense[columnParsed];
      switch (columnKey) {
        case "status":
          return (
            <Chip
              className="capitalize"
              color={"success"}
              size="sm"
              variant="flat"
            >
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
          return cellValue && typeof cellValue === "object"
            ? cellValue.name
            : "";
        case "customer":
          return cellValue && typeof cellValue === "object"
            ? cellValue.name
            : "";
        case "budget":  
          console.log(cellValue)
          return cellValue && typeof cellValue === "object" && ("budget" in cellValue)
            ? formatter.format(cellValue.budget)
            : "";
        case "amount":
           return <p className="text-black">{cellValue && formatter.format(parseInt(cellValue?.toString()))}</p>
        case "customer":
        default:
          return <p className="text-black">{cellValue?.toString()}</p>;
      }
    },
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  // const onRowsPerPageChange = React.useCallback((e: any) => {
  //   setRowsPerPage(Number(e.target.value));
  //   setPage(1);
  // }, []);

  // const topContent = React.useMemo(() => {
  //   return (
  //     <div className="flex flex-col gap-4">
  //       <div className="flex justify-between items-center">
  //         <span className="text-default-400 text-small">
  //           Total {total} customers
  //         </span>
  //       </div>
  //     </div>
  //   );
  // }, [total]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center w-full">
        {/* <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span> */}

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
      </div>
    );
  }, [total, page, pages]);

  return (
    <div className="w-full">
      {loading ? (
        <Spinner />
      ) : (
        <Table
          aria-label="Table BudgetExpenses"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "w-full",
          }}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          // topContent={topContent}
          // topContentPlacement="outside"
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
            emptyContent={"Não existem lançamentos cadastrados"}
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
      )}
    </div>
  );
}
