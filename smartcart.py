from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from smartcartutils import get_db_connection

app = Flask(__name__)

# User Registration
@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Invalid or missing data'}), 400

    username = data['username']
    hashed_password = generate_password_hash(data['password'])

    conn = get_db_connection()
    conn.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
    conn.commit()
    conn.close()

    return jsonify({'message': 'User registered successfully'})

# Add Grocery Item
@app.route('/items', methods=['POST'])
def add_item():
    data = request.json
    product_name = data['product_name']
    brand = data['brand']

    conn = get_db_connection()
    conn.execute('INSERT INTO grocery_items (product_name, brand) VALUES (?, ?)', (product_name, brand))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Item added successfully'})

# Get Grocery Items
@app.route('/items', methods=['GET'])
def get_items():
    conn = get_db_connection()
    items = conn.execute('SELECT * FROM grocery_items').fetchall()
    conn.close()
    return jsonify([dict(item) for item in items])

# Delete Grocery Item
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM grocery_items WHERE id = ?', (item_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Item deleted successfully'})

# Create Grocery List
@app.route('/lists', methods=['POST'])
def create_list():
    user_id = request.json.get('user_id')

    conn = get_db_connection()
    conn.execute('INSERT INTO user_grocery_lists (user_id) VALUES (?)', (user_id,))
    conn.commit()
    conn.close()

    return jsonify({'message': 'List created successfully'})

# Add Item to Grocery List
@app.route('/lists/<int:list_id>/items', methods=['POST'])
def add_item_to_list(list_id):
    item_id = request.json.get('item_id')
    quantity = request.json.get('quantity', 1)

    conn = get_db_connection()
    conn.execute('INSERT INTO list_items (list_id, item_id, quantity) VALUES (?, ?, ?)', 
                 (list_id, item_id, quantity))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Item added to list'})

# Get Grocery List Items
@app.route('/lists/<int:list_id>', methods=['GET'])
def get_list_items(list_id):
    conn = get_db_connection()
    items = conn.execute('SELECT * FROM list_items WHERE list_id = ?', (list_id,)).fetchall()
    conn.close()
    return jsonify([dict(item) for item in items])

if __name__ == '__main__':
    app.run(debug=True)