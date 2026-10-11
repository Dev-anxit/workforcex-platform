import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

import sqlite3

# Connect to database and load dataset
db_path = os.path.join(os.path.dirname(__file__), '../data/workforce.db')
print(f"Connecting to database at {db_path}...")
conn = sqlite3.connect(db_path)
df = pd.read_sql_query("SELECT * FROM data_science_jobs", conn)
conn.close()

# Preprocessing
print("Preprocessing data...")
def parse_salary(salary_str):
    if isinstance(salary_str, str) and 'L' in salary_str:
        return float(salary_str.replace('L', ''))
    return float(salary_str)

df['avg_salary'] = df['avg_salary'].apply(parse_salary)

# Features and target
X = df[['company_name', 'job_title', 'min_experience', 'num_of_jobs']]
y = df['avg_salary']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a pipeline with OneHotEncoder for categorical variables
categorical_features = ['company_name', 'job_title']
categorical_transformer = OneHotEncoder(handle_unknown='ignore')

preprocessor = ColumnTransformer(
    transformers=[
        ('cat', categorical_transformer, categorical_features)
    ], remainder='passthrough')

# Define the model
model = Pipeline(steps=[('preprocessor', preprocessor),
                        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))])

# Train the model
print("Training Random Forest Regressor model...")
model.fit(X_train, y_train)

# Evaluate the model
print("Evaluating model...")
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"Mean Squared Error: {mse:.2f} Lakhs")
print(f"R-squared Score: {r2:.2f}")

# Save the model
model_file = os.path.join(os.path.dirname(__file__), 'salary_predictor_model.pkl')
joblib.dump(model, model_file)
print(f"Model saved successfully to {model_file}")

# Example prediction
print("\n--- Example Prediction ---")
sample = pd.DataFrame([{
    'company_name': 'Google',
    'job_title': 'Data Scientist',
    'min_experience': 2,
    'num_of_jobs': 100
}])
pred_salary = model.predict(sample)
print(f"Predicted Avg Salary for Data Scientist at Google with 2 yrs exp: {pred_salary[0]:.2f} Lakhs")
