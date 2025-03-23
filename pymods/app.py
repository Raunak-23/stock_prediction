import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Page Configuration
st.set_page_config(page_title="StockPredict", layout="wide")

# Sidebar
st.sidebar.title("📈 StockPredict")
st.sidebar.markdown("##")
st.sidebar.button("Dashboard")
st.sidebar.button("Predictions")
st.sidebar.button("Historical")
st.sidebar.button("Sentiment")
st.sidebar.button("Profile")
st.sidebar.button("🚪 Logout")

# Main Header
st.title("Stock Predictions")

# Input Fields
col1, col2, col3 = st.columns([3, 1, 1])
stock_ticker = col1.text_input("Enter Stock Symbol", "AAPL")
days = col2.selectbox("Select Time Period", ["7 days", "14 days", "30 days"])
predict_button = col3.button("Predict")

# Dummy Data for Prediction
if predict_button:
    # Simulating predicted stock prices (Replace with your ML model output)
    days_range = 7 if days == "7 days" else 14 if days == "14 days" else 30
    dates = pd.date_range(start=pd.Timestamp.today(), periods=days_range, freq="D")
    predicted_prices = np.linspace(150, 159, days_range) + np.random.randn(days_range) * 1.5

    # Display Price Prediction Graph
    st.subheader("Price Prediction")
    fig, ax = plt.subplots()
    ax.plot(dates, predicted_prices, marker="o", linestyle="-", color="teal", label="Predicted Price")
    ax.set_xlabel("Date")
    ax.set_ylabel("Stock Price ($)")
    ax.legend()
    st.pyplot(fig)

    # Display Prediction Insights
    st.subheader("Prediction Insights")
    st.markdown(f"""
    - **Current Price:** $150.00  
    - **Predicted High:** <span style='color:green;'>$159.00</span>  
    - **Predicted Low:** <span style='color:red;'>$150.00</span>  
    - **Confidence Level:** 85%
    """, unsafe_allow_html=True)
