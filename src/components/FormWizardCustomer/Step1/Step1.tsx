import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Spinner } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaNewCustomer } from "@/schemas/customer";
import { MdSearch } from "react-icons/md";
import InputMask from "react-input-mask";
import CustomerService from "@/services/models/customer";
import { handleAxiosError } from "@/services/error";
import toast from "react-hot-toast";
import { useFormWizardContext } from "@/context/FormWizardCustomerContext";

const Step1 = () => {
  const { handleNext, step } = useFormWizardContext();
  const [loadingCep, setLoadingCep] = useState(false);
  const { setNewCustomer } = useFormWizardContext();
  const { back } = useRouter();
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm<INewCustomer>({
    resolver: yupResolver(schemaNewCustomer),
    mode: "onChange",
    shouldFocusError: false,
  });

  useEffect(() => {
    //console.log(getValues("address.zipCode"));
    if (
      !getValues("address.zipCode") ||
      getValues("address.zipCode") === "_____-___"
    ) {
      resetAddressFields();
    }
  }, [getValues("address.zipCode")]);

  function resetAddressFields() {
    setShowAddressFields(false);
    setValue("address.zipCode", "");
    setValue("address.neighborhood", "");
    setValue("address.city", "");
    setValue("address.street", "");
    setValue("address.state", "");
    setValue("address.country", "");
  }

  async function handleGetAddressFromCep() {
    const cep = getValues("address.zipCode");
    if (cep) {
      setLoadingCep(true);
      try {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data.erro);
        if (data.erro) {
          setShowAddressFields(false);
          resetAddressFields();
          toast.error("Erro ao buscar endereço");
        } else {
          setValue("address.neighborhood", data.bairro);
          setValue("address.city", data.localidade);
          setValue("address.street", data.logradouro);
          setValue("address.state", data.estado);
          setValue("address.country", "Brasil");
          setShowAddressFields(true);
        }
      } catch (error) {
        toast.error(`Erro ao buscar endereço: ${error}`);
        console.error("Erro ao buscar endereço:", error);
      } finally {
        setLoadingCep(false);
      }
    }
  }

  async function handleOnNext(data: INewCustomer) {
    setLoading(true);
    try {
      const { validateCustomer } = await CustomerService();
      await validateCustomer(data.name, data.corporateName, data.cnpj);
      setNewCustomer(data);
      handleNext();
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      className={`${step === 1 ? "flex" : "hidden"} flex-col text-black dark:text-white`}
    >
      <h2>Detalhes da empresa</h2>
      <form
        onSubmit={handleSubmit(handleOnNext)}
        className="flex flex-col gap-4 mt-3"
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            label="Nome"
            {...register("name")}
            isInvalid={!!errors.name?.message}
            errorMessage={errors.name?.message}
            size="sm"
            variant="bordered"
          />
          <Input
            label="Razão Social"
            {...register("corporateName")}
            isInvalid={!!errors.corporateName?.message}
            errorMessage={errors.corporateName?.message}
            size="sm"
            variant="bordered"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Controller
            control={control}
            name={"cnpj"}
            render={({ field }) => (
              <InputMask mask={"99.999.999/9999-99"} {...field} type="text">
                <Input
                  placeholder={"99.999.999/9999-99"}
                  className="max-w-[220px]"
                  isInvalid={!!errors.cnpj?.message}
                  errorMessage={errors.cnpj?.message}
                  size="sm"
                  label="CNPJ"
                  variant="bordered"
                />
              </InputMask>
            )}
          />
          {/* <Input
            label="CNPJ"
            {...register("cnpj")}
            className="max-w-[220px]"
            isInvalid={!!errors.cnpj?.message}
            errorMessage={errors.cnpj?.message}
            size="sm"
          /> */}
          <Input
            label="Objetivo do Contrato"
            {...register("contractObjective")}
            size="sm"
            variant="bordered"
          />
          <Input
            label="Investimento Acumulado"
            {...register("accumulatedInvestment")}
            size="sm"
            variant="bordered"
            type="number"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">R$</span>
              </div>
            }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            label="Duração do Contrato"
            {...register("contractDuration")}
            size="sm"
            variant="bordered"
            type="number"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">Meses</span>
              </div>
            }
          />
          <Input
            label="Valor do Contrato"
            type="number"
            {...register("contractValue")}
            size="sm"
            variant="bordered"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">R$</span>
              </div>
            }
          />
          <Input
            label="Projeção de Gastos"
            type="number"
            {...register("expenditureProjection")}
            size="sm"
            variant="bordered"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">R$</span>
              </div>
            }
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2>Endereço</h2>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            {/* <Input
              label="CEP (Opcional)"
              type="string"
              {...register("address.zipCode")}
              size="sm"
              className="max-w-[220px]"
            /> */}

            <Controller
              control={control}
              name={"address.zipCode"}
              render={({ field }) => (
                <InputMask
                  mask="99999-999"
                  {...field}
                  type="text"
                  onBlur={() => {
                    if (!errors.address?.zipCode) {
                      handleGetAddressFromCep();
                    }
                  }}
                >
                  <Input
                    placeholder={"99999-999"}
                    className="max-w-[220px]"
                    variant="bordered"
                    isInvalid={
                      errors.address?.zipCode &&
                      !!errors.address?.zipCode.message
                    }
                    errorMessage={
                      errors.address?.zipCode && errors.address?.zipCode.message
                    }
                    label="CEP (Opcional)"
                    size="sm"
                  />
                </InputMask>
              )}
            />

            <Button
              className="bg-[#F57B00] text-white"
              onClick={() => handleGetAddressFromCep()}
              disabled={!!errors.address?.zipCode || loadingCep}
            >
              {loadingCep ? (
                <Spinner color="white" size="sm" />
              ) : (
                <>
                  <MdSearch size={22} /> Buscar
                </>
              )}
            </Button>
          </div>
          {showAddressFields && (
            <>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Controller
                  name="address.street"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      label="Rua (Opcional)"
                      type="string"
                      size="sm"
                      {...field}
                      isDisabled
                      variant="bordered"
                    />
                  )}
                />

                <Input
                  label="Número"
                  type="string"
                  {...register("address.number")}
                  size="sm"
                  isInvalid={
                    errors.address?.number && !!errors.address?.number.message
                  }
                  errorMessage={
                    errors.address?.number && errors.address?.number.message
                  }
                  variant="bordered"
                />
                <Input
                  label="Complemento (Opcional)"
                  type="string"
                  {...register("address.complement")}
                  size="sm"
                  variant="bordered"
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Controller
                  name="address.neighborhood"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      label="Bairro (Opcional)"
                      type="string"
                      size="sm"
                      {...field}
                      isDisabled
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  name="address.city"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      label="Cidade (Opcional)"
                      type="string"
                      size="sm"
                      {...field}
                      isDisabled
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  name="address.country"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      label="País (Opcional)"
                      type="string"
                      size="sm"
                      {...field}
                      isDisabled
                      variant="bordered"
                    />
                  )}
                />
              </div>
            </>
          )}
        </div>

        <div className="w-full mt-10 flex justify-end gap-3">
          <Button
            onClick={() => back()}
            color="primary"
            variant="light"
            className="dark:text-white text-black"
          >
            Cancelar
          </Button>
          <Button
            className="bg-[#F57B00] text-white"
            type="submit"
            disabled={!!loading}
          >
            {loading ? <Spinner color="white" size="sm" /> : "Avançar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step1;
