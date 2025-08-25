import { CONFIG } from 'src/config-global';

import ProductForm from 'src/sections/product/form/product-form';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Products - ${CONFIG.appName}`}</title>
      <ProductForm />
    </>
  );
}
