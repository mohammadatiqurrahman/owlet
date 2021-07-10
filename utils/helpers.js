export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues = (products, type) => {
  // console.log(products);
  const variants = products.map((item) => JSON.parse(item.variants));
  // console.log(variants);
  const merged = [].concat.apply([], variants);
  if (type === "size") {
    // console.log(merged);
    const sizes = merged.map((item) => item.sizes);
    const mergedSizes = [].concat.apply([], sizes);
    // console.log(mergedSizes)
    const actualSizes = mergedSizes.map((item) => Object.keys(item));
    // console.log(actualSizes)
    const sizeArray = [].concat.apply([], actualSizes);
    // console.log(sizeArray)
    let unique = ["all", ...new Set(sizeArray)];
    // console.log(unique)
    return unique;
  }

  //uniqe colors
  if (type === "colors") {
    const colorCode = [
      "all",
      ...new Set(merged.map((item) => item.color_code)),
    ];
    // console.log(colorCode);
    const colorName = [
      "all",
      ...new Set(merged.map((item) => item.color_name)),
    ];
    return { colorCode, colorName };
  }
  // console.log(colorName);

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


