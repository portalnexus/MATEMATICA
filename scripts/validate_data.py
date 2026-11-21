import json
import os
import sys

def load_json(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"❌ Error: File not found: {filepath}")
        return None
    except json.JSONDecodeError as e:
        print(f"❌ Error: Invalid JSON in {filepath}: {e}")
        return None

def validate_data():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base_dir, 'data')
    
    print(f"🔍 Validating data in: {data_dir}\n")

    # 1. Validate student-data.json
    student_data_path = os.path.join(data_dir, 'student-data.json')
    students = load_json(student_data_path)
    
    if students:
        print(f"✅ student-data.json loaded. Found {len(students)} entries.")
        
        # Check for duplicate names (warning) and valid structure
        names = {}
        valid_students = 0
        for student_id, data in students.items():
            if student_id == "PR0F1":
                continue
                
            if 'nome' not in data:
                print(f"⚠️ Warning: Student {student_id} missing 'nome'.")
            else:
                name = data['nome']
                if name in names:
                    print(f"⚠️ Warning: Duplicate name '{name}' for IDs {names[name]} and {student_id}.")
                names[name] = student_id
            
            if 'turma' not in data:
                print(f"❌ Error: Student {student_id} missing 'turma'.")
            else:
                turma = data['turma']
                curriculum_file = os.path.join(data_dir, f"curriculum-{turma}.json")
                if not os.path.exists(curriculum_file) and turma != "all":
                     print(f"❌ Error: Curriculum file missing for turma '{turma}' (Student {student_id}). Expected: {curriculum_file}")
            
            valid_students += 1
        print(f"✅ Checked {valid_students} student records.")

    # 2. Validate trofeus-disponiveis.json
    trofeus_path = os.path.join(data_dir, 'trofeus-disponiveis.json')
    trofeus = load_json(trofeus_path)
    if trofeus:
        if 'trofeus' in trofeus and isinstance(trofeus['trofeus'], list):
             print(f"✅ trofeus-disponiveis.json loaded. Found {len(trofeus['trofeus'])} trophies.")
        else:
             print(f"❌ Error: Invalid structure in trofeus-disponiveis.json. Expected 'trofeus' list.")

    print("\n🏁 Validation complete.")

if __name__ == "__main__":
    validate_data()
