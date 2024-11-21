export interface User {
  id: string
  email: string
  phone_number: string
  cpf: string
  name: string
  products: [
    {
      id: string
      resources: {
        id: string
        product_name: string
        resource: string
        img_resource: string
        product_hot: boolean
      }
      active: true
      created_at: string
      updated_at: string
      billet_number: string
      code_sale: string
      origin_webhook: boolean
      webhook: string
      status: string
      activated_date: string
      ended_date: string
      canceled_date: string
      contract_period_days: number
      contract_period_start_date: string
      contract_period_end_date: string
      user: string
    },
  ]
}
