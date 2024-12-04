import { fetchCustomerReports } from "@/app/customer/actions";
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
import { useRouter } from "next/navigation";

interface IReportTableProps {
  customerId: string;
}

export default function CustomerReportsTable({
  customerId,
}: IReportTableProps) {
  const { "sina:x-token": sessionKey } = parseCookies();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customerReports, setCustomerReports] = useState<ICustomerReports[]>(
    []
  );

  const { push } = useRouter();

  const handleFetchCustomerReports = async (
    token: string,
    customerId: string
  ) => {
    const { reports } = await fetchCustomerReports(token, customerId);
    return reports;
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const result = await handleFetchCustomerReports(sessionKey, customerId);
     //console.log(result);
      setCustomerReports(result || []);
    };
    fetchData().finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="bg-white dark:bg-[#1E1E1E] p-4 border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E]">
          <h1 className="pb-4 text-[18px] font-bold text-[#21272A] dark:text-white">
            Relatórios cadastrados
          </h1>

          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>NOME</TableColumn>
              <TableColumn>ID DO RELATÓRIO</TableColumn>
              <TableColumn>AÇÕES</TableColumn>
            </TableHeader>
            <TableBody>
              {customerReports.map((report, index) => (
                <TableRow key={index} className="text-[#000] dark:text-white">
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
                        <DropdownMenu className="text-black dark:text-white">
                          <DropdownItem
                            onPress={() => push("customer/dashboard/reports")}
                          >
                            Visualizar
                          </DropdownItem>
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
