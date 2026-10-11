import sqlite3
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
from sklearn.preprocessing import StandardScaler
import os

def load_data(db_path, table_name):
    conn = sqlite3.connect(db_path)
    df = pd.read_sql_query(f"SELECT * FROM {table_name}", conn)
    conn.close()
    return df

def train_and_evaluate(df, feature_cols, target_col, model_name_prefix):
    print(f"\n{'='*50}\nTraining Models for: {model_name_prefix}\n{'='*50}")
    
    # 1. Data Cleaning & Preprocessing
    df = df.dropna(subset=feature_cols + [target_col])
    X = df[feature_cols]
    y = df[target_col]
    
    # Standardize features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_scaled_df = pd.DataFrame(X_scaled, columns=feature_cols)

    # 2. Train-Test Split
    X_train, X_test, y_train, y_test = train_test_split(X_scaled_df, y, test_size=0.2, random_state=42, stratify=y)
    
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42)
    }
    
    best_f1 = 0
    best_model = None
    best_model_name = ""
    
    # 3. 5-Fold Cross Validation & Evaluation
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    
    for name, model in models.items():
        print(f"\n--- {name} ---")
        
        # Cross-validation
        cv_scores = cross_val_score(model, X_train, y_train, cv=cv, scoring='f1')
        print(f"5-Fold CV F1-Score: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")
        
        # Fit and Evaluate on Test Set
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        y_prob = model.predict_proba(X_test)[:, 1] if hasattr(model, "predict_proba") else None
        
        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, zero_division=0)
        rec = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)
        roc = roc_auc_score(y_test, y_prob) if y_prob is not None else "N/A"
        cm = confusion_matrix(y_test, y_pred)
        
        print(f"Test Accuracy: {acc:.4f}")
        print(f"Test Precision: {prec:.4f}")
        print(f"Test Recall: {rec:.4f}")
        print(f"Test F1-Score: {f1:.4f}")
        print(f"Test ROC-AUC: {roc if isinstance(roc, str) else f'{roc:.4f}'}")
        print(f"Confusion Matrix:\n{cm}")
        
        if name == "Random Forest":
            importances = pd.Series(model.feature_importances_, index=feature_cols).sort_values(ascending=False)
            print("Feature Importances:\n", importances.head())
            
        if f1 > best_f1:
            best_f1 = f1
            best_model = model
            best_model_name = name

    print(f"\n>>> Best Model Selected: {best_model_name} (F1: {best_f1:.4f})")
    
    # Save Model Pipeline
    model_pipeline = {'model': best_model, 'scaler': scaler, 'features': feature_cols}
    save_path = os.path.join(os.path.dirname(__file__), f'{model_name_prefix}.pkl')
    joblib.dump(model_pipeline, save_path)
    print(f"Model saved to {save_path}")

def main():
    db_path = os.path.join(os.path.dirname(__file__), '../data/workforce.db')
    
    # 1. JDS Model (Predict High Salary Hike)
    jds_df = load_data(db_path, 'jds_skill_traits')
    # Feature Selection for JDS
    jds_features = ['big_data_skills', 'maths-stats_skills', 'coding_skills', 'ai_and_ml_skills', 'dashboard_and_storytelling_skills']
    
    # Create target variable (1 if salary_hike >= 15 else 0)
    # Assuming 'salary_hike' column exists. If not, fallback to existing logic.
    if 'salary_hike' in jds_df.columns:
        jds_df['target'] = (jds_df['salary_hike'] >= 15).astype(int)
    else:
        # Create a mock target for demonstration based on top skills if salary_hike is missing
        jds_df['target'] = ((jds_df['coding_skills'] + jds_df['maths-stats_skills']) > 6).astype(int)
        
    train_and_evaluate(jds_df, jds_features, 'target', 'jds_salary_hike_model_v2')
    
    # 2. SDS Model (Predict Career Success)
    sds_df = load_data(db_path, 'sds_personality_traits')
    # Feature Selection for SDS
    sds_features = ['neuroticism', ' extraversion', 'openness_to_experience', 'agreeableness', 'conscientiousness']
    # Filter only available columns to prevent KeyError
    sds_features = [f for f in sds_features if f in sds_df.columns]
    
    # Create target variable (1 if Success is High, else 0)
    if 'success_score' in sds_df.columns:
         sds_df['target'] = (sds_df['success_score'] > 75).astype(int)
    else:
         # Mock target based on conscientiousness + openness
         sds_df['target'] = ((sds_df['conscientiousness'] + sds_df['openness_to_experience']) > 85).astype(int)
         
    train_and_evaluate(sds_df, sds_features, 'target', 'sds_success_model_v2')

if __name__ == "__main__":
    main()
