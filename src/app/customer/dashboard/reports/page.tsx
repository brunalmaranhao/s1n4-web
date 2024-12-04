import dynamic from 'next/dynamic';

const ReportTabContentCustomer = dynamic(
  () => import('@/components/ReportTabContentCustomer/ReportTabContentCustomer'),
  { ssr: false }
);

export default function CustomerReports() {
  return (
    <main>
      <ReportTabContentCustomer />
    </main>
  );
}
