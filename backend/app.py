from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # <-- This allows all origins by default

DATA_FILE = "data.json"

# Helper to read/write JSON


def read_data():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)


def write_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)


@app.route("/transactions", methods=["GET"])
def get_transactions():
    data = read_data()
    return jsonify(data)


@app.route("/transactions", methods=["POST"])
def add_transaction():
    new_transaction = request.json
    data = read_data()

    # Calculate balance
    if data:
        new_transaction["balance"] = data[-1]["balance"] + \
            new_transaction["amount"]
    else:
        new_transaction["balance"] = new_transaction["amount"]

    data.append(new_transaction)
    write_data(data)
    return jsonify(new_transaction), 201


if __name__ == "__main__":
    app.run(debug=True)
