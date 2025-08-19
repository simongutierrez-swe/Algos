/*
Prompt:
You’re given an API that returns patient records in the following format:

[
  {
    "id": "p1",
    "name": "Alice Johnson",
    "conditions": [
      { "code": "E11", "description": "Type 2 Diabetes" },
      { "code": "C34", "description": "Lung Cancer" }
    ]
  },
  {
    "id": "p2",
    "name": "Bob Smith",
    "conditions": [
      { "code": "I10", "description": "Hypertension" }
    ]
  }
]
Write a JavaScript function that:

Accepts this patient data array.

Returns an object mapping each condition code to a list of patient names with that condition.

Expected Output (for the above input):

{
  "E11": ["Alice Johnson"],
  "C34": ["Alice Johnson"],
  "I10": ["Bob Smith"]
}
*/

const listOfConditions = [
  {
    id: 'p1',
    name: 'Alice Johnson',
    conditions: [
      { code: 'E11', description: 'Type 2 Diabetes' },
      { code: 'C34', description: 'Lung Cancer' }
    ]
  },
  {
    id: 'p2',
    name: 'Bob Smith',
    conditions: [
      { code: 'I10', description: 'Hypertension' }
    ]
  }
];


function mapConditions(listOfPatients) {
    let conditions = new Map();

    for (const pat of listOfPatients) {

        for (const condition of pat.conditions) {
            let names =  conditions.get(condition) || [];
             conditions.set(condition.code, [...names, pat.name]);
        }
    }

    return conditions;
}

console.log(mapConditions(listOfConditions));
/*
{
  "E11": ["Alice Johnson"],
  "C34": ["Alice Johnson"],
  "I10": ["Bob Smith"]
}
*/

function mapConditionsToPatients(patients) {
  return patients.reduce((acc, patient) => {
    patient.conditions.forEach(condition => {
        acc[condition.code] = !acc[condition.code] ? [patient.name] : [...acc[condition.code], patient.name];
    });

    return acc;
  }, {});
}

console.log(mapConditionsToPatients(listOfConditions));

/*
Prompt:
You are building a service that fetches medication records for patients. The API you’re given returns data in the following format:

[
  { "patientId": "p1", "medication": "Metformin", "status": "active" },
  { "patientId": "p2", "medication": "Lisinopril", "status": "inactive" },
  { "patientId": "p1", "medication": "Insulin", "status": "active" }
]
Write a JavaScript function that:

Accepts this array of records.

Returns a new object mapping each patientId to an array of their active medications.

Expected Output (for the above input):

{
  "p1": ["Metformin", "Insulin"],
  "p2": []
}
*/

const listOfPatients =
[
  { patientId: 'p1', medication: 'Metformin', status: 'active' },
  { patientId: 'p2', medication: 'Lisinopril', status: 'inactive' },
  { patientId: 'p1', medication: 'Insulin', status: 'active' }
];


function medRecs(listOfPatients) {
    return listOfPatients.reduce((acc, patient) => {
        acc[patient.patientId] =  acc[patient.patientId] || [];

        if (patient.status === 'active') acc[patient.patientId] = [...acc[patient.patientId], patient.medication];

        return acc;
    }, {})
}

console.log(medRecs(listOfPatients));
/*
{
  "p1": ["Metformin", "Insulin"],
  "p2": []
}
*/
