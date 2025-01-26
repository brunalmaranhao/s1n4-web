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
import PeriodicReportService from "@/services/models/periodic-report";
import { handleAxiosError } from "@/services/error";
import { s3 } from "@/services/s3-service";

export default function ReportsTable() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reports, setReports] = useState<PeriodicReportDetailsResponse[]>([]);

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

  const fetchAll = async () => {
    try {
      setIsLoading(true);
      const { fetchAll } = await PeriodicReportService();
      const response = await fetchAll();
      setReports(response.periodicReports);
      return {
        isError: false,
        responsibles: response,
      };
    } catch (error) {
      const customError = handleAxiosError(error);
      return { isError: true, error: customError.message };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          className="bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] p-4 rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] h-[275px] overflow-auto [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <h1 className="pb-4 text-[18px] font-bold text-[#21272A] dark:text-white">
            Relatórios cadastrados
          </h1>
          {reports.length === 0 ? (
            <p className="text-[#21272A] dark:text-white">
              {" "}
              Não existem relatórios cadastrados.
            </p>
          ) : (
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Nome</TableColumn>
                <TableColumn>Período</TableColumn>
                <TableColumn>Projeto</TableColumn>
                <TableColumn>Empresa</TableColumn>
                <TableColumn>Ações</TableColumn>
              </TableHeader>
              <TableBody>
                {reports.map((report, index) => (
                  <TableRow key={index} className="text-[#000] dark:text-white">
                    <TableCell>{report.name}</TableCell>
                    <TableCell>{report.month + "/" + report.year}</TableCell>
                    <TableCell>{report.project.name}</TableCell>
                    <TableCell>{report.project.customer.name}</TableCell>
                    <TableCell>
                      <div>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                              <Image src="/dotsicon.svg" alt="dots icon" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu className="text-black dark:text-white">
                            <DropdownItem onPress={() => download(report.url)}>
                              Baixar
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
}
