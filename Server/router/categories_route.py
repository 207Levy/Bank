from os import stat
from fastapi import Request
from fastapi import APIRouter
from SQL.BankDBManager import BankDBManager
from dto.Transaction import Transaction
from datetime import datetime
bank_db_manager = BankDBManager()

router = APIRouter(
    prefix="/categories",
    tags=["categories"]
)


@router.get('/')
def get_cateories():
    categories = bank_db_manager.get_categories()
    return [c["category"] for c in categories]
