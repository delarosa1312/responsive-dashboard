import {
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Menu,
  Hidden,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Widget, defaultWidgets, getWidgetsPreferences, saveWidgetsPreferences } from "./widgets/Widgets";
import setWidgetsLayouts from "./layouts/LayoutConstructor";
import WidgetsMenu from "./WidgetsMenu";

import { getFromLS } from "src/utils/localStorage";

interface ActionBarProps {
  widgets: Widget[];
  setWidgets: (widgets: Widget[]) => void;
  setLayout: (layout: any) => void;
  setWidgetProperties: (widgetProperties: any) => void;
  currentBreakpoint: string;
  setGridKey: (gridKey: number) => void;
  gridKey: number;
}

const ActionBar: React.FC<ActionBarProps> = ({
  widgets,
  setWidgets,
  setLayout,
  setWidgetProperties,
  currentBreakpoint,
  setGridKey,
  gridKey,
}) => {
  const userData = getFromLS("userData");

  const [salesRep, setSalesRep] = useState<any>({ value: userData?.employeeNo, label: userData?.name });
  const [timeline, setTimeline] = useState("This Month");
  const [widgetLayoutSaved, setWidgetLayoutSaved] = useState(getWidgetsPreferences() === widgets);
  const [anchorElWidgetsMenu, setAnchorElWidgetsMenu] = React.useState<HTMLButtonElement | null>(null);
  const [anchorElSmallScreenMenu, setAnchorElSmallScreenMenu] = React.useState<HTMLButtonElement | null>(null);
  const selectedWidgets = useMemo(() => widgets.filter((widget) => widget.visible), [widgets]);

  // Create separate click handlers for each menu
  const handleClickWidgetsMenu = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElWidgetsMenu(event.currentTarget);
  }, []);

  const handleClickSmallScreenMenu = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElSmallScreenMenu(event.currentTarget);
  }, []);

  const handleCloseWidgetsMenu = useCallback(() => {
    setAnchorElWidgetsMenu(null);
  }, []);

  const handleCloseSmallScreenMenu = useCallback(() => {
    setAnchorElSmallScreenMenu(null);
  }, []);

  const handleCheckboxChange = useCallback(
    (widgetId: number) => {
      const widgetIndex = widgets.findIndex((widget: Widget) => widget.id === widgetId);
      if (widgetIndex !== -1) {
        widgets[widgetIndex].visible = !widgets[widgetIndex].visible;
        setWidgets([...widgets]);
        setLayout(setWidgetsLayouts(currentBreakpoint, widgets));
      }
    },
    [setWidgets, currentBreakpoint, widgets, setLayout]
  );

  const saveWidgetPreferences = useCallback(() => {
    saveWidgetsPreferences(widgets);
    setWidgetLayoutSaved(true);
  }, [widgets]);

  const resetWidgetPreferences = useCallback(() => {
    setWidgets(defaultWidgets);
    setLayout(setWidgetsLayouts(currentBreakpoint, defaultWidgets));
    setGridKey(gridKey + 1);
  }, [setWidgets, setLayout, currentBreakpoint, setGridKey, gridKey]);

  useEffect(() => {
    const savedWidgets = getWidgetsPreferences();
    const widgetLayoutSaved = widgets.every((widget) => {
      const savedWidget = savedWidgets.find((savedWidget) => savedWidget.id === widget.id);

      return (
        savedWidget &&
        savedWidget.visible === widget.visible &&
        savedWidget.position === widget.position &&
        savedWidget.x === widget.x
      );
    });
    setWidgetLayoutSaved(widgetLayoutSaved);
  }, [widgets]);

  useEffect(() => {
    handleCloseWidgetsMenu();
    handleCloseSmallScreenMenu();
  }, [currentBreakpoint, handleCloseSmallScreenMenu, handleCloseWidgetsMenu]);

  const ActionButtons: React.FC = ({}) => {
    return (
      <>
        <Grid item>
          <Button
            variant="contained"
            title="Save Dashboard Layout"
            color={widgetLayoutSaved ? "secondary" : "primary"}
            onClick={saveWidgetPreferences}
          ></Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            title="Reset Dashboard Layout"
            onClick={resetWidgetPreferences}
          ></Button>
        </Grid>
      </>
    );
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "60px",
        width: "100%",
        margin: "0px 10px",
      }}
    >
      <CardContent sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
        <Grid container spacing={2} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Grid item xl={3} lg={5} md={5} sm={3} xs={5}></Grid>
          <Grid item>
            <FormControl>
              <InputLabel size="small">Timeline</InputLabel>
              <Select
                size="small"
                value={timeline}
                onChange={(event) => setTimeline(event.target.value)}
                label="Timeline"
              >
                <MenuItem value={"This Week"}>This Week</MenuItem>
                <MenuItem value={"This Fortnight"}>This Fortnight</MenuItem>
                <MenuItem value={"This Month"}>This Month</MenuItem>
                <MenuItem value={"Six Months"}>Six Months</MenuItem>
                <MenuItem value={"Current Year"}>Current Year</MenuItem>
                <MenuItem value={"Past Year"}>Past Year</MenuItem>
                <MenuItem value={"Previous Month"}>Previous Month</MenuItem>
                <MenuItem value={"Next Month"}>Next Month</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Hidden smDown>
            <Grid item>
              <Grid container spacing={1}>
                <ActionButtons />
                <Grid item>
                  <Button
                    variant="contained"
                    title="Widgets Menu"
                    color="primary"
                    onClick={(event) => {
                      handleClickWidgetsMenu(event);
                    }}
                  ></Button>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>

          <Hidden smUp>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleClickSmallScreenMenu}></Button>
              <Menu
                anchorEl={anchorElSmallScreenMenu}
                keepMounted
                open={Boolean(anchorElSmallScreenMenu)}
                onClose={handleCloseSmallScreenMenu}
              >
                <MenuItem>
                  <Grid item>
                    <Grid container spacing={1}>
                      <ActionButtons />
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(event) => {
                            handleClickWidgetsMenu(event);
                          }}
                        ></Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </MenuItem>
              </Menu>
            </Grid>
          </Hidden>
          <WidgetsMenu
            anchorEl={anchorElWidgetsMenu}
            handleClose={handleCloseWidgetsMenu}
            widgets={widgets}
            selectedWidgets={selectedWidgets}
            handleCheckboxChange={handleCheckboxChange}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ActionBar;
