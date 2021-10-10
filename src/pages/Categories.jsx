import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import product from "services/crud/products";
import ProductCard from "components/ProductCard";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { FilterContext } from "helpers/FilterContext";
import FilterComponent from "components/FilterComponent";
import useDocumentTitle from "hooks/useDocumentTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import handleViewport from "react-in-viewport";
import { ProductContext } from "helpers/ProductsContext";

const specialBreakpoint = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1280,
      xl: 1920,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  w100: {
    width: "100%",
  },
  container: {
    width: "auto",
    margin: 0,
  },
  dFlex: {
    display: "flex",
    [specialBreakpoint.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    textAlign: "center",
  },
  loading: {
    margin: "auto",
    marginTop: theme.spacing(13),
    display: "flex",
  },
  loadMore: {
    display: "flex",
    margin: "30px auto",
  },
  infoText: {
    width: "100%",
    textAlign: "center",
    marginTop: theme.spacing(5),
  },
  gutter: {
    width: "100%",
    height: "80px",
  },
  allCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionHolder: {
    marginBottom: theme.spacing(5),
  },
  description: {
    borderLeft: "1px solid #6e6e6e",
    paddingLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      borderLeft: "none",
      paddingLeft: "0",
    },
  },
  viewPort: {
    height: 120,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Categories(props) {
  const classes = useStyles();
  const { filter } = React.useContext(FilterContext);
  const {
    initialProducts,
    filtering,
    allProducts,
    filteredProducts,
  } = React.useContext(ProductContext);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showMoreLoading, setShowMoreLoading] = React.useState(true);
  const [offset, setOffset] = React.useState(16);
  const { key } = props.match.params;
  const { slug } = props.match.params;
  useDocumentTitle(slug);

  const Block = (props) => {
    const { forwardedRef } = props;
    return (
      <div className={classes.viewPort} ref={forwardedRef}>
        {showMoreLoading && <CircularProgress size={40} disableShrink />}
      </div>
    );
  };
  const ViewportBlock = handleViewport(Block);

  const handleGoToTop = () => {
    const anchor = document.querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const categoryDescription = {
    box: {
      description:
        "این محصول انحصاری برند زحل با تکنولوژی مدرن و طراحی ویژه در اندازه های مختلف تولید می‌شود. متال باکس ها با کاربری چندگانه و تکنیک های چاپی ویژه همچون متالایز، در بازار بی‌رقیب بوده وبرای همه‌ی سلایق ارائه می‌گردد.",
      pieces: 5,
    },
    tazhib: {
      description: null,
      pieces: 4,
    },
  };

  const checkSlug = () => {
    switch (slug) {
      case "باکس":
        return categoryDescription.box;
      case "تذهیب":
        return categoryDescription.tazhib;
    }
  };

  const checkFilter = () => {
    if (filter.materials.length > 0 || filter.sizes.length > 0) {
      return filteredProducts;
    } else {
      return allProducts;
    }
  };

  const handleOffset = () => {
    setShowMoreLoading(true);
    setTimeout(() => {
      setShowMoreLoading(false);
      setOffset(offset + 16);
    }, 1000);
  };

  const isNew = (date) => {
    const now = new Date();
    const productCreatedTime = {
      day: Number(date.substr(8, 2)),
      month: Number(date.substr(5, 2)),
      year: Number(date.substr(0, 4)),
    };
    const currentTime = {
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    };
    const current = new Date(
      `${currentTime.month}/${currentTime.day}/${currentTime.year}`
    );
    const product = new Date(
      `${productCreatedTime.month}/${productCreatedTime.day}/${productCreatedTime.year}`
    );
    const diffTime = Math.abs(current - product);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 31) {
      return true;
    } else {
      return false;
    }
  };

  const getSkuSize = (sku) => {
    return Number(sku.substr(5, 2));
  };

  const getSkuMaterial = (sku) => {
    return Number(sku.substr(3, 2));
  };

  const hasMaterial = (product, materials) => {
    return materials.some((material) => product.includes(material));
  };

  const hasNumericMaterial = (sku, materials) => {
    return materials.some((material) => getSkuMaterial(sku) === material);
  };

  const hasSize = (sku, sizes) => {
    return sizes.some((size) => getSkuSize(sku) === size);
  };

  const hasAttribute = (attributes, filter, attributeName) => {
    const styleOptions = attributes.filter((attribute) => {
      return attribute.name === attributeName;
    });

    if (typeof styleOptions[0] !== "undefined") {
      return styleOptions[0].options.some((option) => filter.includes(option));
    } else {
      return false;
    }
  };

  const getFilterLength = () => {
    let count = 0;
    if (filter.materials.length > 0) {
      count++;
    }
    if (filter.sizes.length > 0) {
      count++;
    }
    return count;
  };

  const count = (array_elements) => {
    const sortedArray = array_elements.sort((a, b) => {
      return a.sku - b.sku;
    });

    let result = [];

    let current = null;
    let cnt = 0;
    for (let i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i] !== current) {
        if (cnt >= getFilterLength()) {
          result.push(current);
        }
        current = sortedArray[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt >= getFilterLength()) {
      result.push(current);
    }
    return result;
  };

  const filterProducts = (data) => {
    console.log(filter);
    let filteredMaterials = [];
    let filteredSizes = [];
    if (filter.materials.length > 0) {
      filteredMaterials = data.filter((product) => {
        return hasNumericMaterial(product.sku, filter.materials);
      });
    }
    if (filter.sizes.length > 0) {
      filteredSizes = data.filter((product) => {
        return hasSize(product.sku, filter.sizes);
      });
    }

    const finalFilter = filteredMaterials.concat(filteredSizes);

    filtering({ filtered: count(finalFilter) });
  };

  React.useEffect(() => {
    setLoading(true);
    setOffset(16);
    handleGoToTop();
    console.log(filter);
    product
      .read(
        `/wc/v3/products?category=${key}&orderby=date&stock_status=instock&status=publish&per_page=1000`
      )
      .then((res) => {
        console.log(res.data);
        initialProducts({ products: res.data });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [key]);

  React.useEffect(() => {
    setOffset(16);
    handleGoToTop();
    console.log(filter);
    if (filter.materials.length > 0 || filter.sizes.length > 0)
      filterProducts(allProducts);
  }, [filter]);

  const CategoriesComponent = () => {
    return (
      <div className={classes.w100}>
        <FilterComponent slug={slug} />
        <Grid
          container
          className={
            checkFilter().length > 0 ? classes.container : classes.dFlex
          }
          spacing={2}
        >
          {checkFilter().length > 0 ? (
            checkFilter()
              .slice(0, offset)
              .map((pr, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={3}
                    key={index}
                    className={classes.dFlex}
                  >
                    <ProductCard
                      image={
                        typeof pr.images[0] !== "undefined"
                          ? pr.images[0].src
                          : "https://merrix.com/wp-content/uploads/woocommerce-placeholder.png"
                      }
                      title={pr.name}
                      key={index}
                      id={pr.id}
                      sku={pr.sku}
                      stock={pr.stock_quantity}
                      new={isNew(pr.date_created)}
                      pieces={checkSlug().pieces}
                    />
                  </Grid>
                );
              })
          ) : (
            <Typography
              variant="body1"
              component="p"
              className={classes.infoText}
            >
              محصولی یافت نشد
            </Typography>
          )}
        </Grid>
        {checkFilter().length > 0 && offset < checkFilter().length ? (
          <ViewportBlock onEnterViewport={handleOffset} />
        ) : (
          <div className={classes.gutter}></div>
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.descriptionHolder}>
        <Grid
          container
          className={classes.container}
          spacing={2}
          alignItems="center"
          justify="center"
        >
          <Grid
            item
            xs={12}
            sm={typeof checkSlug().description !== "undefined" ? 6 : 12}
          >
            <Typography variant="h5" component="h1" className={classes.title}>
              {slug}
            </Typography>
          </Grid>
          {checkSlug().description !== null && (
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                component="p"
                className={classes.description}
                align="justify"
              >
                {checkSlug().description}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>

      <Container maxWidth="lg">
        <Grid container className={classes.container} spacing={2}>
          {loading ? (
            [...Array(4).keys()].map((virtual) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={3}
                  key={virtual}
                  className={classes.dFlex}
                >
                  <ProductCard
                    image={null}
                    title={null}
                    key={virtual}
                    id={virtual}
                    sku={null}
                    loading={loading}
                  />
                </Grid>
              );
            })
          ) : (
            <CategoriesComponent />
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
