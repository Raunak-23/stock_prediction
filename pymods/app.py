# stock_prediction_ui.py
import streamlit as st
import pandas as pd
import sys
import warnings

# Suppress version conflicts
warnings.filterwarnings("ignore", category=DeprecationWarning)
sys.path.append("D:\stock_prediction\venv\Lib\site-packages")  # Force venv path

# Configure page settings
st.set_page_config(
    page_title="Diem - AI Stock Predictions",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Apply custom CSS for branding
st.markdown(f"""
    <style>
        .main {{
            background-color: #F8F9FA;
            font-family: 'DM Sans', sans-serif;
        }}
        h1, h2, h3 {{
            color: #2E8EEF;
            font-family: 'Geist', sans-serif;
        }}
        .stButton>button {{
            background-color: #2E8EEF;
            color: white;
            border-radius: 8px;
            padding: 0.5rem 1rem;
        }}
        .stTextInput>div>div>input {{
            border: 1px solid #ACD6FF;
            border-radius: 4px;
        }}
        .stDataFrame {{
            background-color: #DDDDDD;
            border-radius: 8px;
        }}
    </style>
    """, unsafe_allow_html=True)

# Navigation
PAGES = {
    "Home": "home",
    "Dashboard": "dashboard",
    "Predictions": "predictions",
    "News": "news",
    "Profile": "profile"
}

# Initialize session state
if 'current_page' not in st.session_state:
    st.session_state.current_page = "Home"

# Navigation handler
def change_page():
    st.session_state.current_page = st.session_state.page_select

# Page selection widget
st.sidebar.selectbox(
    "Navigation",
    options=list(PAGES.keys()),
    key="page_select",
    on_change=change_page
)

# Home Page
if st.session_state.current_page == "Home":
    # Hero Section
    col1, col2 = st.columns([2, 1])
    with col1:
        st.markdown("# Predict Tomorrow's Market\n## with AI-Powered Insights")
        email = st.text_input("Enter your Email", placeholder="name@email.com")
        if st.button("Get Started"):
            st.success("Check your email for verification!")

    # Features Section
    st.markdown("---")
    st.markdown("## Make Your Investments Smarter")
    features = st.columns(3)
    with features[0]:
        st.markdown("**AI-Powered Predictions**")
        st.write("Advanced analytics using cutting-edge ML models")
    with features[1]:
        st.markdown("**Market Trends**")
        st.write("Real-time market pattern recognition")
    with features[2]:
        st.markdown("**Risk Assessment**")
        st.write("Smart portfolio risk evaluation")

    # Testimonials
    st.markdown("---")
    st.markdown("## Loved By Our Users")
    st.markdown("""
        - *"The platform gave me an edge in the market!"*
        - *"AI predictions are a game-changer for returns"*
        - *"Real-time alerts transformed my strategy"*
    """)

    # Pricing
    st.markdown("---")
    st.markdown("## Pricing Plans")
    pricing = st.columns(2)
    with pricing[0]:
        st.markdown("### Free Plan\n- 50 predictions/month\n- Basic features")
        st.button("Select Free")
    with pricing[1]:
        st.markdown("### Pro Plan\n- Unlimited predictions\n- Advanced analytics")
        st.button("Select Pro")

# Dashboard Page
elif st.session_state.current_page == "Dashboard":
    # Market Indices
    st.markdown("# Dashboard")
    indices = st.columns(4)
    indices[0].metric("NIFTY50", "0.03%", delta="↑")
    indices[1].metric("NIFTY BANK", "-0.32%", delta="↓")
    indices[2].metric("S&P BSE Midcap", "-0.32%", delta="↓")
    indices[3].metric("BSE SENSEX", "0.03%", delta="↑")

    # Top Stocks
    st.markdown("## Top Performing Stocks")
    top_stocks = pd.DataFrame({
        "Stock": ["RELIANCE", "HDFC", "TCS", "L&T", "ITC", "ONGC"],
        "Change": ["+0.03%", "+0.03%", "-1.60%", "+0.03%", "-2.60%", "+0.03%"]
    })
    st.dataframe(top_stocks, hide_index=True, use_container_width=True)

    # Watchlist
    st.markdown("## Watch List")
    watchlist = pd.DataFrame({
        "Stock": ["BHEL", "PNB", "CRISIL", "CIPLA", "LIC", "SBI"],
        "Change": ["+0.03%", "+0.03%", "-1.60%", "+0.03%", "-2.60%", "+0.03%"]
    })
    st.dataframe(watchlist, hide_index=True, use_container_width=True)

# Predictions Page (Add ML Integration Here)
elif st.session_state.current_page == "Predictions":
    st.markdown("# Price Predictions")
    
    # Prediction Input
    symbol = st.text_input("Enter Stock Symbol", "TCS")
    days = st.slider("Prediction Days", 1, 30, 7)
    
    if st.button("Generate Prediction"):
        # Replace with your ML model prediction
        prediction = {
            "Current Price": "¥59.00",
            "Predicted High": "¥70.00",
            "Predicted Low": "¥50.00",
            "Confidence": "85%"
        }
        st.subheader(f"{symbol} Prediction Results")
        st.metric("Current Price", prediction["Current Price"])
        st.metric("Predicted High", prediction["Predicted High"])
        st.metric("Predicted Low", prediction["Predicted Low"])
        st.metric("Confidence Level", prediction["Confidence"])

# Profile Page
elif st.session_state.current_page == "Profile":
    st.markdown("# Profile")
    cols = st.columns(2)
    with cols[0]:
        st.text_input("Name", "John Doe")
        st.text_input("Email", "john@diem.ai")
        st.text_input("Phone", "+91 9876543210")
    with cols[1]:
        st.metric("Invested Amount", "₹1,50,000")
        st.metric("Today's Profit", "- ₹1200.50", delta_color="off")
        st.metric("Overall Gain", "+ ₹15,000")
    
    if st.button("Logout"):
        st.session_state.clear()
        st.experimental_rerun()

# To run: streamlit run stock_prediction_ui.py