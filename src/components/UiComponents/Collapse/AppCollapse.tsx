import { ReactComponent as ArrowUpIcon } from '@/assets/icons/ArrowUp.svg'
import { Collapse, CollapseProps } from 'antd'

const AppCollapse = ({items}:{items: CollapseProps['items']}) => {
  return (
    <Collapse
      items={items}
      expandIconPosition="end"
      bordered={false}
      expandIcon={() => <ArrowUpIcon className="rotate-180 *:stroke-text" />}
    />
  )
}

export default AppCollapse