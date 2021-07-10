class Invoice {
  constructor(products, tax, shipping_cost, total, address_diff, payment_type) {
    this.products = products;
    this.tax = tax;
    this.shipping_cost = shipping_cost;
    this.total = total;
    this.address_diff = address_diff;
    this.payment_type = payment_type;
  }
}
export default Invoice;
