import {moduleMetadata, Story, Meta} from '@storybook/angular'
import {ProductsFormComponent} from './products-form.component'

export default {
  title: 'ProductsFormComponent',
  component: ProductsFormComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
} as Meta<ProductsFormComponent>

const Template: Story<ProductsFormComponent> = (
  args: ProductsFormComponent
) => ({
  props: args
})

export const Primary = Template.bind({})
Primary.args = {}
