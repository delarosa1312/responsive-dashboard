import { responsiveLayouts } from './Layouts'
import { Widget, defaultWidgets } from '../widgets/Widgets'

export const COLUMNS = { xl: 4, lg: 4, md: 4, sm: 4, xs: 2 }

export const widgetTypes = defaultWidgets.map(widget => widget.type)
export const widgetNames = defaultWidgets.map(widget => widget.value)

export default function setWidgetsLayouts(breakpoint: string, widgets?: Widget[]) {
  const widgetsToUse = widgets || defaultWidgets

  const widgetsObject = widgetsToUse.reduce((obj, widget) => {
    obj[widget.value] = widget

    return obj
  }, {} as { [key: string]: Widget })

  const layouts = setLayout(breakpoint, widgetsToUse)

  const layout = widgetNames
    .filter(widgetName => widgetsObject[widgetName].visible !== false)
    .map(widgetName => ({
      ...layouts[widgetName],
      i: widgetsObject[widgetName].value,
      x: widgetsObject[widgetName].x,
      static: widgetName === 'dashboardCards',
      isResizable: false
    }))

  const formatedLayout = adjustLayout(layout, widgetsToUse, breakpoint)

  return formatedLayout
}

function setLayout(breakpoint: string, widgetsToUse: Widget[]) {
  return widgetsToUse.reduce((layouts, widget) => {
    const layout = responsiveLayouts[breakpoint].find((layout: any) => layout.type === widget.type)

    if (layout) {
      layouts[widget.value] = {
        x: 0,
        y: 0,
        i: widget.value,
        static: false,
        isResizable: false,
        w: layout.w || 0,
        h: layout.h || 0,
        minH: layout.h || 0,
        maxH: layout.h || 0
      }
    }

    return layouts
  }, {} as { [key: string]: ReactGridLayout.Layout })
}

function adjustLayout(layout: any[], widgets: any[], breakpoint: string) {
  const validLayout = layout.filter(l => {
    const correspondingWidget = widgets.find(w => w.value === l.i)

    return correspondingWidget && correspondingWidget.visible
  })

  const sortedLayout = [...validLayout].sort((a, b) => {
    const widgetA = widgets.find(widget => widget.value === a.i)
    const widgetB = widgets.find(widget => widget.value === b.i)

    return (widgetA?.position || 0) - (widgetB?.position || 0)
  })

  let currentY = 0
  let currentX = 0

  for (let i = 0; i < sortedLayout.length; i++) {
    // If the widget can fit on the current line
    if (currentX + sortedLayout[i].w <= COLUMNS[breakpoint as keyof typeof COLUMNS]) {
      if (i !== 1) {
        sortedLayout[i].x = currentX
      }
      sortedLayout[i].y = currentY
      currentX += sortedLayout[i].w
    } else {
      // Move to the next line
      currentY += 1
      currentX = 0
      if (i !== 1) {
        sortedLayout[i].x = currentX
      }
      sortedLayout[i].y = currentY
      currentX += sortedLayout[i].w
    }
  }

  return layout
}
