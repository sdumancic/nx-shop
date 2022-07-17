import {moduleMetadata, Story, Meta} from '@storybook/angular'
import {UsersFormComponent} from './users-form.component'

export default {
  title: 'UsersFormComponent',
  component: UsersFormComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
} as Meta<UsersFormComponent>

const Template: Story<UsersFormComponent> = (args: UsersFormComponent) => ({
  props: args
})

export const Primary = Template.bind({})
Primary.args = {}
