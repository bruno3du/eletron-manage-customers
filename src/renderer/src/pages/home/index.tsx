import { Link } from 'react-router-dom'
import { useDeleteCustomer } from './hooks/use-delete-customer'
import { useListCustomers } from './hooks/use-list-customer'

export function Home(): JSX.Element {
  const { data: customers, refetch: refetchCustomers } = useListCustomers()
  const { mutate: handleDeleteCustomer } = useDeleteCustomer({
    onSuccess: () => refetchCustomers()
  })

  return (
    <div className="flex flex-1 flex-col py-12 text-white">
      <div className="px-10">
        <h1 className="text-2xl text-white font-semibold mb-4 lg:text-3xl">Todos clientes</h1>
      </div>

      <section className="flex flex-col gap-6 w-full h-screen overflow-y-auto px-10 pb-[200px]">
        {customers?.map((customer) => (
          <Link key={customer._id} to={`/customer/${customer._id}`}>
            <div className="flex  bg-gray-600  justify-between px-10 py-4">
              <div className="flex flex-col">
                <p className="mb-2 font-semibold text-lg">{customer.name}</p>
                <p className="mb-2 text-sm">{customer.email}</p>
                {customer.phone && <p className="mb-2 text-sm">{customer.phone}</p>}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={async (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleDeleteCustomer(customer._id)
                  }}
                  className="text-red-500 hover:text-gray-300"
                >
                  Deletar
                </button>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
