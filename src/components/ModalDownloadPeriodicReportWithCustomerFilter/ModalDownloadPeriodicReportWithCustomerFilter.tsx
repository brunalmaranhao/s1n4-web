"use client";
import { useReportContext } from "@/context/ReportContext";
import PeriodicReportService from "@/services/models/periodic-report";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import TablePeriodicReport from "./TablePeriodicReport/TablePeriodicReport";
import { MdCancel, MdFilterAlt } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";
import { years } from "@/util/month-and-years";

export default function ModalDownloadPeriodicReportWithCustomerFilter() {
  const {
    isOpenModalDownloadPeriodicReport,
    onCloseModalDownloadPeriodicReport,
    customers,
    // setSelectedCustomer
  } = useReportContext();
  const [loading, setLoading] = useState(false);
  const [periodicReports, setPeriodicReports] = useState<
    PeriodicReportDetailsResponse[]
  >([]);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const [selectedKeysCustomer, setSelectedKeysCustomer] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const selectedId = Array.from(selectedKeysCustomer)[0];
    if (selectedId) {
      fetchPeriodicReportsByCustomer(selectedId);
      return;
    }
  }, [selectedKeysCustomer]);

  useEffect(() => {
    const selectedYear = Array.from(selectedKeys)[0];
    const selectedId = Array.from(selectedKeysCustomer)[0];
    if (selectedYear && selectedId) {
      fetchPeriodicReportsCustomerAndYear(selectedId, selectedYear);
      return;
    }
  }, [selectedKeys]);

  const fetchPeriodicReportsCustomerAndYear = async (
    customerId: string,
    year: string
  ) => {
    setLoading(true);
    try {
      const { fetchPeriodicReportsByCustomerAndYear } =
        await PeriodicReportService();
      const response = await fetchPeriodicReportsByCustomerAndYear(
        customerId,
        year
      );
      setPeriodicReports(response.periodicReports);
    } catch (error) {
      toast.error("Não foi possível atualizar o status do projeto.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPeriodicReportsByCustomer = async (customerId: string) => {
    setLoading(true);
    try {
      const { fetchPeriodicReportsByCustomer } = await PeriodicReportService();
      const response = await fetchPeriodicReportsByCustomer(customerId);
      setPeriodicReports(response.periodicReports);
    } catch (error) {
      toast.error("Não foi possível atualizar o status do projeto.");
    } finally {
      setLoading(false);
    }
  };

  const selectedValue = useMemo(() => {
    if (selectedKeys.size > 0) {
      const selectedId = Array.from(selectedKeys)[0];
      const selectedYear = years.find((item) => item.toString() === selectedId);
      return selectedYear || "Ano";
    }
    return "Ano";
  }, [selectedKeys, years]);

  const handleSelectionChange = (keys: "all" | Set<React.Key>) => {
    setSelectedKeys(new Set(Array.from(keys) as string[]));
  };

  const selectedValueCustomer = useMemo(() => {
    if (selectedKeysCustomer.size > 0) {
      const selectedId = Array.from(selectedKeysCustomer)[0];
      const selectedCustomer = customers.find((item) => item.id === selectedId);
      return selectedCustomer?.name || "Cliente";
    }
    return "Cliente";
  }, [selectedKeysCustomer, customers]);

  const handleSelectionChangeCustomer = (keys: "all" | Set<React.Key>) => {
    setSelectedKeysCustomer(new Set(Array.from(keys) as string[]));
  };

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpenModalDownloadPeriodicReport}
      onOpenChange={onCloseModalDownloadPeriodicReport}
      size="2xl"
      className="bg-[#F2F4F8] dark:bg-[#1e1e1e]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-3 text-black dark:text-white">
              <h1 className="text-[32px] font-bold">Baixar relatórios</h1>
              <p className="text-[16px]  font-normal leading-6">
                Selecione abaixo o relatório desejado e faça o download (os
                relatórios serão atualizados e disponibilizados no primeiro dia
                de cada mês).
              </p>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-2 text-black dark:text-white">
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-5">
                  <div className="flex gap-1 items-center">
                    <MdFilterAlt />
                    <p className="text-[16px]">Filtrar por</p>
                  </div>
                  <div>
                    <div className="flex gap-3 items-center ">
                      <Dropdown backdrop="blur" isDisabled={loading}>
                        <DropdownTrigger>
                          <Button
                            className="bg-white text-black text-[16px] font-medium"
                            endContent={<SlArrowDown />}
                          >
                            {selectedValueCustomer}
                          </Button>
                        </DropdownTrigger>

                        <DropdownMenu
                          selectionMode="single"
                          selectedKeys={selectedKeysCustomer}
                          onSelectionChange={handleSelectionChangeCustomer}
                          variant="light"
                          aria-label="Static Actions"
                          className="max-h-[320px] overflow-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-700"
                        >
                          {customers.map((item) => (
                            <DropdownItem
                              key={item.id}
                              className="text-black dark:text-white"
                            >
                              {item.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                  {selectedValueCustomer !== "Cliente" && (
                    <Dropdown backdrop="blur">
                      <DropdownTrigger>
                        <Button
                          className="bg-white text-[16px] text-black font-medium min-w-0 p-2"
                          endContent={<SlArrowDown />}
                        >
                          {selectedValue}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={handleSelectionChange}
                        variant="light"
                        aria-label="Static Actions"
                        className="max-h-[320px] overflow-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-700"
                      >
                        {years.map((item) => (
                          <DropdownItem
                            key={item}
                            className="text-black dark:text-white"
                          >
                            {item}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  )}
                </div>
                <TablePeriodicReport
                  loading={loading}
                  periodicReports={periodicReports}
                />
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
