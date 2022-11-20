import pymysql
from SQL.bank_app_queries import bank_app_queries
from fastapi import FastAPI, HTTPException
from Errors.error_messeges import server_error_messeges


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
            print(e)
            raise HTTPException(
                status_code=500, detail=server_error_messeges["get_balance"])

    def get_categories(self):
        try:
            return self.execute_query(bank_app_queries["get_categories"])
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail=server_error_messeges["get_categories"])

    def add_new_categories(self, data):
        query = bank_app_queries["add_new_categories"].format(
            ",".join([f'("{category}")' for category in data]))
        try:
            self.execute_query(query)
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail=server_error_messeges["add_new_categories"])

    def add_new_transaction(self, transaction):
        query = bank_app_queries["add_new_transaction"] + \
            f'("{transaction.category}","{transaction.vendor}","{transaction.amount}","{transaction.tr_date}")'
        try:
            self.execute_query(query)
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail=server_error_messeges["add_new_transaction"])

    def get_transactions(self):
        query = bank_app_queries["get_transactions"]
        try:
            return self.execute_query(query)
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail=server_error_messeges["get_transactions"])

    def delete_transaction(self, tr_id):
        query = bank_app_queries["delete_transaction"].format(tr_id)
        try:
            self.execute_query(query)
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail=server_error_messeges["delete_transaction"])

    def get_expenses_by_date(self):
        try:
            return self.execute_query(bank_app_queries["expenses_by_date"])
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail=server_error_messeges["expenses_by_date"])

    def get_expenses_by_categories(self):
        try:
            expenses = self.execute_query(
                bank_app_queries["expenses_by_categories"])
            return expenses

        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail=server_error_messeges["expenses_by_categories"])
