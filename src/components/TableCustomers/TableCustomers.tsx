"use client";
import React, { Key, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  SortDescriptor,
  Spinner,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "@/assets/verticalDotIcon";
import CustomerService from "@/services/models/customer";
import { handleAxiosError } from "@/services/error";
import toast from "react-hot-toast";
import { ColumnKeys, columnsCustomer } from "@/util/tableColumns";

export default function TableCustomers() {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "contractValue",
    direction: "ascending",
  });
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = useState(true);

  const headerColumns = React.useMemo(() => {
    return columnsCustomer;
  }, []);

  useEffect(() => {
    if (page > 0) fetchCustomers(page);
  }, [page]);

  async function fetchCustomers(pageNumber: number) {
    setLoading(true);
    try {
      const { findAll } = await CustomerService();
      const response = await findAll(pageNumber, rowsPerPage);
      setCustomers(response.customers);
      setTotal(response.total);
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
    }
  }

  const pages = Math.ceil(total / rowsPerPage);

  const sortedItems = React.useMemo(() => {
    return [...customers].sort((a, b) => {
      if (a["contractValue"] && b["contractValue"]) {
        const first = a["contractValue"];
        const second = b["contractValue"];
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      } else {
        return 1;
      }
    });
  }, [sortDescriptor, customers]);

  const renderCell = React.useCallback(
    (customer: ICustomer, columnKey: Key) => {
      let column = columnKey as ColumnKeys;
      const cellValue = customer[column];
      switch (columnKey) {
        case "status":
          return (
            <Chip
              className="capitalize"
              color={"success"}
              size="sm"
              variant="flat"
            >
              {cellValue}
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
                  <DropdownItem>Visualizar</DropdownItem>
                  <DropdownItem>Editar</DropdownItem>
                  <DropdownItem>Deletar</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return <p className="text-black">{cellValue}</p>;
      }
    },
    [],
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
    <div className="w-full p-4">
      {loading ? (
        <Spinner />
      ) : (
        <Table
          aria-label="Table Customers"
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
            emptyContent={"Não existem clientes cadastrados"}
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
