import {moduleMetadata, Story, Meta} from '@storybook/angular'
import {ShellComponent} from './shell.component'

export default {
  title: 'ShellComponent',
  component: ShellComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
} as Meta<ShellComponent>

const Template: Story<ShellComponent> = (args: ShellComponent) => ({
  props: args
})

export const Primary = Template.bind({})
Primary.args = {}
