// Patient data object
let patientData = {
    name: '',
    age: '',
    gender: '',
    symptoms: '',
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    glucoseLevel: ''
};

// Get form elements
const elements = {
    name: document.getElementById('patientName'),
    age: document.getElementById('patientAge'),
    gender: document.getElementById('patientGender'),
    symptoms: document.getElementById('symptoms'),
    bloodPressure: document.getElementById('bloodPressure'),
    heartRate: document.getElementById('heartRate'),
    temperature: document.getElementById('temperature'),
    glucoseLevel: document.getElementById('glucoseLevel'),
    submitBtn: document.getElementById('submitBtn'),
    resultsContainer: document.getElementById('resultsContainer')
};

// Add event listeners to form inputs
Object.keys(elements).forEach(key => {
    if (elements[key] && key !== 'submitBtn' && key !== 'resultsContainer') {
        elements[key].addEventListener('input', (e) => {
            patientData[key] = e.target.value;
        });
    }
});

// Submit button click handler
elements.submitBtn.addEventListener('click', handleSubmit);

function handleSubmit() {
    // Validate required fields
    if (!patientData.name || !patientData.age || !patientData.gender || !patientData.symptoms) {
        alert('Please fill in all required fields (Name, Age, Gender, and Symptoms)');
        return;
    }

    // Disable button and show loading
    elements.submitBtn.disabled = true;
    elements.submitBtn.innerHTML = `
        <div class="spinner"></div>
        <span>Analyzing...</span>
    `;

    // Simulate API call with setTimeout
    setTimeout(() => {
        const diagnosis = analyzeDiagnosis();
        displayResults(diagnosis);
        
        // Re-enable button
        elements.submitBtn.disabled = false;
        elements.submitBtn.innerHTML = `
            <i data-lucide="brain"></i>
            <span>Generate Diagnosis</span>
        `;
        
        // Reinitialize icons
        lucide.createIcons();
    }, 2000);
}

function analyzeDiagnosis() {
    const symptoms = patientData.symptoms.toLowerCase();
    const age = parseInt(patientData.age);
    const hr = parseInt(patientData.heartRate);
    const temp = parseFloat(patientData.temperature);
    const glucose = parseInt(patientData.glucoseLevel);

    let diagnosis = {
        condition: '',
        severity: '',
        recommendations: [],
        testsRequired: [],
        riskLevel: ''
    };

    // Diagnosis logic based on symptoms and vitals
    if (symptoms.includes('fever') || temp > 100) {
        if (symptoms.includes('cough') || symptoms.includes('cold')) {
            diagnosis.condition = 'Upper Respiratory Infection';
            diagnosis.severity = 'Moderate';
            diagnosis.recommendations = [
                'Rest and adequate hydration',
                'Monitor temperature regularly',
                'Over-the-counter fever reducers if needed',
                'Consult if symptoms persist beyond 5 days'
            ];
            diagnosis.testsRequired = ['Complete Blood Count (CBC)', 'Chest X-Ray if breathing difficulty'];
            diagnosis.riskLevel = 'Low to Moderate';
        } else {
            diagnosis.condition = 'Viral Fever';
            diagnosis.severity = 'Mild to Moderate';
            diagnosis.recommendations = [
                'Complete rest for 3-5 days',
                'Plenty of fluids',
                'Antipyretics as prescribed',
                'Light diet'
            ];
            diagnosis.testsRequired = ['CBC', 'Blood Culture if fever persists'];
            diagnosis.riskLevel = 'Low';
        }
    } else if (glucose > 140 || symptoms.includes('sugar') || symptoms.includes('diabetes')) {
        diagnosis.condition = 'Hyperglycemia / Diabetes Management Required';
        diagnosis.severity = glucose > 200 ? 'High' : 'Moderate';
        diagnosis.recommendations = [
            'Immediate consultation with endocrinologist',
            'Blood sugar monitoring twice daily',
            'Dietary modifications - low carb diet',
            'Regular exercise - 30 minutes daily',
            'Medication adjustment may be needed'
        ];
        diagnosis.testsRequired = ['HbA1c Test', 'Fasting Blood Sugar', 'Lipid Profile', 'Kidney Function Test'];
        diagnosis.riskLevel = 'Moderate to High';
    } else if (hr > 100 || symptoms.includes('chest pain') || symptoms.includes('heart')) {
        diagnosis.condition = 'Cardiovascular Concern - Requires Evaluation';
        diagnosis.severity = 'High';
        diagnosis.recommendations = [
            'Immediate cardiac evaluation recommended',
            'Avoid strenuous activities',
            'Monitor blood pressure and heart rate',
            'Stress management techniques',
            'Consider emergency visit if chest pain worsens'
        ];
        diagnosis.testsRequired = ['ECG', 'Echocardiogram', 'Cardiac Enzyme Test', 'Stress Test'];
        diagnosis.riskLevel = 'High';
    } else if (symptoms.includes('headache') || symptoms.includes('migraine')) {
        diagnosis.condition = 'Headache / Migraine';
        diagnosis.severity = 'Mild to Moderate';
        diagnosis.recommendations = [
            'Rest in dark, quiet room',
            'Stay hydrated',
            'Pain relievers as prescribed',
            'Identify and avoid triggers',
            'Maintain regular sleep schedule'
        ];
        diagnosis.testsRequired = ['Neurological Examination', 'CT/MRI if symptoms are severe'];
        diagnosis.riskLevel = 'Low';
    } else {
        diagnosis.condition = 'General Health Check Recommended';
        diagnosis.severity = 'Routine';
        diagnosis.recommendations = [
            'Regular health monitoring',
            'Maintain healthy lifestyle',
            'Balanced diet and exercise',
            'Annual health checkup',
            'Stay hydrated'
        ];
        diagnosis.testsRequired = ['Routine Blood Work', 'Vitals Check'];
        diagnosis.riskLevel = 'Low';
    }

    return diagnosis;
}

function displayResults(diagnosis) {
    const severityClass = 
        diagnosis.severity === 'High' ? 'severity-high' :
        diagnosis.severity.includes('Moderate') ? 'severity-moderate' :
        'severity-low';

    const resultsHTML = `
        <div class="diagnosis-results">
            <!-- Condition Card -->
            <div class="condition-card">
                <div class="condition-header">
                    <h3>Preliminary Diagnosis</h3>
                    <span class="severity-badge ${severityClass}">${diagnosis.severity}</span>
                </div>
                <p class="condition-name">${diagnosis.condition}</p>
                <div class="risk-level">
                    <i data-lucide="alert-circle"></i>
                    <span>Risk Level: ${diagnosis.riskLevel}</span>
                </div>
            </div>

            <!-- Recommendations -->
            <div class="section">
                <h4 class="section-title recommendations">
                    <i data-lucide="check-circle"></i>
                    Recommendations
                </h4>
                ${diagnosis.recommendations.map(rec => `
                    <div class="recommendation-item">
                        <div class="recommendation-bullet"></div>
                        <p>${rec}</p>
                    </div>
                `).join('')}
            </div>

            <!-- Tests Required -->
            <div class="section">
                <h4 class="section-title tests">
                    <i data-lucide="activity"></i>
                    Recommended Tests
                </h4>
                ${diagnosis.testsRequired.map(test => `
                    <div class="test-item">
                        <p>${test}</p>
                    </div>
                `).join('')}
            </div>

            <!-- Disclaimer -->
            <div class="disclaimer">
                <p><strong>Disclaimer:</strong> This is an AI-assisted preliminary analysis. Always consult with qualified healthcare professionals for accurate diagnosis and treatment.</p>
            </div>
        </div>
    `;

    elements.resultsContainer.innerHTML = resultsHTML;
    
    // Reinitialize Lucide icons
    lucide.createIcons();
}