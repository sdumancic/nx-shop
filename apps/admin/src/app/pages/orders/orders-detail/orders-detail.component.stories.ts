import {moduleMetadata, Story, Meta} from '@storybook/angular'
import {OrdersDetailComponent} from './orders-detail.component'

export default {
  title: 'OrdersDetailComponent',
  component: OrdersDetailComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
} as Meta<OrdersDetailComponent>

const Template: Story<OrdersDetailComponent> = (
  args: OrdersDetailComponent
) => ({
  props: args
})

export const Primary = Template.bind({})
Primary.args = {}
