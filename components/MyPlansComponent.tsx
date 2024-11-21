import { Card, CardContent, CardTitle } from './ui/card'

export function MyPlansComponent() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="border-l-4 pl-2 border-[#D2FD01] text-2xl">
          Meus Planos
        </div>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-6">
        <Card className="bg-[#25232B]">
          <CardContent className="flex justify-between p-4">
            <div className="flex flex-col justify-between gap-3">
              <CardTitle className="text-sm">Plano atual</CardTitle>
              <div className="text-2xl">Panzer Pro Hot</div>
              <div className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                malesuada vulputate urna eu rhoncus. Aenean facilisis dolor a
                aliquam ultrices.
              </div>
              <div>
                <div className="text-[#d2ff00]  text-sm">
                  Expira 17 de dezembro de 2024
                </div>
              </div>
            </div>
            <div className="flex items-end min-w-[170px]">
              <div className="text-[11px] bg-[#d2ff00] hover:bg-opacity-80 transition-colors duration-300 px-3 py-2 rounded-sm text-black">
                CONFIRA OUTROS PLANOS
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
