/*
Exercise:

Write type definitions for simple objects: Patient, Appointment, Medication

Create functions that manipulate these types safely (e.g., getUpcomingAppointments(patient)).

Type annotations:
 - Any: can be any variable type
 - Unknown: a safer usage of any, enforces type narrowing or assertion before operations can be performed, any does not
 - Void: for functions that do not return a value
 - Never: used in throwing errors and final checks during a switch statement after default

Types VS Interfaces
 - "types (and type hierarchies) should be concerned with concrete things. Interfaces should be concerned with behaviors that can be shared among different types." (stackOverFlow)
 - Interfaces are like C# interfaces, used to handle instances where you need to infer a type
 - types are more simplistic and should represent that, interfaces are more complex ( when you need a type to do more than just one thing, adding methods onto a type)
 - interfaces are more BE friendly and types are more FE friendly as types are more composable and can be used freely in functions (you can combine and intersect types)
 - ex: interface Car implements type Porche, all cars have 4 wheels but only a Porche has a super charger

Union & intersection types
 - Unions let you descripe a type that can be two differnt possible types i.e: string | number
 - intersection reserved for interfaces,i.e: type ContactPerson = Person & Contact;
 -
Enum
 - used to create objects with specific types of number or string
 - enums (numberic) have auto incrementation where values dont need to be stated
    - for example enum {name, sex, DOB} values will be 0, 1, 2
    - also you can initate the values on where they should start to increment enum {red = 1, blue, green} values will be 1, 2, 3
    - you can also explicitly set these values in an enum, it all depends on the usage
 - enums (strings) more commonly used than numeric for its readablility
    - i.e: enum names {name1 = 'name1', name2 = 'name2'}

Generics
    - used for reusability while preserving type saftey
    - allows you to write code thats not strongly typed
    - can be used for functions, interfaces, classes and type aliases
    - annotation dictated with a capital letter usually <T>

*/

// exercise: Write type definitions for simple objects: Patient, Appointment, Medication
//Create functions that manipulate these types safely (e.g., getUpcomingAppointments(patient)).

interface Patient {
    MRN: number,
    firstName: string,
    lastName: string,
    sex: string,
    dob: Date,
    BP?: string
}

interface Appointment {
    id: number,
    date: Date,
    location: string,
    bookedPatient: number
}

interface Medication {
    id: number,
    name: string,
    dosage: number,
    ptsOnMeds?: Array<number>
}

const patient1: Patient = {
      MRN: 1,
      firstName: 'John',
      lastName: 'Doe',
      sex: 'M',
      dob: new Date(2025, 1, 1)
    };


const patient2: Patient = {
      MRN: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      sex: 'F',
      dob: new Date(2025, 1, 1),
      BP: '120/70'
    };

const patient3: Patient = {
      MRN: 3,
      firstName: 'Joe',
      lastName: 'Dirt',
      sex: 'M',
      dob: new Date(2025, 1, 1),
      BP: '120/70'
    };

const patient4: Patient = {
      MRN: 4,
      firstName: 'Jose',
      lastName: 'Domingo',
      sex: 'M',
      dob: new Date(2025, 1, 1),
      BP: '120/70'
    };

const patient5: Patient = {
      MRN: 5,
      firstName: 'Jesus',
      lastName: 'Nazereth',
      sex: 'M',
      dob: new Date(2025, 1, 1),
      BP: '150/50'
    };

const appointment1: Appointment = {
    id: 1,
    date: new Date(2025, 1, 2),
    location: '224 West 36th',
    bookedPatient: 1
}

const appointment2: Appointment = {
    id: 2,
    date: new Date(2025, 1, 4),
    location: '224 West 36th',
    bookedPatient: 2
}

const appointment3: Appointment = {
    id: 3,
    date: new Date(2025, 1, 3),
    location: '224 West 36th',
    bookedPatient: 3
}

const appointment4: Appointment = {
    id: 4,
    date: new Date(2025, 1, 5),
    location: '224 West 36th',
    bookedPatient: 1
}

const medication1: Medication = {
    id: 1,
    name: 'Advil',
    dosage: 2.5,
    ptsOnMeds: [1, 2, 3, 4, 5]
}

const medication2: Medication = {
    id: 2,
    name: 'Tylenol',
    dosage: 2.5,
    ptsOnMeds: [2, 3, 5]
}

const medication3: Medication = {
    id: 3,
    name: 'Doxitocen',
    dosage: 2.5,
    ptsOnMeds: [1, 4, 3]
}

const medication4: Medication = {
    id: 4,
    name: 'Retuximab',
    dosage: 2.5,
    ptsOnMeds: [1, 3]
}

const medication5: Medication = {
    id: 5,
    name: 'Entyvio',
    dosage: 2.5
}

const listOfAppointments: Array<Appointment> = [appointment1, appointment2, appointment3, appointment4];
const listOfMedications: Array<Medication> = [medication1, medication2, medication3, medication4, medication5];
const listOfPatient: Array<Patient> = [patient1, patient2, patient3, patient4, patient5];

function getUpcomingAppointments(patient: Patient, appointments: Array<Appointment>): Array<Appointment> {
    const filtered = appointments.filter(x => x.bookedPatient === patient.MRN);

    return filtered;
}

console.log(getUpcomingAppointments(patient1, listOfAppointments));

// return an array of medications names
function getPatientMedications(patient: Patient, medications: Array<Medication>): Array<string> {
    const meds:Array<string> = [];

    for (const med of medications) {
        if (med.ptsOnMeds?.includes(patient.MRN)) meds.push(med.name);
    }

    return meds;
}

console.log(getPatientMedications(patient1, listOfMedications));


function getListOfPatientsOnMedication(medication: Medication, patients: Array<Patient>): Array<Patient> {
    const filtered = patients.filter((x) => {
         if (medication.ptsOnMeds?.includes(x.MRN)) return x;
    });

    return filtered;
}

console.log(getListOfPatientsOnMedication(medication2, listOfPatient)); // []

const test1: Array<Patient> = getListOfPatientsOnMedication(medication2, listOfPatient);

function doesBPMedicationWork(patients: Array<Patient>): boolean {
    const filtered = patients.filter(x => x.BP === '120/70');

    return filtered.length <= 2;
}

console.log(doesBPMedicationWork(test1));
