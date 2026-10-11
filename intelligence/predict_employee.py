import sys
import json
import joblib
import pandas as pd
import os

def predict(employee_data):
    intelligence_dir = os.path.dirname(__file__)
    
    # 1. Salary predictor (Data Science Jobs model)
    try:
        salary_model = joblib.load(os.path.join(intelligence_dir, 'salary_predictor_model.pkl'))
        salary_input = pd.DataFrame([{
            'company_name': employee_data.get('department', 'Engineering'),
            'job_title': employee_data.get('role', 'Data Scientist'),
            'min_experience': employee_data.get('experience', 2),
            'num_of_jobs': 100
        }])
        pred_salary = float(salary_model.predict(salary_input)[0])
    except Exception as e:
        pred_salary = None

    # 2. JDS Model (Salary Hike Probability)
    try:
        jds_pipeline = joblib.load(os.path.join(intelligence_dir, 'jds_salary_hike_model_v2.pkl'))
        jds_model = jds_pipeline['model']
        jds_scaler = jds_pipeline['scaler']
        jds_features = jds_pipeline['features']
        
        # Create input features matching JDS model
        jds_input_dict = {f: 3 for f in jds_features} # default
        
        # Determine skills from employee data
        for skill in employee_data.get('skills', []):
            name = skill['name'].lower()
            level = skill['level']
            if 'python' in name or 'coding' in name or 'java' in name:
                if 'coding_skills' in jds_input_dict: jds_input_dict['coding_skills'] = level
            if 'ml' in name or 'machine learning' in name or 'ai' in name:
                if 'ai_and_ml_skills' in jds_input_dict: jds_input_dict['ai_and_ml_skills'] = level
            if 'sql' in name or 'data' in name:
                if 'big_data_skills' in jds_input_dict: jds_input_dict['big_data_skills'] = level
            if 'math' in name or 'stats' in name:
                if 'maths-stats_skills' in jds_input_dict: jds_input_dict['maths-stats_skills'] = level

        jds_input = pd.DataFrame([jds_input_dict])[jds_features]
        jds_input_scaled = jds_scaler.transform(jds_input)
        jds_pred = jds_model.predict(jds_input_scaled)[0]
        
        # Explanation logic
        if jds_pred == 1:
            jds_explanation = "High likelihood of promotion/salary hike due to strong technical core competencies (coding, math/stats)."
        else:
            jds_explanation = "Lower probability for salary hike. Needs improvement in advanced analytics or storytelling skills."
            
    except Exception as e:
        jds_pred = None
        jds_explanation = "Model unavailable."

    # 3. SDS Model (Success Probability)
    try:
        sds_pipeline = joblib.load(os.path.join(intelligence_dir, 'sds_success_model_v2.pkl'))
        sds_model = sds_pipeline['model']
        sds_scaler = sds_pipeline['scaler']
        sds_features = sds_pipeline['features']
        
        # neuroticism, extraversion, openness_to_experience, agreeableness, conscientiousness
        exp = employee_data.get('experience', 2)
        sds_input_dict = {
            'neuroticism': 30.0,
            ' extraversion': 60.0 if exp > 3 else 40.0,
            'openness_to_experience': 80.0 if exp > 2 else 50.0,
            'agreeableness': 70.0,
            'conscientiousness': 90.0 if exp > 4 else 60.0
        }
        
        # keep only features needed
        sds_input_dict = {k: v for k, v in sds_input_dict.items() if k in sds_features}
        sds_input = pd.DataFrame([sds_input_dict])[sds_features]
        sds_input_scaled = sds_scaler.transform(sds_input)
        
        sds_pred = sds_model.predict(sds_input_scaled)[0]
        if sds_pred == 1:
            sds_explanation = "High predicted success based on strong conscientiousness and openness to experience traits."
        else:
            sds_explanation = "Average predicted success. Recommend soft-skills training and leadership mentoring."
            
    except Exception as e:
        sds_pred = None
        sds_explanation = "Model unavailable."

    return {
        "predicted_salary": pred_salary,
        "jds_prediction": int(jds_pred) if jds_pred is not None else None,
        "jds_explanation": jds_explanation,
        "sds_prediction": int(sds_pred) if sds_pred is not None else None,
        "sds_explanation": sds_explanation
    }

if __name__ == '__main__':
    # Read input JSON from args
    if len(sys.argv) > 1:
        emp_data = json.loads(sys.argv[1])
        result = predict(emp_data)
        print(json.dumps(result))
    else:
        print(json.dumps({"error": "No input data"}))
