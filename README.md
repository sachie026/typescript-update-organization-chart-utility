## typescript-update-organization-chart-utility using OOPs

### Folder structure

- `employeesList.ts` contains all the data part. It has the list of all employees and organization chart structure.
- `shared.ts` contains all the interfaces.
- `index.ts` contains all the business logic.

### Variable terminologies

- Step in the variable name tells about the phase of the operation

### Traverse approach

- Used recusrive function to traverse through the organization

### Move operation

- It has 2 phases:

1. Remove the employee from its parent and lift up all the subordinates to the parent
2. Add the removed employee to the superviosr employee

### Undo operation

- It has 2 phases too, which reverse the operations finished in the move operation.

### Redo

- It checks if there was an undo operation and then it performs the move operation.

At the end of the file(index.ts), there is a new instance of the `EmployeeOrgApp` and performed all the operations with a console log to show the valid data after all operations.
