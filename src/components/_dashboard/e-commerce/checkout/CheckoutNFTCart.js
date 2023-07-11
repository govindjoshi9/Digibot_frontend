import { sum } from 'lodash';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Card, Button, CardHeader, Typography } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import {
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  createBilling
} from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
//
import Scrollbar from '../../../Scrollbar';
import EmptyContent from '../../../EmptyContent';
import CheckoutSummary from './NFTSummary';
import CheckoutProductList from './CheckoutProductList';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const { cart, total, discount, subtotal } = checkout;
  const isEmptyCart = cart.length === 0;

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleApplyDiscount = (value) => {
    dispatch(applyDiscount(value));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { products: cart },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const value = {
          addressType: 'useradress',
          fullAddress: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
          isDefault: true,
          phone: '365-374-4961',
          receiver: 'Jayvion Simon'
        };
        dispatch(createBilling(value));
        setSubmitting(true);
        handleNextStep();
      } catch (error) {
        console.error(error);
        setErrors(error.message);
      }
    }
  });

  const { values, handleSubmit } = formik;
  const totalItems = sum(values.products.map((item) => item.quantity));

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Card
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      &nbsp;({totalItems} item)
                    </Typography>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              {!isEmptyCart ? (
                <Scrollbar>
                  <CheckoutProductList
                    formik={formik}
                    onDelete={handleDeleteCart}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                  />
                </Scrollbar>
              ) : (
                <EmptyContent
                  title="Cart is empty"
                  description="You have no items in your cart."
                  img="/static/illustrations/illustration_empty_cart.svg"
                />
              )}
            </Card>

            <Button
              color="inherit"
              component={RouterLink}
              to={PATH_DASHBOARD.eCommerce.root}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Continue Shopping
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutSummary
              total={total}
              enableDiscount
              discount={discount}
              subtotal={subtotal}
              onApplyDiscount={handleApplyDiscount}
            />
            <Button fullWidth size="large" type="submit" variant="contained" disabled={values.products.length === 0}>
              Check Out
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
