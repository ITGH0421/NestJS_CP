import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export async function getProducts() {
  // const res = await axios.get(endpoints.product.list);
  // return res.data;
  const products = await import('src/_mock/_cpproduct.js');
  const res = products.PRODUCT;
  // console.log('getProducts', res);
  return res;
}

// ----------------------------------------------------------------------

export async function getProduct(id) {
  const URL = id ? `${endpoints.product.details}?productId=${id}` : '';
  const res = await axios.get(URL);
  return res.data;
}
