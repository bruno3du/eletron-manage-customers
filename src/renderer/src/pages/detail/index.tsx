import { useParams } from 'react-router-dom'
import { useFetchCustomerById } from './hooks/use-get-customer-by-id'

export function Detail(): JSX.Element {
  const params = useParams<{ id: string }>()
  const { data: customer, isLoading, error } = useFetchCustomerById(params.id!)

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro ao carregar cliente</div>
  }

  return (
    <div className="flex flex-1 flex-col py-12 px-10 text-white gap-8 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">Detalhes do {customer?.name} </h1>
      {customer ? (
        <div className="bg-gray-600 p-6 rounded-lg">
          <p className="mb-2">
            <strong>Nome:</strong> {customer.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {customer.email}
          </p>
          <p className="mb-2">
            <strong>Cargo:</strong> {customer.role}
          </p>
          <p className="mb-2">
            <strong>Status:</strong> {customer.status ? 'Ativo' : 'Inativo'}
          </p>
          {customer.address && (
            <p className="mb-2">
              <strong>Endereço:</strong> {customer.address}
            </p>
          )}
          {customer.phone && (
            <p className="mb-2">
              <strong>Telefone:</strong> {customer.phone}
            </p>
          )}
        </div>
      ) : (
        <div>Cliente não encontrado</div>
      )}
    </div>
  )
}
