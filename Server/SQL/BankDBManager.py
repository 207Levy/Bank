import pymysql
from SQL.bank_app_queries import bank_app_queries


class BankDBManager:
    def __init__(self) -> None:
        self.connection = pymysql.connect(
            host="localhost",
            user="root",
            password="",
            db="bank",
            charset="utf8",
            cursorclass=pymysql.cursors.DictCursor
        )

    def get_connection(self):
        return self.connection

    def execute_query(self, query):
        connection = self.connection
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
            connection.commit()
            return result

    def get_balance(self):
        try:
            return self.execute_query(bank_app_queries["get_balance"])
        except Exception as e:
            print(f"Error in adding new categories...")
            print(e)
            
    def get_categories(self):
        try:
            return self.execute_query(bank_app_queries["get_cateories"])
        except Exception as e:
           print(f"Error in getting categories...")
           print(e)
             
    def add_new_categories(self, data):
        query = bank_app_queries["add_new_categories"].format(
            ",".join([f'("{category}")' for category in data]))
        try:
            self.execute_query(query)
        except Exception as e:
            print(f"Error in adding new categories...")
            print(e)

    def add_new_transaction(self, transaction):
        query = bank_app_queries["add_new_transaction"] + f'("{transaction.category}","{transaction.vendor}","{transaction.amount}","{transaction.tr_date}")'
        try:
            self.execute_query(query)
        except Exception as e:
            print(f"Error in adding new transactions...")
            print(e)

    def get_transactions(self):
        query = bank_app_queries["get_transactions"]
        try:
            return self.execute_query(query)
        except Exception as e:
            print(f"Error in getting transactions...")
            print(e)

    def delete_transaction(self, tr_id):
        query = bank_app_queries["delete_transaction"].format(tr_id)
        try:
            self.execute_query(query)
        except Exception as e:
            print(f"Error in deleting transaction #{tr_id}...")
            print(e)

    def get_expenses_by_date(self):
        try:
            return self.execute_query(bank_app_queries["expenses_by_date"])
        except Exception as e:
            print(f"Error in getting transactions bt dates...")
            print(e)

    def get_expenses_by_categories(self):
        try:
            expenses = self.execute_query(
                bank_app_queries["expenses_by_categories"])
        except Exception as e:
            print(f"Error in getting transactions by categories...")
            print(e)
        return expenses
