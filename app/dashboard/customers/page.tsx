import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CreateCustomer } from '@/app/ui/invoices/buttons';
import { Suspense } from 'react';
import CustomersTable from '@/app/ui/customers/table';
import Pagination from '@/app/ui/pagination';
import { CustomerTableSkeleton } from '@/app/ui/skeletons';
import { fetchCustomerPages, fetchFilteredCustomers } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Customer',
};

export default async function CustomerPage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  //
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const customers = await fetchFilteredCustomers(query, currentPage);
  const totalPages = await fetchCustomerPages(query);
  console.log(totalPages);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customer</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateCustomer />
      </div>
      <Suspense key={query + currentPage} fallback={<CustomerTableSkeleton />}>
        <CustomersTable
          query={query}
          currentPage={currentPage}
          customers={customers}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
