import { useGetProjectVersion } from '../../hooks/use-get-project-version'

export function About(): JSX.Element {
  const { data: version } = useGetProjectVersion()
  return (
    <div className="flex flex-1 flex-col py-12 px-10 text-white gap-8 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">Sobre</h1>

      <p>Projeto feito com React, Typescript, TailwindCSS e Electron</p>
      <p>Versão atual do projeto: {version}</p>
    </div>
  )
}
