import { getFromLS, saveToLS } from "src/utils/localStorage";
import BasicWidget1x1 from "./models/BasicWidget1x1";

export interface Widget {
  id: number;
  position: number;
  x: number;
  visible: boolean;
  type: string;
  value: string;
  title: string;
  component?: React.FC<any>;
  props?: any;
}
export interface WidgetsPreferences {
  id: number;
  position: number;
  x: number;
  visible: boolean;
}
export interface WidgetCommonProperties {
  startDate: string;
  endDate: string;
  salesRep: string | null;
}
export interface WidgetCustomizedProperties {
  widgetsIds: number[];
  props: any;
}

export const saveWidgetsPreferences = (widgets: Widget[]) => {
  const widgetsPreferences: WidgetsPreferences[] = widgets.map((widget) => {
    return {
      id: widget.id,
      position: widget.position,
      x: widget.x,
      visible: widget.visible,
    };
  });

  saveToLS("widgetsPreferences", widgetsPreferences);
};

export const getWidgetsPreferences = () => {
  const widgetsPreferencesFromLS = getFromLS("widgetsPreferences");

  // Validate that widgetsPreferencesFromLS is an array and each item is a WidgetsPreferences object
  const isValidWidgetsPreferencesArray =
    Array.isArray(widgetsPreferencesFromLS) &&
    widgetsPreferencesFromLS.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "position" in item &&
        "x" in item &&
        "visible" in item
    );

  const widgetsPreferences = isValidWidgetsPreferencesArray
    ? (widgetsPreferencesFromLS as WidgetsPreferences[])
    : [];

  let widgets: Widget[] = [...defaultWidgets];

  widgets = widgets.map((widget) => {
    const widgetPreference = widgetsPreferences.find((widgetPreference) => widgetPreference.id === widget.id);

    if (widgetPreference) {
      return {
        ...widget,
        position: widgetPreference.position,
        x: widgetPreference.x,
        visible: widgetPreference.visible,
      };
    }

    return { ...widget };
  });

  return widgets;
};

export const widgetCustomizedProperties: WidgetCustomizedProperties[] = [
  { widgetsIds: [4], props: { title: "Sales This Month", value: "$28,450" } },
  { widgetsIds: [5], props: { title: "Sales This Year", value: "$130,234" } },
];

export const defaultWidgets: Widget[] = [
  {
    id: 1,
    position: 1,
    x: 0,
    visible: true,
    type: "FixedTop",
    value: "dashboardCards",
    title: "Dashboard Cards",
    component: BasicWidget1x1,
  },
  {
    id: 2,
    position: 2,
    x: 0,
    visible: true,
    type: "4x1",
    value: "salesOverview",
    title: "Sales Overview",
    component: BasicWidget1x1,
  },
  {
    id: 3,
    position: 3,
    x: 0,
    visible: true,
    type: "2x1",
    value: "totalSell",
    title: "Total Sell",
    component: BasicWidget1x1,
  },
  {
    id: 4,
    position: 4,
    x: 0,
    visible: true,
    type: "2x1",
    value: "totalBuy",
    title: "Total Buy",
    component: BasicWidget1x1,
  },
  {
    id: 7,
    position: 7,
    x: 0,
    visible: true,
    type: "4x4",
    value: "worldMap",
    title: "World Map",
    component: BasicWidget1x1,
  },
  {
    id: 8,
    position: 8,
    x: 0,
    visible: true,
    type: "4x3",
    value: "SalesTrackerGP",
    title: "Sales Tracker GP",
    component: BasicWidget1x1,
  },
  {
    id: 9,
    position: 9,
    x: 0,
    visible: true,
    type: "1x1",
    value: "LinesQuoted",
    title: "Lines Quoted",
    component: BasicWidget1x1,
  },
  {
    id: 10,
    position: 10,
    x: 0,
    visible: true,
    type: "1x1",
    value: "SalesOrderLines",
    title: "Sales Orders Lines",
    component: BasicWidget1x1,
  },
  {
    id: 11,
    position: 11,
    x: 0,
    visible: true,
    type: "1x1",
    value: "QuoteToOrderRatio",
    title: "Quote to Order Ratio",
    component: BasicWidget1x1,
  },
  {
    id: 12,
    position: 12,
    x: 0,
    visible: true,
    type: "1x1",
    value: "AverageSalesOrderGP",
    title: "Average Sales Order GP",
    component: BasicWidget1x1,
  },
  {
    id: 13,
    position: 13,
    x: 0,
    visible: true,
    type: "4x3",
    value: "QuotesToOrdersRatio",
    title: "Quote to Order Ratio",
    component: BasicWidget1x1,
  },
];
