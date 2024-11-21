import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

export function FaqComponent() {
  return (
    <Accordion className="gap-2 flex flex-col" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>A panzer é um robô?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div>
            A Panzer é uma plataforma que utiliza inteligência artificial para
            analisar milhares de jogos em 1700 ligas e encontrar as apostas que
            têm:
          </div>
          <div>
            - 60% de chance de green - ODD superior a 1.7 Assim que a plataforma
            encontra essas apostas
          </div>
          <div>
            – São feitas as recomendações dentro da Panzer de acordo com seu
            plano.
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>O retorno é garantido?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div>Não. Nenhum retorno sobre investimento pode ser garantido.</div>
          <div>
            Os retornos de qualquer produto Panzer são (variáveis), portanto nós
            podemos apenas mostrar nosso desempenho passado, provando os
            resultados e a assertividade das recomendações da Panzer.
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          Porque apostar com a Panzer é melhor?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div>
            Motivos não faltam, mas selecionamos o que nossos clientes mais
            amam, confira:
          </div>
          <div>
            1. Recomendações com mais probabilidade de green e maior ODD, ou
            seja, você lucra mais apostando menos.
          </div>
          <div>
            2. Apostas pré-live. A Panzer faz todas as recomendações 24 horas
            antes do jogo acontecer.
          </div>
          <div>
            Dessa forma, você não precisa ficar o dia todo grudado em um celular
            recebendo `sinais` de entradas. Em menos de 10 minutos, você vê
            nossas recomendações e faz suas apostas e está livre para viver sua
            vida como quiser!
          </div>
          <div>
            3. Constância de lucro! Desde seu primeiro mês, o algoritmo de gols
            da Panzer é lucrativo. Sem sequer ficar um único mês no negativo.
            Apenas nos últimos 6 meses tivemos mais de 140 unidades positivas.
          </div>
          <div>
            Sendo assim, uma média de 23 unidades por mês. Três vezes mais lucro
            do que qualquer grupo de apostas, recomendações, robôs ou qualquer
            outro tipo de estratégia.
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          Preciso fazer todas as recomendações ou posso escolher as que eu
          quiser?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div>
            Não! Você pode seguir todas as recomendações da Panzer e ter a mesma
            lucratividade padrão da plataforma. Mas caso você queira analisar
            por conta própria, a Panzer disponibiliza 8 filtros de análise de
            qualidade de apostas, histórico, países, chance de green, chance de
            green e devolução, ODD’s, ligas, probabilidades da linha…
          </div>
          <div>
            Caso você queira aprender como utilizar corretamente cada recurso, a
            Panzer disponibiliza tutoriais práticos e rápidos, além de suporte
            ativo 12 horas por dia para facilitar o aprendizado!
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Dá para usar a Panzer no celular?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div>
            Sim, a Panzer possui uma versão 100% adaptada com todos os filtros
            disponíveis para funcionar em seu celular!
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>
          Em que horário são feitas as apostas?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div>
            As apostas da Panzer aparecem sempre de 00:00 até 12:30 no painel do
            cliente, sempre com algumas horas ou até 2 dias de antecedência.
          </div>
          <div>
            O prazo de antecedência varia de acordo com a liga e o país da
            aposta.
          </div>
          <div>
            Com a tecnologia da Panzer em apostas pré-live, você pode apostar em
            um único momento do dia!
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
