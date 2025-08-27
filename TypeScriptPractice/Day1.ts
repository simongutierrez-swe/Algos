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

Union & intersection types
 - Unions let you descripe a type that can be two differnt possible types i.e. string | number
 - intersection reserved for interfaces, type ContactPerson = Person & Contact;

*/

