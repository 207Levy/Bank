from os import stat
from fastapi import Request
from fastapi import APIRouter
from SQL.BankDBManager import BankDBManager
from dto.Transaction import Transaction
from datetime import datetime
bank_db_manager = BankDBManager()

router = APIRouter(
    prefix="/transactions",
    tags=["transactions"]
)


@router.get('/')
def get_transactions(category="", date="", amount=""):
    list_of_all_transactions: list[Transaction] = [
        Transaction(**res) for res in bank_db_manager.get_transactions()]

    if category != "":
        list_of_all_transactions = [
            t for t in list_of_all_transactions if t.category == category]

    if amount != "":
        list_of_all_transactions = [
            t for t in list_of_all_transactions if t.amount >= int(amount)]

    if date != "":
        list_of_all_transactions = [
            t for t in list_of_all_transactions if t.tr_date >= datetime.strptime(date, '%Y-%m-%d').date()]

    return list_of_all_transactions


@router.post('/')
async def add_transaction(request: Request):
    transaction: Transaction = Transaction(await request.json())
    new_transactions = [].append(transaction)
    bank_db_manager.add_new_transactions(new_transactions)
    return new_transactions


@router.delete('/{transactionID}')
async def delete_transaction(tranactionID):
    bank_db_manager.delete_transaction(tranactionID)
