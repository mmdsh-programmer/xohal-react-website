import React from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { useHistory, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
import Button from "components/Button";
import { useForm } from "react-hook-form";
import { loginUser, useAuthState, useAuthDispatch, logout } from "helpers/Auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signin(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await loginUser(dispatch, data);
      if (typeof response !== "undefined") {
        toast.success("ورود با موفقیت انجام شد");
        setTimeout(() => {
          props.history.push("/");
        }, 1000);
      } else {
        toast.error("نام کاربری یا رمز عبور اشتباه است");
      }
      setLoading(false);
    } catch (error) {
      toast.error(`مشکلی با عنوان روبرو به وجود آمد : ${error.message}`);
      console.log(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    logout(dispatch);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Zoom in={true}>
        <Paper className={classes.paper} elevation={5}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              inputRef={register({
                required: true,
              })}
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label="نام کاربری"
              name="username"
              autoComplete="current-username"
              autoFocus
              helperText={errors.username ? "نام کاربری را وارد کنید" : null}
              error={!!errors.username}
            />
            <TextField
              inputRef={register({
                required: true,
              })}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="گذرواژه"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={errors.password ? "گذرواژه را وارد کنید" : null}
              error={!!errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              loading={loading}
            >
              ورود
            </Button>
          </form>
        </Paper>
      </Zoom>
    </Container>
  );
}
