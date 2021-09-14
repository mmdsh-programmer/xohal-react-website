import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Grid from "@material-ui/core/Grid";
import { CartContext } from "helpers/CartContext";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";

const StyledBadge = withStyles((theme) => ({
  badge: {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    left: -8,
    top: -4,
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: "100%",
    backgroundColor: "#fcfcfc",
  },
  button: {
    minWidth: "25px",
    padding: "1px 1px",
  },
  borderlessButton: {
    border: "none",
  },
  coloredBorderButton: {
    borderBottom: "1px solid rgba(245, 0, 87, 0.5) !important",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  topMargin: {
    marginTop: "10px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "rgb(160,160,160)",
  },
  middleLine: {
    color: "rgb(102,102,102)",
  },
  code: {
    fontSize: "0.77rem",
    color: "rgb(160,160,160)",
  },
  media: {
    height: 358,
  },
  cardDescription: {
    flexDirection: "row-reverse",
    minHeight: 78,
  },
  customChip: {
    position: "absolute",
    right: 0,
    top: 15,
    minWidth: 65,
    borderRadius: 0,
  },
  showPieces: {
    fontSize: "0.77rem",
    color: "rgb(160,160,160)",
    marginTop: 10,
    direction: "initial",
  },
  pack: {
    alignSelf: "center",
    whiteSpace: "pre",
    direction: "initial",
    fontSize: "0.81rem",
  },
  customBox: {
    marginTop: 10,
  },
}));

export default function ProductCard(props) {
  const classes = useStyles();
  const [count, setCount] = React.useState(0);
  const {
    cartItems,
    increase,
    addProduct,
    decrease,
    removeProduct,
  } = React.useContext(CartContext);
  const [show, setShow] = React.useState(false);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  const selectedCartItem = (id) => {
    return cartItems.filter((e) => e.id === id);
  };

  const splitName = (name) => {
    const firstRow = name.split("|")[0];
    const firstRowTemp = name.split("|")[1];
    const secondRow =
      typeof firstRowTemp !== "undefined" && firstRowTemp.split("—")[0];
    const splitedName = { firstRow: firstRow, secondRow: secondRow };
    return splitedName;
  };

  const handleShowPack = () => {
    const count = isInCart(props) ? selectedCartItem(props.id)[0].quantity : 0;
    if (count + 1 == 1) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1800);
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {props.loading ? (
          <Skeleton animation="wave" variant="rect" className={classes.media} />
        ) : (
          <CardMedia
            component="img"
            alt={props.title}
            height="358"
            image={props.image}
            title={props.title}
          />
        )}
      </CardActionArea>
      <CardActions
        classes={{
          root: classes.cardAction,
        }}
      >
        <Grid container spacing={1} className={classes.cardDescription}>
          <Grid item xs={10}>
            {props.loading ? (
              <React.Fragment>
                <Skeleton
                  animation="wave"
                  height={10}
                  width="60%"
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  animation="wave"
                  height={10}
                  width="60%"
                  style={{ marginBottom: 6 }}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Box
                  component="div"
                  display="flex"
                  textOverflow="ellipsis"
                  flexDirection="row-reverse"
                  alignItems="center"
                  overflow="hidden"
                  className={classes.customBox}
                >
                  {props.new && <div className="new-label">New</div>}
                  <Typography
                    variant="body1"
                    component="h2"
                    align="right"
                    className={classes.middleLine}
                    noWrap
                  >
                    {props.title}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  component="h2"
                  className={classes.showPieces}
                >
                  Package: {props.pieces} pcs
                </Typography>
                <Typography
                  variant="body1"
                  component="h2"
                  align="right"
                  className={classes.code}
                >
                  X Code: {props.sku}
                </Typography>
              </React.Fragment>
            )}
          </Grid>
          {!props.loading && (
            <Grid item xs={2} className={classes.buttonContainer}>
              <ButtonGroup orientation="vertical">
                {isInCart(props) && (
                  <Button
                    aria-label="reduce"
                    size="small"
                    variant="outlined"
                    color="secondary"
                    className={[
                      classes.button,
                      classes.coloredBorderButton,
                    ].join(" ")}
                    onClick={() => {
                      handleShowPack();
                      setCount(Math.max(count - 1, 0));
                      selectedCartItem(props.id)[0].quantity === 1
                        ? removeProduct(props)
                        : decrease(props);
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                )}
                {isInCart(props) && (
                  <Button
                    aria-label="count"
                    size="small"
                    variant="outlined"
                    style={{ visibility: show ? "hidden" : "visible" }}
                    className={[classes.button, classes.borderlessButton].join(
                      " "
                    )}
                  >
                    {isInCart(props)
                      ? selectedCartItem(props.id)[0].quantity
                      : 0}
                  </Button>
                )}
                <Button
                  aria-label="increase"
                  size="small"
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  onClick={() => {
                    handleShowPack();
                    setCount(count + 1);
                    isInCart(props) ? increase(props) : addProduct(props);
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
              {show && (
                <Typography
                  variant="body1"
                  component="h2"
                  className={[classes.pack, "animate__fadeInLeft"].join(" ")}
                >
                  {isInCart(props) ? selectedCartItem(props.id)[0].quantity : 0}
                  {"\t"}
                  package
                </Typography>
              )}
            </Grid>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
}
