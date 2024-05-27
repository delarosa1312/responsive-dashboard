import React, { useCallback, useMemo, useState } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { Grid, useTheme, Card, Box } from "@mui/material";
import { getWidgetsPreferences, Widget, WidgetCommonProperties } from "./widgets/Widgets";
import setWidgetsLayouts, { COLUMNS } from "./layouts/LayoutConstructor";
import ActionBar from "./ActionBar";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const DashboardConstructor = React.memo(() => {
  const theme = useTheme();
  const [widgetProperties, setWidgetProperties] = useState<WidgetCommonProperties>();

  const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), []);

  const getCurrentBreakpoint = () => {
    if (typeof window === "undefined") {
      return theme.breakpoints.keys[0];
    }

    const width = window.innerWidth;
    const keys = [...theme.breakpoints.keys].reverse();
    for (const key of keys) {
      if (width >= theme.breakpoints.values[key]) {
        return key;
      }
    }

    return keys[keys.length - 1];
  };

  const [currentBreakpoint, setCurrentBreakpoint] = useState(getCurrentBreakpoint() as string);
  const [widgets, setWidgets] = useState(getWidgetsPreferences() as Widget[]);
  const [layout, setLayout] = useState(setWidgetsLayouts(currentBreakpoint, widgets));
  const [gridKey, setGridKey] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTimeoutId, setDragTimeoutId] = useState<NodeJS.Timeout>();

  const onDragStart = useCallback(() => {
    setIsDragging(true);
    const timeoutId = setTimeout(() => {
      setIsDragging(false);
    }, 200); // 200ms delay

    setDragTimeoutId(timeoutId);
  }, []);

  const onDragStop = useCallback(() => {
    clearTimeout(dragTimeoutId);
    setIsDragging(false);
  }, [dragTimeoutId]);

  const onBreakpointChange = useCallback(
    (newBreakpoint: string) => {
      setCurrentBreakpoint(newBreakpoint);
      setLayout(setWidgetsLayouts(newBreakpoint, widgets));
    },
    [widgets]
  );

  const onLayoutChange = useCallback(
    (currentLayout: Layout[]) => {
      currentLayout.sort((a, b) => {
        if (a.y < b.y) return -1;
        if (a.y > b.y) return 1;
        if (a.x < b.x) return -1;
        if (a.x > b.x) return 1;

        return 0;
      });

      const idToIndex = currentLayout.reduce((acc: any, item, index) => {
        acc[item.i] = index;

        return acc;
      }, {});

      const updatedWidgets = widgets.map((widget) => {
        const newPosition = idToIndex[widget.value];
        if (newPosition !== undefined) {
          const updatedWidget = {
            ...widget,
            position: newPosition,
          };

          if (currentBreakpoint !== "sm" && currentBreakpoint !== "xs") {
            updatedWidget.x = currentLayout[newPosition].x;
          }

          return updatedWidget;
        }

        return widget;
      });

      setWidgets(updatedWidgets);
    },
    [widgets, currentBreakpoint]
  );

  const memoizedWidgets = useMemo(() => {
    return widgets
      .filter((widget) => widget.visible)
      .map((widget) => {
        const currentLayout = layout.find((l: any) => l.i === widget.value);

        const Component = widget.component;

        return (
          <Card
            key={widget.value}
            data-grid={currentLayout}
            data-grid-key={widget.value}
            className="react-grid-item"
            sx={{ width: "100%", position: "relative" }}
          >
            {!isDragging && (
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                zIndex="tooltip"
                className="move-button"
                sx={{
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ":hover": {
                    cursor: "move",
                  },
                }}
              />
            )}
            {Component ? (
              <Component {...widgetProperties} />
            ) : (
              <div>No Component found... please try to reset you layout</div>
            )}
          </Card>
        );
      });
  }, [widgets, layout, isDragging, widgetProperties]);

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Grid item sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ActionBar
          widgets={widgets}
          setWidgets={setWidgets}
          setLayout={setLayout}
          setWidgetProperties={setWidgetProperties}
          currentBreakpoint={currentBreakpoint}
          setGridKey={setGridKey}
          gridKey={gridKey}
        />
      </Grid>
      <Grid item sx={{ width: "100%" }}>
        {widgetProperties ? (
          <ResponsiveReactGridLayout
            className="layout"
            key={gridKey}
            draggableHandle=".move-button"
            onDragStart={onDragStart}
            onDragStop={onDragStop}
            onBreakpointChange={(newBreakpoint: "xl" | "lg" | "md" | "sm" | "xs") => {
              onBreakpointChange(newBreakpoint);
            }}
            onLayoutChange={(currentLayout: Layout[]) => {
              onLayoutChange(currentLayout);
            }}
            breakpoints={{
              xl: theme.breakpoints.values.xl,
              lg: theme.breakpoints.values.lg,
              md: theme.breakpoints.values.md,
              sm: theme.breakpoints.values.sm,
              xs: theme.breakpoints.values.xs,
            }}
            cols={COLUMNS}
            style={{ width: "100%" }}
            isBounded
          >
            {memoizedWidgets}
          </ResponsiveReactGridLayout>
        ) : (
          <div>Widget Properties not found</div>
        )}
      </Grid>
    </Grid>
  );
});

export default React.memo(DashboardConstructor);
