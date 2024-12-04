import { useFormWizardContext } from "@/context/FormWizardCustomerContext";
import { Button, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdDone } from "react-icons/md";
import FeedbackItem from "./FeedbackItem/FeedbackItem";
import CustomerService from "@/services/models/customer";
import UserService from "@/services/models/user";
import ReportService from "@/services/models/report";
import ResponsiblePartiesService from "@/services/models/responsible-parties";

const ProcessingScreen = () => {
  const { step, newCustomer, reports, users, responsibles, reset } =
    useFormWizardContext();
  const [customerId, setCustomerId] = useState<string | undefined>();
  const [finished, setFinished] = useState(false);
  const [itemsSaved, setItemsSaved] = useState({
    customer: { finished: false, error: false },
    address: { finished: false, error: false },
    users: { finished: false, error: false },
    reports: { finished: false, error: false },
    responsibles: { finished: false, error: false },
  });

  useEffect(() => {
    if (step === 5) {
      processAllData();
    }
  }, [step]);

  const updateItemSaved = (key: string, finished: boolean, error: boolean) => {
    setItemsSaved((prevState) => ({
      ...prevState,
      [key]: { finished, error },
    }));
  };

  async function processAllData() {
    if (newCustomer) {
      try {
        const customerId = await createCustomer();
        setCustomerId(customerId);
        if (customerId) {
          const tasks = [
            newCustomer.address?.street && createAddress(customerId),
            users.length > 0 && createUsers(customerId),
            reports.length > 0 && createReports(customerId),
            responsibles.length > 0 && createResponsibles(customerId),
          ].filter(Boolean);

          await Promise.allSettled(tasks);

          setFinished(true);
        }
      } catch (error) {
        console.error("Erro ao processar dados:", error);
      }
    }
  }

  async function createCustomer() {
    if (newCustomer) {
      try {
        const { createCustomer } = await CustomerService();
        const response = await createCustomer(
          newCustomer.name,
          newCustomer.corporateName,
          newCustomer.cnpj,
          newCustomer.contractDuration,
          newCustomer.contractValue,
          newCustomer.accumulatedInvestment,
          newCustomer.expenditureProjection,
          newCustomer.contractObjective,
        );
        updateItemSaved("customer", true, false);
        return response;
      } catch (error) {
        setFinished(true);
        updateItemSaved("customer", true, true);
        throw error;
      }
    }
  }

  async function createAddress(customerId: string) {
    if (
      newCustomer?.address?.street &&
      newCustomer?.address?.number &&
      newCustomer?.address?.neighborhood &&
      newCustomer?.address?.city &&
      newCustomer?.address?.state &&
      newCustomer?.address?.country &&
      newCustomer?.address?.zipCode
    ) {
      try {
        const { createCustomerAddress } = await CustomerService();
        await createCustomerAddress(
          newCustomer?.address?.street,
          newCustomer?.address?.number,
          newCustomer?.address?.neighborhood,
          newCustomer?.address?.city,
          newCustomer?.address?.state,
          newCustomer?.address?.country,
          newCustomer?.address?.zipCode,
          customerId,
          newCustomer?.address?.complement,
        );
        updateItemSaved("address", true, false);
      } catch (error) {
        updateItemSaved("address", true, true);
        throw error;
      }
    }
  }

  async function createUsers(customerId: string) {
    try {
      const { createUserCustomer } = await UserService();
      await Promise.all(
        users.map((user) =>
          createUserCustomer(
            user.firstName,
            user.lastName,
            user.email,
            user.password,
            customerId,
            user.role,
          ),
        ),
      );
      updateItemSaved("users", true, false);
    } catch (error) {
      updateItemSaved("users", true, true);
      throw error;
    }
  }

  async function createReports(customerId: string) {
    try {
      const { createReport } = await ReportService();
      await Promise.all(
        reports.map((report) =>
          createReport(
            report.name,
            report.workspaceId,
            report.reportId,
            customerId,
          ),
        ),
      );
      updateItemSaved("reports", true, false);
    } catch (error) {
      updateItemSaved("reports", true, true);
      throw error;
    }
  }

  async function createResponsibles(customerId: string) {
    try {
      const { createResponsibleParties } = await ResponsiblePartiesService();
      await Promise.all(
        responsibles.map((responsible) =>
          createResponsibleParties(
            responsible.firstName,
            responsible.lastName,
            responsible.email,
            responsible.phone,
            customerId,
            responsible.birthdate,
            responsible.role,
          ),
        ),
      );
      updateItemSaved("responsibles", true, false);
    } catch (error) {
      updateItemSaved("responsibles", true, true);
      throw error;
    }
  }

  return (
    <div
      className={`${step === 5 ? "flex" : "hidden"} flex-col gap-3 text-black dark:text-white`}
    >
      {finished ? (
        <div className="flex flex-row items-center w-full gap-3 text-black dark:text-white">
          <MdDone size={22} />
          <h2 className="text-lg">Processamento finalizado.</h2>
        </div>
      ) : (
        <div className="flex flex-row items-center w-full gap-3">
          <Spinner size="sm" />
          <h2 className="text-lg">Aguarde enquanto os dados são salvos.</h2>
        </div>
      )}

      <div className="flex flex-col gap-3 mt-3 text-black dark:text-white">
        {(Object.keys(itemsSaved) as (keyof typeof itemsSaved)[]).map(
          (key) =>
            itemsSaved[key].finished && (
              <FeedbackItem
                key={key}
                label={key}
                error={itemsSaved[key].error}
              />
            ),
        )}
      </div>
      <Button
        className="max-w-[320px] self-center border-[#F57B00] bg-transparent text-[#F57B00]"
        size="sm"
        variant="bordered"
        color="primary"
        onPress={() => (window.location.href = "/admin/management/customers/")}
      >
        Voltar
      </Button>
    </div>
  );
};

export default ProcessingScreen;
