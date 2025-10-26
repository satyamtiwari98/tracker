# Investment Tracker

A simple web application to track your **income, expenses, and deposits**. Built with **React (TypeScript)** for the frontend and **Flask** for the backend, storing transactions in a JSON file. Features include **adding**, **viewing**, and **deleting transactions**, with automatic balance calculations.

---

## **Features**

* Add transactions with **date, description, category, and amount**.
* Automatically calculates **running balance**.
* Distinguishes between **Income, Expense, and Deposit**.
* Delete transactions with **backend sync**.
* View a **summary** showing total income, total expenses, and final balance.
* Simple **JSON file storage** for backend persistence.

---

## **Tech Stack**

* **Frontend:** React, TypeScript, Tailwind CSS
* **Backend:** Flask, Flask-CORS
* **Data Storage:** JSON file (`data.json`)

---

## **Project Structure**

```
tracker/
│
├─ backend/
│   ├─ app.py           # Flask API
│   └─ data.json        # Transaction data
│
├─ frontend/
│   ├─ src/
│   │   ├─ App.tsx
│   │   ├─ components/
│   │   │   ├─ addExpenseDeposit/AddExpenseDeposit.tsx
│   │   │   └─ table/Table.tsx
│   │   └─ index.tsx
│   └─ package.json
└─ README.md
```

---

## **Setup Instructions**

### **Backend (Flask)**

1. Navigate to the backend folder:

```bash
cd backend
```

2. Create and activate a Python virtual environment:

```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
```

3. Install dependencies:

```bash
pip install flask flask-cors
```

4. Run the Flask server:

```bash
python app.py
```

* Server runs at `http://127.0.0.1:5000`
* API Endpoints:

  * `GET /transactions` – Get all transactions
  * `POST /transactions` – Add a new transaction
  * `DELETE /transactions/<index>` – Delete transaction by index

---

### **Frontend (React + TypeScript)**

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend:

```bash
npm run dev
```

* App runs at `http://localhost:5173` (default Vite port)

---

## **Usage**

1. Click **"Show Form"** to add a transaction.
2. Fill in the **date, description, category, and amount**.

   * For **Expense**, the amount will automatically be negative.
3. Click **Add Entry** – the transaction is saved to backend and updates the table.
4. Click **Delete** on any transaction to remove it – balances will automatically recalculate.
5. View **summary** for total income, expenses, and final balance.

---

## **Notes**

* Amounts in **negative** represent expenses.
* Balances are recalculated automatically after each addition or deletion.
* JSON file storage is simple but not meant for production use.

---

## **Future Improvements**

* Use a database (SQLite, PostgreSQL) instead of JSON for persistence.
* Add user authentication.
* Add charts to visualize income vs expenses.
* Filter transactions by category or date.

---

This README gives clear instructions for **setup, usage, and project structure**, so anyone can get your app running.

---
