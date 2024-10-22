import { fetchCustomerReports } from "@/app/customer/actions";
import { decodeToken } from "@/services/jwt-decode/decode";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Image,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Notification from "../Notification/Notification";

interface IReportTableProps {
  customerId: string;
}

export default function CustomerReportsTable({
  customerId,
}: IReportTableProps) {
  const { "sina:x-token": sessionKey } = parseCookies();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customerReports, setCustomerReports] = useState<ICustomerReports[]>(
    [],
  );

  const handleFetchCustomerReports = async (
    token: string,
    customerId: string,
  ) => {
    const { reports } = await fetchCustomerReports(token, customerId);
    return reports;
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const result = await handleFetchCustomerReports(sessionKey, customerId);
      console.log(result);
      setCustomerReports(result || []);
    };
    fetchData().finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="bg-white p-4 border-solid border-[1px] border-[#DDE1E6]">
          <h1 className="pb-4 text-[18px] font-bold">Relatórios cadastrados</h1>

          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>NOME</TableColumn>
              <TableColumn>ID DO RELATÓRIO</TableColumn>
              <TableColumn>AÇÕES</TableColumn>
            </TableHeader>
            <TableBody>
              {customerReports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>
                    <div>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <Image src="/dotsicon.svg" alt="dots icon" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu className="text-black">
                          <DropdownItem>Visualizar</DropdownItem>
                          <DropdownItem>Editar</DropdownItem>
                          <DropdownItem>Desativar</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
