class Invoice {
  constructor(
    products,
    tax,
    shipping_cost,
    total,
    // address_diff,
    payment_type,
    note,
    diff_name,
    diff_email,
    diff_phone,
    diff_address,
    diff_location_id,
    diff_area_id,
    diff_zip
  ) {
    this.products = products;
    this.tax = tax;
    this.shipping_cost = shipping_cost;
    this.total = total;
    // this.address_diff = address_diff;
    this.payment_type = payment_type;
    this.note = note;
    this.diff_name = diff_name;
    this.diff_email = diff_email;
    this.diff_phone = diff_phone;
    this.diff_address = diff_address;
    this.diff_location_id = diff_location_id;
    this.diff_area_id = diff_area_id;
    this.diff_zip = diff_zip;
  }
}
export default Invoice;
