import { useQueryClient } from '@tanstack/react-query'
import { FormEventHandler } from 'react'
import { useCreateCustomer } from './hooks/use-create-customer'

export function Create(): JSX.Element {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useCreateCustomer()
  const handleAddCustomer: FormEventHandler = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const role = formData.get('role') as string
    const address = formData.get('address') as string
    const phone = formData.get('phone') as string

    mutate(
      {
        name,
        email,
        role,
        status: true,
        address,
        phone
      },
      {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: ['customers'] })
        }
      }
    )
  }
  return (
    <div className="flex flex-1 flex-col py-12 px-10 text-white gap-8 overflow-y-auto">
      <section className="flex flex-1 flex-col items-center">
        <h1 className="font-semibold text-xl lg:text-3xl">Cadastrar Novo Cliente</h1>
        <form className="w-full max-w-[800px] mt-4" onSubmit={handleAddCustomer}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Nome</label>
              <input
                name="name"
                type="text"
                placeholder="Digite o nome do cliente..."
                className="w-full h-9 rounded text-black pl-3 placeholder:pl-3"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Cargo</label>
              <input
                name="role"
                type="text"
                placeholder="Digite o cargo..."
                className="w-full h-9 rounded text-black pl-3 placeholder:pl-3"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium">Endereço</label>
              <input
                name="address"
                type="text"
                placeholder="Digite o endereço..."
                className="w-full h-9 rounded text-black pl-3 placeholder:pl-3"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Email:</label>
              <input
                name="email"
                type="text"
                placeholder="Digite o email..."
                className="w-full h-9 rounded text-black pl-3 placeholder:pl-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium ">Telefone</label>
              <input
                name="phone"
                type="text"
                placeholder="Digite o telefone..."
                className="w-full h-9 rounded text-black pl-3 placeholder:pl-3"
              />
            </div>

            <button
              className="bg-blue-600 rounded flex items-center justify-center h-9 col-span-2 mt-6 transition-opacity duration-200 hover:opacity-90"
              type="submit"
              disabled={isPending}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
