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
