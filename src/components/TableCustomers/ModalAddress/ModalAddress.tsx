"use client";
import { useCustomerContext } from "@/context/CustomerContext";
import { schemaNewAddress } from "@/schemas/customer";
import { handleAxiosError } from "@/services/error";
import CustomerService from "@/services/models/customer";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdSearch } from "react-icons/md";
import InputMask from "react-input-mask";

export default function ModalAddress() {
  const {
    selectedCustomerEdit,
    fetchCustomers,
    page,
    isOpenModalAddress,
    onOpenChangeModalAddress,
  } = useCustomerContext();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [showAddressFields, setShowAddressFields] = useState(false);

  useEffect(() => {
    if (!isOpenModalAddress) reset();
  }, [isOpenModalAddress]);

  const inputVariant = "bordered";

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<INewCustomerAddress>({
    resolver: yupResolver(schemaNewAddress),
    mode: "onSubmit",
    shouldFocusError: false,
  });

  async function createAddress(data: INewCustomerAddress) {
    if (selectedCustomerEdit?.id) {
      setLoading(true);
      try {
        const { createCustomerAddress } = await CustomerService();
        await createCustomerAddress(
          data.street,
          data.number,
          data.neighborhood,
          data.city,
          data.state,
          data.country,
          data.zipCode,
          selectedCustomerEdit?.id,
          data.complement,
        );

        onOpenChangeModalAddress();
        fetchCustomers(page);
        resetAddressFields();
        toast.success("Endereço adicionado com sucesso.");
      } catch (error) {
        const customError = handleAxiosError(error);
        toast.error(customError.message);
      } finally {
        setLoading(false);
      }
    }
  }

  function resetAddressFields() {
    setShowAddressFields(false);
    setValue("zipCode", "");
    setValue("neighborhood", "");
    setValue("city", "");
    setValue("street", "");
    setValue("state", "");
    setValue("country", "");
  }

  async function handleGetAddressFromCep() {
    const cep = getValues("zipCode");
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
          setValue("neighborhood", data.bairro);
          setValue("city", data.localidade);
          setValue("street", data.logradouro);
          setValue("state", data.estado);
          setValue("country", "Brasil");
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

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpenModalAddress}
      onOpenChange={onOpenChangeModalAddress}
      size="xl"
      className="bg-[#F2F4F8] dark:bg-[#1e1e1e]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
              Adicionar Endereço - {selectedCustomerEdit?.name}
            </ModalHeader>
            <form onSubmit={handleSubmit(createAddress)}>
              <ModalBody className="flex flex-col gap-2 text-black dark:text-white">
                <div className="flex flex-col gap-4">
                  <h2>Endereço</h2>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
                    {/* <Input
              label="CEP"
              type="string"
              {...register("zipCode")}
              size="sm"
              className="max-w-[220px]"
            /> */}

                    <Controller
                      control={control}
                      name={"zipCode"}
                      render={({ field }) => (
                        <InputMask mask="99999-999" {...field} type="text">
                          <Input
                            placeholder={"99999-999"}
                            className="max-w-[220px]"
                            variant="bordered"
                            isInvalid={
                              errors.zipCode && !!errors.zipCode.message
                            }
                            errorMessage={
                              errors.zipCode && errors.zipCode.message
                            }
                            label="CEP"
                            size="sm"
                          />
                        </InputMask>
                      )}
                    />

                    <Button
                      className="bg-[#F57B00] text-white"
                      onClick={() => handleGetAddressFromCep()}
                      disabled={!!errors.zipCode || loadingCep}
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
                          name="street"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              label="Rua"
                              type="string"
                              size="sm"
                              {...field}
                              isDisabled
                              variant="bordered"
                              isInvalid={
                                errors.street && !!errors.street.message
                              }
                              errorMessage={
                                errors.street && errors.street.message
                              }
                            />
                          )}
                        />

                        <Input
                          label="Número"
                          type="string"
                          {...register("number")}
                          size="sm"
                          isInvalid={errors.number && !!errors.number.message}
                          errorMessage={errors.number && errors.number.message}
                          variant="bordered"
                        />
                        <Input
                          label="Complemento"
                          type="string"
                          {...register("complement")}
                          size="sm"
                          variant="bordered"
                        />
                      </div>
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Controller
                          name="neighborhood"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              label="Bairro"
                              type="string"
                              size="sm"
                              {...field}
                              isDisabled
                              variant="bordered"
                              isInvalid={
                                errors.neighborhood &&
                                !!errors.neighborhood.message
                              }
                              errorMessage={
                                errors.neighborhood &&
                                errors.neighborhood.message
                              }
                            />
                          )}
                        />
                        <Controller
                          name="city"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              label="Cidade"
                              type="string"
                              size="sm"
                              {...field}
                              isDisabled
                              variant="bordered"
                              isInvalid={errors.city && !!errors.city.message}
                              errorMessage={errors.city && errors.city.message}
                            />
                          )}
                        />
                        <Controller
                          name="country"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              label="País"
                              type="string"
                              size="sm"
                              {...field}
                              isDisabled
                              variant="bordered"
                              isInvalid={
                                errors.country && !!errors.country.message
                              }
                              errorMessage={
                                errors.country && errors.country.message
                              }
                            />
                          )}
                        />
                      </div>
                    </>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onOpenChangeModalAddress}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-[#F57B00] text-white"
                  disabled={loading}
                >
                  {loading ? <Spinner color="white" size="sm" /> : "Criar"}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
