import pandas as pd
import sqlite3
import os
import re

def clean_salary(val):
    if pd.isna(val):
        return None
    val = str(val).upper().replace('L', '').strip()
    try:
        return float(val)
    except:
        return None

def preprocess_datasets():
    data_dir = os.path.join(os.path.dirname(__file__), '../data')
    db_path = os.path.join(data_dir, 'workforce.db')
    
    print(f"Connecting to database {db_path}...")
    conn = sqlite3.connect(db_path)
    
    # 1. Process Data Science Jobs
    ds_jobs_path = os.path.join(data_dir, 'data_science_jobs.csv')
    if os.path.exists(ds_jobs_path):
        print("Processing Data Science Jobs...")
        df_ds = pd.read_csv(ds_jobs_path)
        # Drop duplicates
        df_ds.drop_duplicates(inplace=True)
        # Normalize salaries
        for col in ['avg_salary', 'min_salary', 'max_salary']:
            if col in df_ds.columns:
                df_ds[col] = df_ds[col].apply(clean_salary)
        # Fill missing values
        df_ds.fillna({'min_experience': df_ds['min_experience'].median() if 'min_experience' in df_ds else 0}, inplace=True)
        # Save to DB
        df_ds.to_sql('data_science_jobs', conn, if_exists='replace', index=False)
        print(f"Saved {len(df_ds)} records to data_science_jobs table.")
    
    # 2. Process Analytics Jobs
    analytics_jobs_path = os.path.join(data_dir, 'Analytics Jobs.csv')
    if os.path.exists(analytics_jobs_path):
        print("Processing Analytics Jobs...")
        df_an = pd.read_csv(analytics_jobs_path)
        df_an.drop_duplicates(inplace=True)
        df_an.to_sql('analytics_jobs', conn, if_exists='replace', index=False)
        print(f"Saved {len(df_an)} records to analytics_jobs table.")
    else:
        print(f"WARNING: {analytics_jobs_path} not found. Please upload it.")

    # 3. Process JDS Skill Traits
    jds_path = os.path.join(data_dir, 'JDS Skill Traits.xlsx')
    if os.path.exists(jds_path):
        print("Processing JDS Skill Traits...")
        df_jds = pd.read_excel(jds_path)
        df_jds.drop_duplicates(inplace=True)
        # Handle missing values
        df_jds.fillna(df_jds.mean(numeric_only=True), inplace=True)
        df_jds.to_sql('jds_skill_traits', conn, if_exists='replace', index=False)
        print(f"Saved {len(df_jds)} records to jds_skill_traits table.")
    else:
        print(f"WARNING: {jds_path} not found. Please upload it.")

    # 4. Process SDS Personality Traits
    sds_path = os.path.join(data_dir, 'SDS Personality Traits.xlsx')
    if os.path.exists(sds_path):
        print("Processing SDS Personality Traits...")
        df_sds = pd.read_excel(sds_path)
        df_sds.drop_duplicates(inplace=True)
        # Handle missing values
        df_sds.fillna(df_sds.mean(numeric_only=True), inplace=True)
        df_sds.to_sql('sds_personality_traits', conn, if_exists='replace', index=False)
        print(f"Saved {len(df_sds)} records to sds_personality_traits table.")
    else:
        print(f"WARNING: {sds_path} not found. Please upload it.")
        
    conn.close()
    print("Preprocessing completed.")

if __name__ == '__main__':
    preprocess_datasets()
