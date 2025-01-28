import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import mapDataBrazil from "@highcharts/map-collection/countries/br/br-all.geo.json";
import { useEffect, useState } from "react";
import { stateToKeyMap } from "@/util/states";
import { useTheme } from "next-themes";
// type ICustomer = {
//   id: string;
//   name: string;
//   address: {
//     state: string;
//   };
// };

type BrazilMapProps = {
  customers: ICustomer[];
};

const BrazilMap = ({ customers }: BrazilMapProps) => {
  const [data, setData] = useState<{ "hc-key": string; value: number }[]>([]);
  const { theme } = useTheme();

  console.log(data);

  useEffect(() => {
    getData();
  }, [customers]);

  function getData() {
    // Contar clientes por estado
    const stateCounts: Record<string, number> = {};

    customers.forEach((customer) => {
      if (customer.address && customer.address?.length > 0) {
        const stateKey = customer.address[0]?.state
          ? stateToKeyMap[customer.address[0]?.state]
          : undefined;

        if (stateKey) {
          stateCounts[stateKey] = (stateCounts[stateKey] || 0) + 1;
        }
      }
    });

    const formattedData = Object.entries(stateCounts).map(([key, value]) => ({
      "hc-key": key,
      value,
    }));
    setData(formattedData);
  }

  const options = {
    chart: {
      map: mapDataBrazil,
      backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
    },
    title: {
      text: "Clientes por Estado",
      style: {
        color: theme === "dark" ? "#fff" : "#000",
      },
    },
    tooltip: {
      headerFormat: "",
      pointFormat: "<b>{point.name}</b>: {point.value} cliente(s)",
      backgroundColor:
        theme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
      style: {
        color: theme === "dark" ? "#fff" : "#000",
      },
    },
    series: [
      {
        mapData: mapDataBrazil,
        data: data,
        joinBy: "hc-key",
        name: null,
        showInLegend: false,
        color: "#F57B00",
        states: {
          color: "#F57B00",
          hover: {
            color: "#FFCC00",
          },
        },
        dataLabels: {
          enabled: false,
          format: "{point.name}",
        },
      },
    ],
    colors: ["#F57B00", "#FFCC00"],
  };

  return (
    <div>
      {data && (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"mapChart"}
          options={options}
        />
      )}
    </div>
  );
};

export default BrazilMap;
