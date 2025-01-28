import { DonutChart } from "../DonutChart/DonutChart";

interface ICustomersBudgetDonutChart {
  title: string;
  amount: number;
}

const colors = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#6B7280"];

export const CustomersBudgetDonutChart = ({
  donutChartData,
}: {
  donutChartData: ICustomersBudgetDonutChart[];
}) => {
  const formattedData = donutChartData.slice(-5).map((item, index) => ({
    name: item.title,
    amount: item.amount, 
    color: colors[index % colors.length],
  }));

 console.log(formattedData)

  return (
    <div className="flex w-full justify-around items-center h-[215px]">
      <DonutChart
        className=""
        data={formattedData}
        category="name"
        value="amount"
        showLabel={true}
        showTooltip={true}
        valueFormatter={(number: number) =>
          `R$${Intl.NumberFormat("us").format(number).toString()}`
        }
      />
      <div className="flex flex-col justify-center space-y-4">
        {formattedData.map((expense, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex space-x-4 items-center">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: expense.color }}
              />
              <h1 className="text-[#1E1E1E] dark:text-white text-[16px] font-normal">
                {expense.name}
              </h1>
              <h1 className="text-[#697077] dark:text-white text-[16px] font-normal">
                {`R$${Intl.NumberFormat("pt-BR")
                  .format(expense.amount)
                  .toString()}`}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
