import { useEffect, useRef, useState } from "react";
import { MdFullscreen, MdDelete } from "react-icons/md";
import { Pagination, Spinner, useDisclosure } from "@nextui-org/react";
import { useReportContext } from "@/context/ReportContext";
import { PowerBIEmbed } from "powerbi-client-react";
import { models, Report } from "powerbi-client";
import { VISUAL_SETTINGS } from "@/util/setting-pbi";
import ModalRemoveReport from "./ModalRemove/ModalRemoveReport";

export default function ReportTabContent() {
  const {
    reports,
    fetchReports,
    loading,
    total,
    rowsPerPage,
    setPage,
    page,
    selectedCustomer,
    fetchReportsByCustomerId,
  } = useReportContext();

  const [reportMap, setReportMap] = useState<Map<string, Report>>(new Map());
  const [containerHeight, setContainerHeight] = useState(400);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedReportRemove, setSelectedReportRemove] = useState<
    ReportDetailsResponse | undefined
  >();

  useEffect(() => {
    fetchData();
  }, [page, selectedCustomer]);

  async function fetchData() {
    if (selectedCustomer) {
      fetchReportsByCustomerId(selectedCustomer, page, rowsPerPage);
    } else {
      fetchReports(page, rowsPerPage);
    }
  }

  const addReportToMap = (id: string, report: Report) => {
    setReportMap((prevMap) => new Map(prevMap.set(id, report)));
  };

  const getReportById = (id: string) => {
    return reportMap.get(id);
  };

  const fullScreen = (id?: string) => {
    if (!id) return;
    const reportFullScreen = getReportById(id);

    if (reportFullScreen) {
      reportFullScreen.fullscreen();
    } else {
      console.error("Report not found.");
    }
  };

  const handleDelete = (item?: ReportDetailsResponse) => {
    setSelectedReportRemove(item);
    onOpen();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Math.ceil(total / rowsPerPage) > 1 && (
            <Pagination
              total={Math.ceil(total / rowsPerPage)}
              initialPage={page}
              onChange={handlePageChange}
              size="md"
              className="justify-end flex"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((item: ReportDetailsResponse, index: number) => (
              <div
                key={index}
                className="border-1 bg-white w-full relative mt-5"
                style={{ height: `${containerHeight}px` }}
                ref={containerRef}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <h2 className="mt-[-25px]">{item?.name}</h2>
                {item.accessToken && item.embedUrl && item.embedUrl[0] ? (
                  <>
                    <PowerBIEmbed
                      embedConfig={{
                        type: "report",
                        id: item.embedUrl[0].reportId,
                        embedUrl: item.embedUrl[0].embedUrl,
                        accessToken: item.accessToken.token,
                        tokenType: models.TokenType.Embed,
                        settings: VISUAL_SETTINGS,
                      }}
                      eventHandlers={
                        new Map([
                          ["loaded", function () {}],
                          [
                            "rendered",
                            function () {
                              console.log("Report rendered");
                            },
                          ],
                          [
                            "error",
                            function (event: any) {
                              console.log(event.detail);
                            },
                          ],
                          [
                            "visualClicked",
                            () => console.log("visual clicked"),
                          ],
                          ["pageChanged", (event) => console.log(event)],
                        ])
                      }
                      cssClassName={"h-full"}
                      getEmbeddedComponent={(embeddedReport) => {
                        if (item.embedUrl)
                          addReportToMap(
                            item.embedUrl[0].reportId,
                            embeddedReport as Report,
                          );
                      }}
                    />
                  </>
                ) : (
                  <div className="text-black flex items-center justify-center w-full">
                    Erro ao obter dados do relatório
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-auto p-2 flex justify-end bg-gray-300">
                  {item.embedUrl && item.embedUrl.length > 0 && (
                    <button
                      onClick={() =>
                        fullScreen(
                          item.embedUrl ? item.embedUrl[0].reportId : undefined,
                        )
                      }
                    >
                      <MdFullscreen />
                    </button>
                  )}
                </div>

                <div
                  className={`absolute top-2 right-2 transition-all duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button onClick={() => handleDelete(item)}>
                    <MdDelete className="text-red-600" size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <ModalRemoveReport
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        report={selectedReportRemove}
        fetchData={fetchData}
      />
    </div>
  );
}
