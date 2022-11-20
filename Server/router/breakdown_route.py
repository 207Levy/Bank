from os import stat
from fastapi import Request
from fastapi import APIRouter
from SQL.BankDBManager import BankDBManager
from dto.Transaction import Transaction
from datetime import datetime
bank_db_manager = BankDBManager()

router = APIRouter(
    prefix="/breakdown",
    tags=["breakedown"]
)


@router.get('/')
def get_breakdown():
    expenses_by_categories = bank_db_manager.get_expenses_by_categories()
    expenses_by_dates = bank_db_manager.get_expenses_by_date()
    result = {
        'categories': [{c["category"]: c["SUM(amount)"]} for c in  expenses_by_categories],
        'dates': [{d["tr_date"]: d["SUM(amount)"]} for d in expenses_by_dates]
    }

    return result
