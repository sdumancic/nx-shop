import {moduleMetadata, Story, Meta} from '@storybook/angular'
import {UsersListComponent} from './users-list.component'

export default {
  title: 'UsersListComponent',
  component: UsersListComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
} as Meta<UsersListComponent>

const Template: Story<UsersListComponent> = (args: UsersListComponent) => ({
  props: args
})

export const Primary = Template.bind({})
Primary.args = {}
