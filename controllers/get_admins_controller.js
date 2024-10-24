const pool = require("../models/pg_connector");

async function display_admin_page(req, res) {
  if (req.session.authented && req.session.role_id <= 2) {
    let shop_id = 0; // Default is "All Shops" (shop_id = 0)
    if (req.body.shops) {
      shop_id = parseInt(req.body.shops);
    }
    let table = await generate_table(shop_id);
    let dropdown_list = await generate_dropdown_list(shop_id);
    res.render("admins", {
      title: "ADMIN PAGE",
      products_table: table,
      droplist: dropdown_list,
    });
  } else {
    res.redirect("/");
  }
}

async function generate_table(shop_id) {
  let table = "";
  let query = "";

  // If shop_id is 0, get all products from all shops
  if (shop_id === 0) {
    query = `SELECT * FROM products`;
  } else {
    query = {
      text: "SELECT * FROM products WHERE shop_id = $1",
      values: [shop_id],
    };
  }

  try {
    const result = await pool.query(query);
    const rows = result.rows;
    const fields = result.fields;
    table = `<table border=1><tr>`;

    // Create header
    let col_list = [];
    for (let field of fields) {
      table += `<th>${field.name}</th>`;
      col_list.push(field.name);
    }
    table += `</tr>`;

    for (let row of rows) {
      table += `<tr>`;
      for (let col of col_list) {
        let cell = row[col];
        table += `<td>${cell}</td>`;
      }
      table += `</tr>`;
    }
    table += `</table>`;
  } catch (err) {
    console.log(err);
    table = "Cannot connect to DB";
  }
  return table;
}

async function generate_dropdown_list(selected_shop_id) {
  let dropdown_list = "";
  try {
    const query = `SELECT id, shop_name FROM shops;`;
    const result = await pool.query(query);
    const rows = result.rows;

    dropdown_list = `<form action="" method="post">
            <label for="shop">Choose a shop:</label>
            <select name="shops" id="shops">
            <option value="0" ${
              selected_shop_id == 0 ? "selected" : ""
            }>All Shops</option>`;

    // Add more shops to the dropdown list
    for (let row of rows) {
      dropdown_list += `<option value="${row.id}" ${
        row.id == selected_shop_id ? "selected" : ""
      }>${row.shop_name}</option>`;
    }
    dropdown_list += `</select>
                <button type="submit">Select</button>
            </form>`;
  } catch (err) {
    console.log(err);
    dropdown_list = "Cannot connect to DB";
  }
  return dropdown_list;
}

module.exports = display_admin_page;