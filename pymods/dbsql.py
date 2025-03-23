import sqlite3

# Connect to SQLite database
conn = sqlite3.connect('stock_data.db')
cursor = conn.cursor()

# Create Stocks table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Stocks (
        stock_id INTEGER PRIMARY KEY AUTOINCREMENT,
        stock_symbol TEXT UNIQUE NOT NULL,
        stock_name TEXT NOT NULL
    )
''')

# Create Prices table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Prices (
        price_id INTEGER PRIMARY KEY AUTOINCREMENT,
        stock_id INTEGER,
        date TEXT NOT NULL,
        open REAL,
        high REAL,
        low REAL,
        close REAL,
        volume INTEGER,
        FOREIGN KEY (stock_id) REFERENCES Stocks (stock_id)
    )
''')

# Create Financials table with requested columns
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Financials (
        financial_id INTEGER PRIMARY KEY AUTOINCREMENT,
        stock_id INTEGER,
        period TEXT NOT NULL,
        revenue REAL,
        net_profits REAL,
        mutual_funds_holdings REAL,
        fi_holdings REAL,
        net_worth REAL,
        FOREIGN KEY (stock_id) REFERENCES Stocks (stock_id)
    )
''')

# Create Indices table for NIFTY/SENSEX trends
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Indices (
        index_id INTEGER PRIMARY KEY AUTOINCREMENT,
        index_name TEXT NOT NULL,
        date TEXT NOT NULL,
        value REAL,
        UNIQUE (index_name, date)
    )
''')

cursor.execute(
    '''show tables'''
)

# Commit changes and close connection
conn.commit()
conn.close()

print("Tables created successfully with all requested columns.")