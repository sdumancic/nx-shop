import {moduleMetadata, Story, Meta} from '@storybook/angular'
import {CategoriesFormComponent} from './categories-form.component'

export default {
  title: 'CategoriesFormComponent',
  component: CategoriesFormComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
} as Meta<CategoriesFormComponent>

const Template: Story<CategoriesFormComponent> = (
  args: CategoriesFormComponent
) => ({
  props: args
})

export const Primary = Template.bind({})
Primary.args = {}
