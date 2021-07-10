class GuestInvoice {
  constructor(
    name,
    email,
    phone,
    location,
    area,
    zip,
    address,
    products,
    tax,
    shipping_cost,
    total,
    payment_type
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.location = location;
    this.area = area;
    this.zip = zip;
    this.address = address;
    this.products = products;
    this.tax = tax;
    this.shipping_cost = shipping_cost;
    this.total = total;

    this.payment_type = payment_type;
  }
}
export default GuestInvoice;
