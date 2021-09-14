import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, useFormContext, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddressForm(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const methods = useFormContext();
  const {
    register,
    handleSubmit,
    control,
    errors: fieldsErrors,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  React.useEffect(() => {
    console.log(props);
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        مشخصات شما
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="نام"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            inputRef={methods.register({ required: true })}
            helperText={fieldsErrors.firstName ? "نام را وارد کنید" : null}
            error={fieldsErrors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="نام خانوادگی"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
            inputRef={methods.register({ required: true })}
            helperText={
              fieldsErrors.lastName ? "نام خانوادگی را وارد کنید" : null
            }
            error={fieldsErrors.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="shopName"
            name="shopName"
            label="نام فروشگاه"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
            inputRef={methods.register({ required: false })}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel id="demo-simple-select-outlined-label">
              وصول مطالبات
            </InputLabel>
            <Select
              labelId="receivables"
              label="وصول مطالبات"
              inputProps={{
                inputRef: (ref) => {
                  if (!ref) return;
                  methods.register({
                    name: "receivables",
                    value: ref.value,
                  });
                },
              }}
            >
              <MenuItem value="چکی">چکی</MenuItem>
              <MenuItem value="نقدی">نقدی</MenuItem>
              <MenuItem value="اعتباری">اعتباری</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel id="demo-simple-select-outlined-label">
              استان
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              label="استان"
            >
              <MenuItem value="چکی">چکی</MenuItem>
              <MenuItem value="نقدی">نقدی</MenuItem>
              <MenuItem value="اعتباری">اعتباری</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel id="demo-simple-select-outlined-label">شهر</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              label="شهر"
            >
              <MenuItem value="چکی">چکی</MenuItem>
              <MenuItem value="نقدی">نقدی</MenuItem>
              <MenuItem value="اعتباری">اعتباری</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="address"
            name="address"
            label="آدرس"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="street"
            name="street"
            label="خیابان"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
