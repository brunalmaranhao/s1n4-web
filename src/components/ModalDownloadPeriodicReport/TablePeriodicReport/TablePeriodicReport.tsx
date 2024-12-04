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
  Chip,
  SortDescriptor,
  Spinner,
} from "@nextui-org/react";
import { s3 } from "@/services/s3-service";
import {
  ColumnKeysPeriodicReport,
  columnsPeriodicReport,
} from "@/util/tableColumns";
import { MdDownload } from "react-icons/md";
import { months } from "@/util/month-and-years";
import SkeletonTable from "@/components/SkeletonTable/SkeletonTable";

type TablePeriodicReportProps = {
  periodicReports: PeriodicReportDetailsResponse[];
  loading: boolean;
};

export default function TablePeriodicReport({
  periodicReports,
  loading,
}: TablePeriodicReportProps) {
  const tableRef = useRef<HTMLDivElement>(null);

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "year",
    direction: "descending",
  });
  const headerColumns = React.useMemo(() => columnsPeriodicReport, []);

  const download = async (url: string) => {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: url,
    };
    s3.getSignedUrl("getObject", params, async (err, signedUrl) => {
      if (err) {
        console.error("Erro ao obter URL assinada:", err);
      } else if (signedUrl) {
        const link = document.createElement("a");
        link.href = signedUrl;
        link.download = url.split("/").pop() || "download";
        link.target = "_blank";
        link.click();
        link.remove();
      }
    });
  };

  const renderCell = React.useCallback((budgetExpense: any, columnKey: Key) => {
    let column = columnKey as ColumnKeysPeriodicReport;
    let columnParsed = column === "project" ? "project" : column;
    const cellValue = budgetExpense[columnParsed];
    switch (columnKey) {
      case "month":
        return (
          <>
            {months.map(
              (item) => item.value === cellValue.toString() && item.label,
            )}
          </>
        );
      case "status":
        return (
          <Chip className="capitalize" color="success" size="sm" variant="flat">
            {cellValue?.toString() === "ACTIVE" ? "Disponível" : "Indisponível"}
          </Chip>
        );
      case "url":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button
              onPress={() => download(cellValue.toString())}
              // color="primary"
              className="pr-5 bg-transparent text-[#F57B00] min-w-[0px] p-2"
            >
              <MdDownload size={20} /> Download
            </Button>
          </div>
        );
      case "project":
        return cellValue && typeof cellValue === "object" ? cellValue.name : "";

      default:
        return (
          <p className="text-black dark:text-white">{cellValue?.toString()}</p>
        );
    }
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex justify-end mb-2 text-black"></div>
      {loading ? (
        <SkeletonTable />
      ) : (
        <div ref={tableRef}>
          <Table
            aria-label="Table BudgetExpenses"
            isHeaderSticky
            classNames={{ wrapper: "w-full" }}
            sortDescriptor={sortDescriptor}
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
              emptyContent="Não existem relatórios cadastrados"
              items={periodicReports}
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell className="text-[#000] dark:text-white">
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
