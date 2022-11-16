import pymysql


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

    def add_new_categories(self, data):
        connection = self.connection

        try:
            with connection.cursor() as cursor:
                query = f"""
                        INSERT IGNORE INTO categories(category) VALUES
                        {",".join([f'("{category}")' for category in data])}
                        """
                print(query)
                cursor.execute(query)
                connection.commit()
        except Exception as e:
            print(f"Error in adding new categories...")
            print(e)

    def add_new_transactions(self, transactions):
        connection = self.connection
        try:
            with connection.cursor() as cursor:
                query = f"""
                        INSERT INTO transactions (category, vendor,amount, tr_date) VALUES
                        {",".join([f'("{t["category"]}","{t["vendor"]}",{t["amount"]},"{t["tr_date"]}")' for t in transactions])}
                        """
                print(query)
                cursor.execute(query)
                connection.commit()
        except Exception as e:
            print(f"Error in adding new transactions...")
            print(e)

    def get_transactions(self):
        connection = self.connection
        try:
            with connection.cursor() as cursor:
                query = f"""
                        SELECT * FROM transactions;
                        """
                cursor.execute(query)
                result = cursor.fetchall()
                return result
        except Exception as e:
            print(f"Error in getting transactions...")
            print(e)

    def delete_transaction(self, tr_id):
        connection = self.connection
        try:
            with connection.cursor() as cursor:
                query = f"""
                        DELETE FROM transactions WHERE id={tr_id};
                        """
                cursor.execute(query)
                result = cursor.fetchall()
        except Exception as e:
            print(f"Error in deleting transaction #{tr_id}...")
            print(e)
