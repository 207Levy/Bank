from os import stat
from fastapi import Request
from fastapi import APIRouter
from SQL.BankDBManager import BankDBManager
from dto.Transaction import Transaction
from datetime import datetime
from fastapi import FastAPI, HTTPException
bank_db_manager = BankDBManager()

router = APIRouter(
    prefix="/transactions",
    tags=["transactions"]
)


@router.get('/balance')
def get_balance():
    balance_as_array = bank_db_manager.get_balance()
    return  balance_as_array[0]

@router.get('/')
def get_transactions(category="", date="", amount=""):
    tranactions_from_db = bank_db_manager.get_transactions()
    list_of_all_transactions: list[Transaction] = [
        Transaction(**res) for res in tranactions_from_db]

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
    transaction: Transaction = Transaction(**(await request.json()))
    bank_db_manager.add_new_transaction(transaction)
    return transaction


@router.delete('/{transactionID}')
async def delete_transaction(transactionID: int):
    bank_db_manager.delete_transaction(transactionID)
