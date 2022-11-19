bank_app_queries = {
    "add_new_categories": "INSERT IGNORE INTO categories(category) VALUES {}",
    "add_new_transaction": "INSERT INTO transactions (category, vendor,amount, tr_date) VALUES ",
    "get_transactions": "SELECT * FROM transactions;",
    "get_categories":"""SELECT * FROM categories;""",
    "get_balance": """SELECT amount, SUM(amount)
                    FROM transactions""",
    "delete_transaction": '''DELETE FROM transactions WHERE id={}''',
    "expenses_by_date": '''SELECT tr_date ,SUM(amount)
                        FROM transactions            
                        GROUP BY tr_date;''',
    "expenses_by_categories": '''SELECT category ,SUM(amount)
                        FROM transactions            
                        GROUP BY category;'''


}
