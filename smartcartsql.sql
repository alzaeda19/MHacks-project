CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS grocery_items (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_name TEXT NOT NULL,
    brand TEXT NOT NULL,
    date_purchased TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);



--INSERT INTO grocery_items(user_id, product_name, brand, date_purchesed)
--VALUES(1, "carrot", "apple", 1/3/2023);

--select * from grocery_items; 