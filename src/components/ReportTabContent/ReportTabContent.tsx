"use client";
import ReportService from "@/services/models/report";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { models, Report, Embed, service } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import { VISUAL_SETTINGS } from "@/util/setting-pbi";
import { MdFullscreen } from "react-icons/md";
import { Pagination, Spinner } from "@nextui-org/react";
import { useReportContext } from "@/context/ReportContext";

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
  const resizerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCustomer) {
      fetchReportsByCustomerId(selectedCustomer, page, rowsPerPage);
    } else {
      fetchReports(page, rowsPerPage);
    }
  }, [page]);

  const addReportToMap = (id: string, report: Report) => {
    setReportMap((prevMap) => new Map(prevMap.set(id, report)));
  };

  const getReportById = (id: string) => {
    return reportMap.get(id);
  };

  const fullScreen = (id: string) => {
    const reportFullScreen = getReportById(id);

    if (reportFullScreen) {
      reportFullScreen.fullscreen();
    } else {
      console.error("Report not found.");
    }
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
          <Pagination
            total={Math.ceil(total / rowsPerPage)}
            initialPage={page}
            onChange={handlePageChange}
            size="md"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((item: ReportDetailsResponse, index: number) => (
              <div
                key={index}
                className="border-1 bg-white w-full relative"
                style={{ height: `${containerHeight}px` }}
                ref={containerRef}
              >
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
                      ["visualClicked", () => console.log("visual clicked")],
                      ["pageChanged", (event) => console.log(event)],
                    ])
                  }
                  cssClassName={"h-full"}
                  getEmbeddedComponent={(embeddedReport) => {
                    // Adiciona o relatório embutido no Map com o id associado
                    addReportToMap(
                      item.embedUrl[0].reportId,
                      embeddedReport as Report
                    );
                  }}
                />
                <div
                  ref={resizerRef}
                  // onMouseDown={handleMouseDown}
                  className="absolute bottom-0 left-0 right-0 h-auto p-2 flex justify-end  bg-gray-300"
                >
                  <button onClick={() => fullScreen(item.embedUrl[0].reportId)}>
                    <MdFullscreen />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
