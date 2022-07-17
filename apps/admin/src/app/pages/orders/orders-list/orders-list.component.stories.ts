import {moduleMetadata, Story, Meta} from '@storybook/angular'
import {OrdersListComponent} from './orders-list.component'

export default {
  title: 'OrdersListComponent',
  component: OrdersListComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
} as Meta<OrdersListComponent>

const Template: Story<OrdersListComponent> = (args: OrdersListComponent) => ({
  props: args
})

export const Primary = Template.bind({})
Primary.args = {}
