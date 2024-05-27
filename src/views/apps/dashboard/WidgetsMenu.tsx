// WidgetsMenu.tsx
import React from 'react'
import { Widget } from './widgets/Widgets'
import { Menu, MenuList, MenuItem, Checkbox } from '@mui/material'

interface WidgetsMenuProps {
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
  widgets: Widget[]
  selectedWidgets: Widget[]
  handleCheckboxChange: (widgetId: number) => void
}

const WidgetsMenu: React.FC<WidgetsMenuProps> = ({
  widgets,
  selectedWidgets,
  handleCheckboxChange,
  anchorEl,
  handleClose
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      <MenuList style={{ maxHeight: '480px', overflow: 'auto' }}>
        {widgets.map(widget => (
          <MenuItem key={widget.id}>
            <Checkbox
              checked={selectedWidgets.some(selectedWidget => selectedWidget.id === widget.id)}
              onChange={() => handleCheckboxChange(widget.id)}
            />
            {widget.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default WidgetsMenu
