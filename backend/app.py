from flask import Flask, jsonify, request
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_openai import ChatOpenAI
from flask_cors import CORS
import os
import fitz 
from langchain.load.dump import dumps



load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

def extract_text_from_pdf(pdf_path):
    document = fitz.open(pdf_path)
    text = ""
    
    for page_num in range(len(document)):
        page = document.load_page(page_num)
        text += page.get_text()
    
    document.close()
    return text

# Route to generate a cover letter
@app.route('/coverLetter', methods=['POST'])
def generate_cover_letter():
    job = request.form.get('job')
    print('job ' + str(job))
    resume_file = request.files.get('resume')
    resume_name = request.form.get('resumeName')
    resume_text = ''
    if resume_file:
        save_path = os.path.join('uploads', resume_name)
        resume_file.save(save_path)
        resume_text = extract_text_from_pdf(save_path)
    # print(request) 
    # request = request.get_json()
    # job = request['job'] 
    # print('job: '+ str(job)) 
    # resume = request['resume']
    # print('resume: ' + str(resume)) 

    model = ChatOpenAI(model_name="gpt-4o-mini", temperature=1.0)

    prompt = PromptTemplate(
        template='''Write a cover letter for this person for the job 
        specified using the resume provided 
        \n Job: {job}
        \n Resume: {resume}   ''',
        input_variables=["job", "resume"]
    )
    chain = prompt | model
    cover_letter = chain.invoke(input = {"job": job, "resume": resume_text})

    print("cover letter: " + str(cover_letter))
    return jsonify(dumps(cover_letter.content)), 201

if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True)
    app.run(debug=True)