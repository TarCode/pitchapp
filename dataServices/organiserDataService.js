module.exports = function (connection) {

  var getData = function(query, cb){
      connection.query( query, cb);
  };

  var insertData = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.getAllCompetitions = function (cb) {
      getData('SELECT id, name, image_url, entrants, organizer, description, location, DATE_FORMAT(date, "%d/%l/%Y") as date, start_time, end_time  FROM competition', cb );
  };

  this.insertCategory = function (data, cb) {
      insertData('INSERT INTO category SET ?', data, cb );
  };

  this.deleteCategory = function (data, cb) {
      insertData('DELETE FROM category WHERE cat_id = ?', data, cb );
  };

  this.searchCategory = function (data, cb) {
      insertData('SELECT cat_id, cat_name from category WHERE cat_name LIKE ?', data, cb );
  };

  this.popularCategory = function (cb) {
      getData('SELECT cat_name, sum(qtySold) as total_sold FROM product,category,sales  WHERE product.prod_id = sales.prod_id AND category.cat_id = product.cat_id GROUP BY cat_name ORDER BY total_sold DESC', cb );
  };

  this.profitsPerCategory = function (cb) {
      getData('SELECT cat_name, supplier_name, sum(salePrice - cost) as profit FROM product,sales,stock,supplier, category where product.prod_id = sales.prod_id and product.prod_id = stock.prod_id and stock.supplier_id = supplier.supplier_id and product.cat_id = category.cat_id group by cat_name order by profit desc', cb );
  };

};
