import Layout from "../components/Layout";
import { ProductsProvider } from "../context/products_context";
import { FilterProvider } from "../context/filter_context";
import { CartProvider } from "../context/cart_context";
import { UserProvider } from "../context/user_context";
import { GeneralProvider } from "../context/general_context";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <GeneralProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </GeneralProvider>
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  );
}

export default MyApp;
