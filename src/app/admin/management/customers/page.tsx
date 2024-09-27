import ModalAddReport from "@/components/TableCustomers/ModalAddReport/ModalAddReport";
import ModalAddResponsible from "@/components/TableCustomers/ModalAddResponsible/ModalAddResponsible";
import ModalAddUser from "@/components/TableCustomers/ModalAddUser/ModalAddUser";
import ModalEditCustomer from "@/components/TableCustomers/ModalEdit/ModalEditCustomer";
import ModalRemoveCustomer from "@/components/TableCustomers/ModalRemove/ModalRemoveCustomer";
import TableCustomers from "@/components/TableCustomers/TableCustomers";

export default function Customers() {
  return (
    <main className="min-h-screen w-full">
      <div className="xl:min-w-[1200px] lg:min-w-[900px]">
        <TableCustomers />
      </div>
      <ModalEditCustomer />
      <ModalRemoveCustomer />
      <ModalAddReport />
      <ModalAddUser />
      <ModalAddResponsible />
    </main>
  );
}
