import React from "react";
import {
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import Grid from "@material-ui/core/Grid";
import { CartContext } from "helpers/CartContext";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

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
  root: {
    maxWidth: 345,
    width: "100%",
    backgroundColor: "#fcfcfc",
  },
  button: {
    border: "1px solid #b3b3b3",
    borderRadius: 5
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
  modalImage: {
    height: 358,
    width: "auto",
    [specialBreakpoint.breakpoints.down("md")]: {
      height: 260,
    },
  },
  dialogPaper: {
    minHeight: 588,
  },
  new: {
    width: 30,
    height: "auto",
    objectFit: "contain",
    borderRadius: 0,
    marginLeft: 5,
  },
}));

export default function ProductCard(props) {
  const classes = useStyles();
  const [count, setCount] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const {
    cartItems,
    increaseAmount,
    addProduct,
    removeProduct,
  } = React.useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  const selectedCartItem = (id) => {
    return cartItems.filter((e) => e.id === id);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCloseModal();
      handleSubmit();
    }
  }

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    const isNumber = /^[0-9\b]+$/;
    value === "" || isNumber.test(value)
      ? setCount(Number(value))
      : setCount(0);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (count <= 0 && isInCart(props)) {
      removeProduct(props);
    } else if (count > 0) {
      isInCart(props)
        ? increaseAmount({ ...props, count: count })
        : addProduct({ ...props, count: count });
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
        scroll="body"
        onKeyPress={handleKeyPress}
      >
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <Avatar
            variant="square"
            className={classes.modalImage}
            alt={props.title}
            src={props.image}
          />
          <Typography
            variant="body1"
            component="h6"
            align="right"
            className={classes.showPieces}
          >
            Package: {props.pieces} pcs
          </Typography>
          <Typography
            variant="body1"
            component="h6"
            align="right"
            className={classes.code}
          >
            X Code: {props.sku}
          </Typography>
          <TextField
            variant="outlined"
            margin="dense"
            id="quantity"
            label="تعداد"
            type="text"
            fullWidth
            value={count}
            onChange={handleQuantityChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            بازگشت
          </Button>
          <Button
            onClick={() => {
              handleCloseModal();
              handleSubmit();
            }}
            color="primary"
          >
            تایید
          </Button>
        </DialogActions>
      </Dialog>
      <Card className={classes.root}>
        <CardActionArea>
          {props.loading ? (
            <Skeleton
              animation="wave"
              variant="rect"
              className={classes.media}
            />
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
                    alignItems="baseline"
                    overflow="hidden"
                    className={classes.customBox}
                  >
                    {props.new && (
                      <Avatar
                        alt="new"
                        src={process.env.PUBLIC_URL + "/new.png"}
                        className={classes.new}
                        imgProps={{
                          style: {
                            objectFit: "contain",
                          },
                        }}
                      />
                    )}
                    <Typography
                      variant="body1"
                      component="h3"
                      align="right"
                      className={classes.middleLine}
                      noWrap
                    >
                      {props.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    component="h4"
                    className={classes.showPieces}
                  >
                    Package : {props.pieces} in 1
                  </Typography>
                  <Typography
                    variant="body1"
                    component="h4"
                    align="right"
                    className={classes.code}
                  >
                    Code: {props.sku}
                  </Typography>
                </React.Fragment>
              )}
            </Grid>
            {!props.loading && (
              <Grid item xs={2} className={classes.buttonContainer}>
                <IconButton
                  color="primary"
                  aria-label="increase"
                  size="small"
                  className={classes.button}
                  onClick={() => {
                    setCount(
                      isInCart(props)
                        ? selectedCartItem(props.id)[0].quantity
                        : 0
                    );
                    handleOpenModal();
                  }}
                >
                  <Badge badgeContent={isInCart(props) ? selectedCartItem(props.id)[0].quantity : 0} max={2000} color="primary" >
                    <LocalMallOutlinedIcon />
                  </Badge>
                </IconButton>
              </Grid>
            )}
          </Grid>
        </CardActions>
      </Card>
    </>
  );
}
