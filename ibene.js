let serial = 0;

// first card operation
document.getElementById("first-card").addEventListener("click", function () {
  serial += 1;
  //   get the data from htm using id
  //   const productName = document.getElementById("first-name").innerText;
  //   const productPrice = document.getElementById("first-price").innerText;
  //   const productQuantity = document.getElementById("first-quantity").innerText;

  //  getting data using common function using getElementById method
  const pd = getData("first-name", "first-price", "first-quantity");
  //   multiply logic
  const priceTotal = parseInt(pd.productPrice) * parseInt(pd.productQuantity);
  //   show the data using function
  displayData(pd.productName, pd.productPrice, pd.productQuantity, priceTotal);
  //   disabled button using function
  disabledButton("first-card");
});

// using event object from browser
// second card operation
document.getElementById("second-card").addEventListener("click", function (e) {
  serial += 1;
  const pd = getAllData(e);
  //doing plus logic
  const sumTotal = parseInt(pd.pPrice) + parseInt(pd.pQuantity);
  //   show the data using function
  displayData(pd.pName, pd.pPrice, pd.pQuantity, sumTotal);
  //   disabled button using function
  disabledButton("second-card");
});

// third card operation
document.getElementById("third-card").addEventListener("click", function () {
  serial += 1;
  //   //   get the data from htm using id
  //   const productName = document.getElementById("third-title").innerText;
  //   const productPrice = document.getElementById("third-price").innerText;
  //   const productQuantity = document.getElementById("third-quantity").innerText;

  //  getting data using common function using getElementById method
  const pd = getData("third-title", "third-price", "third-quantity");

  //minus logic
  const priceTotal = parseInt(pd.productPrice) - parseInt(pd.productQuantity);
  //   show the data using function
  displayData(pd.productName, pd.productPrice, pd.productQuantity, priceTotal);
  //   disabled button using function
  disabledButton("third-card");
});

// card four oepration
document.getElementById("second-last").addEventListener("click", function (e) {
  serial += 1;
  const pd = getAllData(e);
  // ** logic
  const sumTotal = parseInt(pd.pPrice) ** parseInt(pd.pQuantity);
  //   show the data using function
  displayData(pd.pName, pd.pPrice, pd.pQuantity, sumTotal);
  //   disabled button using function
  disabledButton("second-card");
});

// last card
//we can not use common function beacuse its an input type , we need to use dot value
document.getElementById("last-card").addEventListener("click", function () {
  serial += 1;
  const productName = document.getElementById("last-title").innerText;
  const productPrice = document.getElementById("first-input").value;
  const productQuantity = document.getElementById("second-input").value;
  if (
    productPrice == "" ||
    productQuantity == "" ||
    productPrice <= 0 ||
    productQuantity <= 0
  ) {
    return alert("please enter any valid number");
  }
  const total = parseInt(productPrice) / parseInt(productQuantity);
  //   show the data using function
  displayData(productName, productPrice, productQuantity, total);
  //   disabled button using function
  disabledButton("last-card");
});

// common function to display data
function displayData(nameOfP, priceOfP, quantityOfp, resultP) {
  const container = document.getElementById("table-container");
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${serial}</td>
    <td>${nameOfP}</td>
    <td>${priceOfP}</td>
    <td>${quantityOfp}</td>
    <td>${resultP}</td>
    <td>
    <button class="btn btn-sm btn-red-500" id="${String(serial)}" onclick="onClickSquareButton(event)">Square</button>
    </td>
    
  `;
  container.appendChild(tr);
  document.getElementById("total-product").innerText = serial;
}

// common function to disable button
function disabledButton(id) {
  document.getElementById(id).setAttribute("disabled", true);
}

// common function to get data using event object
function getAllData(e) {
  const pName = e.target.parentNode.parentNode.children[0].innerText;
  const pPrice =
    e.target.parentNode.parentNode.children[2].children[0].innerText;
  const pQuantity =
    e.target.parentNode.parentNode.children[3].children[0].innerText;
  //   console.log(pName, pPrice, pQuantity);

  const pd = {
    pName: pName,
    pPrice: pPrice,
    pQuantity: pQuantity,
  };

  return pd;
}

// common function to get data using getElementById method
function getData(id1, id2, id3) {
  // get the data from htm using id
  const productName = document.getElementById(id1).innerText;
  const productPrice = document.getElementById(id2).innerText;
  const productQuantity = document.getElementById(id3).innerText;

  const pd = {
    productName: productName,
    productPrice: productPrice,
    productQuantity: productQuantity,
  };
  return pd;
}
////////------- ---------------------------------
///-------------------Ibene part start---------/////

// handler when user click on specific square button
function onClickSquareButton(event) {
  //getting all product data from table with shape of productObject{}
  const productDatas = getProductDatas();

  // looping over the products and change the specific product's total price matched with button serial number available in event emmitter
  for (i = 0; i < productDatas.length; i++) {
    if (productDatas[i].serial === event.target.id) {
      productDatas[i].totalPrice = Number(productDatas[i].totalPrice) * 2;
    //   productDatas[i].quantity = Number(productDatas[i].quantity) * 2;
    }
  }

  // re-rendering table element (simplify), might cause flickering issue.
  printProductTable(productDatas);
}

// takes array of product object and prints as table
function printProductTable(products) {
  const container = document.getElementById("table-container");
  container.innerHTML = "";
  for (i = 0; i < products.length; i++) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${i + 1}</td>
    <td>${products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].quantity}</td>
    <td>${products[i].totalPrice}</td>
    <td>
    <button class="btn btn-sm btn-red-500" id="${String(
      products[i].serial
    )}" onClick={onClickSquareButton(event)}>Square</button>
    </td>
    
  `;
    container.appendChild(tr);
  }
}

function getProductDatas() {
  const tableContainer = document.getElementById("table-container");
  let products = [];
  //find how many rows of table
  const rowLength = tableContainer.rows.length;
  //loops through rows
  for (i = 0; i < rowLength; i++) {
    //shape of a product object
    let productObject = {
      serial: "",
      name: "",
      price: "",
      quantity: "",
      totalPrice: "",
    };
    //get columns of current row
    const columns = tableContainer.rows.item(i).cells;
    //gets number of columns of current row
    var columnLength = columns.length;
    //loops through each cell in current row
    for (var j = 0; j < columnLength - 1; j++) {
      // get your column value/text here
      var columnVal = columns.item(j).innerHTML;
      // now based on the column index lets put the column value to the product object
      if (j === 0) {
        productObject.serial = columnVal;
      }
      if (j === 1) {
        productObject.name = columnVal;
      }
      if (j === 2) {
        productObject.price = columnVal;
      }
      if (j === 3) {
        productObject.quantity = columnVal;
      }
      if (j === 4) {
        productObject.totalPrice = columnVal;
      }
    }
    products.push(productObject);
  }
  return products;
}
