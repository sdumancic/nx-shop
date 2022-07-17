import {moduleMetadata, Story, Meta} from '@storybook/angular'
import {CategoriesListComponent} from './categories-list.component'

export default {
  title: 'CategoriesListComponent',
  component: CategoriesListComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
} as Meta<CategoriesListComponent>

const Template: Story<CategoriesListComponent> = (
  args: CategoriesListComponent
) => ({
  props: args
})

export const Primary = Template.bind({})
Primary.args = {}
