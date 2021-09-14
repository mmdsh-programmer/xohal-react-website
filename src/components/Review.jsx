import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { CartContext } from "helpers/CartContext";
import { useForm, useFormContext } from "react-hook-form";

const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const { cartItems } = React.useContext(CartContext);
  const { register } = useFormContext();

  React.useEffect(() => {
    console.log(props.data);
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        خلاصه سفارش
      </Typography>
      <List disablePadding>
        {cartItems.map((row) => (
          <ListItem className={classes.listItem} key={row.id}>
            <ListItemText primary={row.title} />
            <Typography variant="body2">{row.quantity}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="نوع پرداخت" />
          <Typography variant="subtitle1" className={classes.total}>
            هنگام دریافت
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            اطلاعات شما
          </Typography>
          <Typography gutterBottom>{register("firstName")}</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
