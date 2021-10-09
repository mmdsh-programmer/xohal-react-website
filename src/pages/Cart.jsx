import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import { useHistory } from "react-router-dom";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { CartContext } from "helpers/CartContext";
import Avatar from "@material-ui/core/Avatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "components/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import { useForm } from "react-hook-form";
import coupon from "services/crud/coupons";
import { toast } from "react-toastify";
import Badge from "@material-ui/core/Badge";
import useDocumentTitle from "hooks/useDocumentTitle";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(13),
    marginBottom: theme.spacing(5),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    borderRadius: "0",
  },
  coupon: {
    marginRight: theme.spacing(2),
    width: "170px",
  },
  couponButton: {
    height: "2.8em",
  },
  goToCheckout: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    width: theme.spacing(30),
    margin: "auto",
  },
  dFlex: {
    display: "flex",
  },
}));

export default function Cart(props) {
  const classes = useStyles();
  useDocumentTitle("ویرایش سفارش");
  const {
    cartItems,
    increase,
    addProduct,
    decrease,
    removeProduct,
  } = React.useContext(CartContext);
  const history = useHistory();
  const { register, handleSubmit, errors: fieldsErrors } = useForm();
  const [loading, setLoading] = React.useState(false);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  const selectedCartItem = (id) => {
    return cartItems.filter((e) => e.id === id);
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    setLoading(true);
    console.log(data);
    coupon
      .read(`/wc/v3/coupons?code=${data.coupon}`)
      .then((res) => {
        setLoading(false);
        res.data.length > 0
          ? toast.success("کد تخفیف اعمال شد")
          : toast.error("کد تخفیف صحیح نیست");
      })
      .catch((error) => {
        loading(false);
        toast.error(error.message);
      });
  };

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Typography variant="h5" component="h1" className={classes.title}>
          ویرایش سفارش
        </Typography>
        {cartItems.length > 0 ? (
          <React.Fragment>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">تصویر محصول</StyledTableCell>
                    <StyledTableCell align="left">محصول</StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        <Badge
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          badgeContent={row.quantity}
                          color="secondary"
                          max={1000}
                        >
                          <Avatar
                            alt={row.title}
                            src={row.image}
                            className={classes.large}
                          />
                        </Badge>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.title}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <ButtonGroup orientation="vertical">
                          <Button
                            aria-label="increase"
                            size="small"
                            onClick={() => {
                              increase(row);
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                          {isInCart(row) && (
                            <Button
                              aria-label="reduce"
                              size="small"
                              onClick={() => {
                                selectedCartItem(row.id)[0].quantity === 1
                                  ? removeProduct(row)
                                  : decrease(row);
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </Button>
                          )}
                          <Button
                            aria-label="remove"
                            size="small"
                            onClick={() => {
                              removeProduct(row);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                <caption>
                  <form
                    className={classes.root}
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <TextField
                      id="coupon"
                      name="coupon"
                      label="افزودن کد تخفیف"
                      variant="outlined"
                      size="small"
                      className={classes.coupon}
                      inputRef={register({ required: true })}
                      helperText={
                        fieldsErrors.coupon ? "کد تخفیف را وارد کنید" : null
                      }
                      error={fieldsErrors.coupon}
                      required
                    />
                    <Button
                      variant="outlined"
                      type="submit"
                      className={classes.couponButton}
                      loading={loading}
                    >
                      اعمال
                    </Button>
                  </form>
                </caption>
              </Table>
            </TableContainer>
            <Grid container spacing={3} className={classes.dFlex}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  onClick={() => history.push(`/checkout`)}
                  className={classes.goToCheckout}
                >
                  ثبت سفارش
                </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        ) : (
          <Typography variant="body1" component="p" align="center">
            سبد سفارشات خالی است
          </Typography>
        )}
      </Container>
    </React.Fragment>
  );
}
