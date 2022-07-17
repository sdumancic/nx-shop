import {moduleMetadata, Story, Meta} from '@storybook/angular'
import {ProductsListComponent} from './products-list.component'

export default {
  title: 'ProductsListComponent',
  component: ProductsListComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
} as Meta<ProductsListComponent>

const Template: Story<ProductsListComponent> = (
  args: ProductsListComponent
) => ({
  props: args
})

export const Primary = Template.bind({})
Primary.args = {}
