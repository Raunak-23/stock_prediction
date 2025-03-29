import sqlite3
# Connect to SQLite database (creates 'stocks.db' if it doesn't exist)
conn = sqlite3.connect("stocks.db")

# Create a cursor object
cursor = conn.cursor()

# SQL query to create table
table_query = """
CREATE TABLE IF NOT EXISTS stock_data (
    Date TEXT NOT NULL,
    Ticker TEXT NOT NULL,
    Open REAL,
    High REAL,
    Low REAL,
    Close REAL,
    Volume INTEGER,
    Marketcap REAL,
    Sector TEXT
);
"""

# Execute the query
cursor.execute(table_query)

# Commit and close the connection
conn.commit()
conn.close()

print("Stocks Database connected and table created successfully.")

# Connect to SQLite database (creates 'finance_news.db' if not exists)
conn = sqlite3.connect("finance_news.db")
cursor = conn.cursor()
# cursor.execute("Drop table if exists nifty_fifty_news;")
# print("Dropped table nifty_fifty_news if it existed.")
# Create table for finance-related news
cursor.execute('''
    CREATE TABLE IF NOT EXISTS nifty_fifty_news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stock TEXT NOT NULL,
        sector TEXT NOT NULL,
        headline TEXT NOT NULL,
        source TEXT,
        published_date TEXT,
        url TEXT UNIQUE,
        summary TEXT,
        description TEXT,
        sentiment_score REAL
    )
''')

#cursor.execute("""Select * from preprocessed_stock_data;""")
# print("data fetched from nifty_fifty_news table:")

# Commit and close connection
conn.commit()
conn.close()

print("Table 'nifty_fifty_news' created successfully.")