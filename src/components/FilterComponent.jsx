import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { FilterContext } from "helpers/FilterContext";
import Toolbar from "@material-ui/core/Toolbar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import TuneIcon from "@material-ui/icons/Tune";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import _without from "lodash/without";

const specialBreakpoint = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 769,
      lg: 1280,
      xl: 1920,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  sortButton: {
    margin: theme.spacing(3),
    position: "fixed",
    bottom: "0",
    right: "0",
    zIndex: 999,
    backgroundColor: "rgb(70,70,70)",
    "&:hover": {
      backgroundColor: "rgb(70,70,70)",
    },
    "&:active": {
      backgroundColor: "rgb(70,70,70)",
    },
  },
  sortIcon: {
    marginTop: "13px",
    marginRight: "10px",
  },
  filterDrawerContainer: {
    width: 300,
    justifyContent: "center",
    padding: theme.spacing(3),
  },
  slider: {
    minWidth: 250,
    maxWidth: 250,
    alignSelf: "center",
    margin: theme.spacing(4),
    marginTop: theme.spacing(6),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  filterBar: {
    backgroundColor: "rgb(240,240,240)",
    marginBottom: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    position: "sticky",
    top: "0",
    zIndex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  formControl: {
    minWidth: "100%",
    maxWidth: 300,
    margin: theme.spacing(2),
    marginTop: 0,
    [specialBreakpoint.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobileFormControl: {
    minWidth: 210,
    maxWidth: 300,
    margin: theme.spacing(2),
    marginTop: 0,
  },
  openSizeButton: {
    width: "200px",
    height: "auto",
    backgroundColor: "transparent",
    border: "1px solid rgba(0, 0, 0, 0.27)",
    color: "rgba(0, 0, 0, 0.5)",
    boxShadow: "none",
    fontSize: "1rem",
    margin: theme.spacing(2),
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: "transparent",
      color: "rgba(0, 0, 0, 0.5)",
      border: "1px solid rgba(0, 0, 0, 0.57)",
      boxShadow: "none",
    },
  },
  buttonContainer: {
    backgroundColor: "#fcfcfc",
    position: "sticky",
    bottom: "0px",
    display: "flex",
    justifyContent: "flex-end",
  },
  submit: {
    margin: theme.spacing(1),
  },
  mobileFilterButton: {
    minWidth: 250,
    maxWidth: 450,
    [specialBreakpoint.breakpoints.up("md")]: {
      display: "none",
    },
  },
  container: {
    marginTop: theme.spacing(10),
  },
  fixedSubmitContainer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  fixedSubmit: {
    borderRadius: 0,
    minHeight: 50,
  },
  mobileFilterToolbar: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(10),
    justifyContent: "center",
  },
  dFlex: {
    display: "flex",
    justifyContent: "center",
  },
  filterGridContainer: {
    [specialBreakpoint.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  getContentAnchorEl: null,
};

export default function FilterComponent(props) {
  const classes = useStyles();
  const [openMobileFilter, setOpenMobileFilter] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setFilter, filter } = React.useContext(FilterContext);
  const defaultFilterText = "همه";
  const [material, setMaterial] = React.useState(
    typeof filter !== "undefined"
      ? filter.materials.length === 0
        ? [defaultFilterText]
        : filter.materials
      : [defaultFilterText]
  );
  const [size, setSize] = React.useState(
    typeof filter !== "undefined"
      ? filter.sizes.length === 0
        ? [defaultFilterText]
        : filter.sizes
      : [defaultFilterText]
  );
  const { slug } = props;
  const filterOptions = {
    box: {
      hasSize: false,
      hasMaterial: false,
      material: [],
      size: [],
    },
    tazhib: {
      hasSize: true,
      hasMaterial: true,
      material: [10, 12],
      size: [3, 4, 5, 15, 16],
    },
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  let materials = material;

  const checkSlug = () => {
    switch (slug) {
      case "باکس فلزی":
        return filterOptions.box;
      case "تذهیب":
        return filterOptions.tazhib;
    }
  };

  const checkSize = (size) => {
    switch (size) {
      case 3:
        return "A3";
      case 4:
        return "A4";
      case 5:
        return "A5";
      case 15:
        return "B5";
      case 16:
        return "B6";
      default:
        return "همه";
    }
  };

  const checkMaterial = (material) => {
    switch (material) {
      case 10:
        return "ساده";
      case 12:
        return "زر نشان";
      default:
        return "همه";
    }
  };

  const removeUndefined = (array) => {
    return array.filter((item) => {
      return typeof item !== "undefined";
    });
  };

  const handleSingleSelectChange = (select, event) => {
    const value = event.target.value;
    switch (select) {
      case "material":
        setMaterial(
          value.length > 1
            ? typeof value[value.length - 1] !== "undefined"
              ? [value[value.length - 1]]
              : [defaultFilterText]
            : [defaultFilterText]
        );
        break;
      case "size":
        setSize(
          value.length > 1
            ? typeof value[value.length - 1] !== "undefined"
              ? [value[value.length - 1]]
              : [defaultFilterText]
            : [defaultFilterText]
        );
        break;
    }

    //setMaterial(data)
  };

  const handleMaterialChange = (event) => {
    let val = event.target.value;
    if (val.includes(defaultFilterText)) {
      val.splice(val.indexOf(defaultFilterText), 1);
    }
    setMaterial(
      val.length === 0
        ? [defaultFilterText]
        : removeUndefined(event.target.value)
    );
  };

  const handleSizeChange = (event) => {
    let val = event.target.value;
    if (val.includes(defaultFilterText)) {
      val.splice(val.indexOf(defaultFilterText), 1);
    }
    setSize(
      val.length === 0
        ? [defaultFilterText]
        : removeUndefined(event.target.value)
    );
  };

  const handleSubmit = () => {
    setFilter({
      materials: material.includes(defaultFilterText) ? [] : material,
      sizes: size.includes(defaultFilterText) ? [] : size,
    });
  };

  const handleMobileFilterOpen = () => {
    setOpenMobileFilter(true);
  };

  const handleMobileFilterClose = () => {
    setOpenMobileFilter(false);
  };

  const handleChipDelete = (e, value, destination) => {
    e.preventDefault();
    switch (destination) {
      case "material":
        setFilter({
          materials: material.length === 1 ? [] : _without(material, value),
          sizes: size.includes(defaultFilterText) ? [] : size,
        });
        break;
      case "size":
        setFilter({
          materials: material.includes(defaultFilterText) ? [] : material,
          sizes: size.length === 1 ? [] : _without(size, value),
        });
        break;
    }
  };

  return (
    <React.Fragment>
      {checkSlug().hasMaterial || checkSlug().hasSize ? (
        <Toolbar className={classes.filterBar}>
          <Button
            variant="outlined"
            color="default"
            className={classes.mobileFilterButton}
            startIcon={<TuneIcon />}
            onClick={handleMobileFilterOpen}
          >
            فیلتر ها
          </Button>
          <Dialog
            fullScreen
            open={openMobileFilter}
            onClose={handleMobileFilterClose}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleMobileFilterClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  فیلتر ها
                </Typography>
              </Toolbar>
            </AppBar>

            <Toolbar className={classes.mobileFilterToolbar}>
              {checkSlug().hasMaterial && (
                <FormControl className={classes.mobileFormControl} fullWidth>
                  <InputLabel id="demo-mutiple-checkbox-label">نوع</InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={material}
                    onChange={handleMaterialChange}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map(
                          (value, index) =>
                            typeof value !== "undefined" && (
                              <Chip
                                key={index}
                                label={checkMaterial(value)}
                                className={classes.chip}
                                clickable
                                deleteIcon={
                                  value !== defaultFilterText ? (
                                    <CancelIcon
                                      onMouseDown={(event) =>
                                        event.stopPropagation()
                                      }
                                    />
                                  ) : (
                                    <CheckCircleIcon
                                      onMouseDown={(event) => {
                                        event.stopPropagation();
                                        handleSubmit();
                                      }}
                                    />
                                  )
                                }
                                onDelete={(e) =>
                                  handleChipDelete(e, value, "material")
                                }
                              />
                            )
                        )}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {checkSlug().material.map((name, index) => (
                      <MenuItem key={index} value={name}>
                        <Checkbox checked={material.indexOf(name) > -1} />
                        <ListItemText primary={checkMaterial(name)} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {checkSlug().hasSize && (
                <FormControl className={classes.mobileFormControl} fullWidth>
                  <InputLabel id="size-mutiple-checkbox-label">سایز</InputLabel>
                  <Select
                    labelId="size-mutiple-checkbox-label"
                    id="size-mutiple-checkbox"
                    multiple
                    value={size}
                    onChange={handleSizeChange}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map(
                          (value, index) =>
                            typeof value !== "undefined" && (
                              <Chip
                                key={index}
                                label={checkSize(value)}
                                className={classes.chip}
                                clickable
                                deleteIcon={
                                  value !== defaultFilterText ? (
                                    <CancelIcon
                                      onMouseDown={(event) =>
                                        event.stopPropagation()
                                      }
                                    />
                                  ) : (
                                    <CheckCircleIcon
                                      onMouseDown={(event) => {
                                        event.stopPropagation();
                                        handleSubmit();
                                      }}
                                    />
                                  )
                                }
                                onDelete={(e) =>
                                  handleChipDelete(e, value, "size")
                                }
                              />
                            )
                        )}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {checkSlug().size.map((name, index) => (
                      <MenuItem key={index} value={name}>
                        <Checkbox checked={size.indexOf(name) > -1} />
                        <ListItemText primary={checkSize(name)} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Toolbar>

            <div className={classes.fixedSubmitContainer}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<TuneIcon />}
                onClick={handleMobileFilterOpen}
                fullWidth
                className={classes.fixedSubmit}
                onClick={() => {
                  handleSubmit();
                  handleMobileFilterClose();
                }}
              >
                اعمال فیلتر ها
              </Button>
            </div>
          </Dialog>
          <Grid container spacing={2} className={classes.filterGridContainer}>
            {checkSlug().hasMaterial && (
              <Grid item xs={12} sm={4} md={3} className={classes.dFlex}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label">نوع</InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={material}
                    onChange={(e) => handleSingleSelectChange("material", e)}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map(
                          (value, index) =>
                            typeof value !== "undefined" && (
                              <Chip
                                key={index}
                                label={checkMaterial(value)}
                                className={classes.chip}
                                clickable
                                deleteIcon={
                                  value !== defaultFilterText ? (
                                    <CancelIcon
                                      onMouseDown={(event) =>
                                        event.stopPropagation()
                                      }
                                    />
                                  ) : (
                                    <CheckCircleIcon
                                      onMouseDown={(event) => {
                                        event.stopPropagation();
                                        handleSubmit();
                                      }}
                                    />
                                  )
                                }
                                onDelete={(e) =>
                                  handleChipDelete(e, value, "material")
                                }
                                onClick={(e) => {
                                  e.preventDefault();
                                  value === defaultFilterText && handleSubmit();
                                }}
                              />
                            )
                        )}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {checkSlug().material.map((name, index) => (
                      <MenuItem key={index} value={name}>
                        <FormControlLabel
                          control={<Radio />}
                          checked={material.indexOf(name) > -1}
                        />
                        <ListItemText primary={checkMaterial(name)} />
                      </MenuItem>
                    ))}
                    <div className={classes.buttonContainer}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                      >
                        اعمال
                      </Button>
                    </div>
                  </Select>
                </FormControl>
              </Grid>
            )}
            {checkSlug().hasSize && (
              <Grid item xs={12} sm={4} md={3} className={classes.dFlex}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="size-mutiple-checkbox-label">سایز</InputLabel>
                  <Select
                    labelId="size-mutiple-checkbox-label"
                    id="size-mutiple-checkbox"
                    multiple
                    value={size}
                    onChange={(e) => handleSingleSelectChange("size", e)}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map(
                          (value, index) =>
                            typeof value !== "undefined" && (
                              <Chip
                                key={index}
                                label={checkSize(value)}
                                className={classes.chip}
                                clickable
                                deleteIcon={
                                  value !== defaultFilterText ? (
                                    <CancelIcon
                                      onMouseDown={(event) =>
                                        event.stopPropagation()
                                      }
                                    />
                                  ) : (
                                    <CheckCircleIcon
                                      onMouseDown={(event) => {
                                        event.stopPropagation();
                                        handleSubmit();
                                      }}
                                    />
                                  )
                                }
                                onDelete={(e) =>
                                  handleChipDelete(e, value, "size")
                                }
                              />
                            )
                        )}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {checkSlug().size.map((name, index) => (
                      <MenuItem key={index} value={name}>
                        <FormControlLabel
                          control={<Radio />}
                          checked={size.indexOf(name) > -1}
                        />
                        <ListItemText primary={checkSize(name)} />
                      </MenuItem>
                    ))}
                    <div className={classes.buttonContainer}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                      >
                        اعمال
                      </Button>
                    </div>
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      ) : null}
    </React.Fragment>
  );
}
