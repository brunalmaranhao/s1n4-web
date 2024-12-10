"use client";
import React, { Key, useEffect, useState } from "react";
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
import { ColumnKeys, columnsCustomer } from "@/util/tableColumns";
import { useCustomerContext } from "@/context/CustomerContext";
import { AddNoteIcon } from "@/assets/AddNoteIcon";
import { EditDocumentIcon } from "@/assets/EditDocumentIcon";
import { DeleteDocumentIcon } from "@/assets/DeleteDocumentIcon";
import { ViewIcon } from "@/assets/ViewIcon";
import SkeletonTable from "../SkeletonTable/SkeletonTable";

export default function TableCustomers() {
  const {
    fetchCustomers,
    loading,
    page,
    setPage,
    total,
    rowsPerPage,
    customers,
    onOpenModalEdit,
    setSelectedCustomerEdit,
    onOpenChangeModalRemove,
    setSelectedCustomerRemove,
    onOpenModalAddReport,
    onOpenModalAddUser,
    onOpenModalAddResponsible,
  } = useCustomerContext();

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "contractValue",
    direction: "ascending",
  });
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const headerColumns = React.useMemo(() => {
    return columnsCustomer;
  }, []);

  useEffect(() => {
    if (page > 0) fetchCustomers(page);
  }, [page]);

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
              <Dropdown backdrop="blur">
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu className="text-black dark:text-white">
                  <DropdownItem
                    startContent={<ViewIcon className={iconClasses} />}
                  >
                    Visualizar
                  </DropdownItem>

                  <DropdownItem
                    startContent={<AddNoteIcon className={iconClasses} />}
                    onClick={() => {
                      setSelectedCustomerEdit(customer);
                      onOpenModalAddReport();
                    }}
                  >
                    Adicionar Relatório PBI
                  </DropdownItem>
                  <DropdownItem
                    startContent={<AddNoteIcon className={iconClasses} />}
                    onClick={() => {
                      setSelectedCustomerEdit(customer);
                      onOpenModalAddUser();
                    }}
                  >
                    Adicionar Usuário
                  </DropdownItem>
                  <DropdownItem
                    startContent={<AddNoteIcon className={iconClasses} />}
                    onClick={() => {
                      setSelectedCustomerEdit(customer);
                      onOpenModalAddResponsible();
                    }}
                  >
                    Adicionar Parte Responsável
                  </DropdownItem>
                  <DropdownItem
                    startContent={<EditDocumentIcon className={iconClasses} />}
                    onClick={() => {
                      setSelectedCustomerEdit(customer);
                      onOpenModalEdit();
                    }}
                  >
                    Editar
                  </DropdownItem>
                  <DropdownItem
                    startContent={
                      <DeleteDocumentIcon className={iconClasses} />
                    }
                    onClick={() => {
                      onOpenChangeModalRemove();
                      setSelectedCustomerRemove(customer);
                    }}
                  >
                    Desativar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return <p className="text-[#000] dark:text-white">{cellValue}</p>;
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

        <div className="flex w-full justify-center items-center gap-2">
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
            // color="primary"
            page={page}
            total={pages}
            onChange={setPage}
            classNames={{
              item: "rounded-lg",
              cursor: "bg-[#F57B00]",
            }}
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
        <SkeletonTable />
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
              <TableRow key={item.id} className="">
                {(columnKey) => (
                  <TableCell className="text-[#000] dark:text-white">
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
