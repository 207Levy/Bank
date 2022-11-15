import BankDBManager
import pydantic

categories: list[str] = [
    "housing",
    "Tansportation",
    "Food",
    "Subscriptions",
    "Clothing",
    "HealthCare",
    "Insurance",
    "Education",
    "Savings",
    "Gifts",
    "Entertainment"
]


categories = [
    "housing",
    "Tansportation",
    "Food",
    "Subscriptions",
    "Clothing",
    "HealthCare",
    "Insurance",
    "Education",
    "Savings",
    "Gifts",
    "Entertainment"
]

tranactions = [
    {
        "amount": -1000,
        "category": "Food",
        "vendor": "stakes",
        "tr_date": "2022-11-15"
    },
    {
        "amount": -100,
        "category": "Food",
        "vendor": "eggs",
        "tr_date": "2022-11-16"
    },
    {
        "amount": 750,
        "category": "Entertainment",
        "vendor": "Poker",
        "tr_date": "2022-11-17"
    },

]


def init_the_database():
    db_manager = BankDBManager.BankDBManager()
    db_manager.add_new_categories(categories)
    db_manager.add_new_transactions(tranactions)


c = [f"({category})" for category in categories]

init_the_database()
