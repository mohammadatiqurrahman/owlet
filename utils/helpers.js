export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues = (products, type) => {
  const variants = products.map((item) => JSON.parse(item.variants));
  const merged = [].concat.apply([], variants);
  if (type === "size") {
    const sizes = merged.map((item) => item.sizes);
    const mergedSizes = [].concat.apply([], sizes);
    const actualSizes = mergedSizes.map((item) => Object.keys(item));
    const sizeArray = [].concat.apply([], actualSizes);
    let unique = ["all", ...new Set(sizeArray)];
    return unique;
  }

  //uniqe colors
  if (type === "colors") {
    const colorCode = [
      "all",
      ...new Set(merged.map((item) => item.color_code)),
    ];
    const colorName = [
      "all",
      ...new Set(merged.map((item) => item.color_name)),
    ];
    return { colorCode, colorName };
  }

  // let unique = products.map((item) => item[type]);
  // if(type === 'colors'){
  //   unique = unique.flat()
  // }
  // return ["all", ...new Set(unique)];
};

export const paginate = (products) => {
  const userPerPage = 10;
  const totalBtn = Math.ceil(products.length / userPerPage);
  const userPaginate = Array.from({ length: totalBtn }, (item, index) => {
    const start = index * userPerPage;
    return products.slice(start, start + userPerPage);
  });
  return userPaginate;
};


