import {
  Employee,
  UndoMovement,
  RedoMovement,
  IEmployeeOrgApp,
} from "./shared";

import { inputCEO } from "./employeeList";

class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;
  undoMovements: UndoMovement[];
  redoMovements: RedoMovement[];
  toMoveEmployee: Employee | null;

  constructor(ceo: Employee) {
    this.ceo = ceo;
    this.undoMovements = [];
    this.redoMovements = [];
    this.toMoveEmployee = null;
  }

  undoOperation(movement: UndoMovement, parentEmployee: Employee): void {
    if (parentEmployee.subordinates.length === 0) return;

    for (let i = 0; i < parentEmployee.subordinates.length; i++) {
      const currentSubordinate = parentEmployee.subordinates[i];

      if (currentSubordinate.uniqueID === movement.employeeID) {
        currentSubordinate.subordinates = [...movement.subordinates];
        break;
      }
      this.undoOperation(movement, parentEmployee.subordinates[i]);
    }
  }

  moveStep1(employeeId: number, parentEmployee: Employee): void {
    if (parentEmployee.subordinates.length === 0) return;

    for (let i = 0; i < parentEmployee.subordinates.length; i++) {
      const currentSubordinate = parentEmployee.subordinates[i];

      if (currentSubordinate.uniqueID === employeeId) {
        this.toMoveEmployee = currentSubordinate;

        const parentSubordinates = [...parentEmployee.subordinates];
        parentSubordinates.splice(i, 1);

        // add following operation to undo movements array
        this.undoMovements.push({
          employeeID: parentEmployee.uniqueID,
          subordinates: [...parentEmployee.subordinates],
          subordinateEmployeeID: currentSubordinate.uniqueID,
        });

        // lift up the removed employees subordinates to the parent employee
        parentEmployee.subordinates = [
          ...parentSubordinates,
          ...currentSubordinate.subordinates,
        ];
        break;
      }

      this.moveStep1(employeeId, parentEmployee.subordinates[i]);
    }
  }

  moveStep2(supervisorID: number, parentEmployee: Employee): void {
    if (parentEmployee.subordinates.length === 0) return;

    for (let i = 0; i < parentEmployee.subordinates.length; i++) {
      const currentSub = parentEmployee.subordinates[i];

      if (currentSub.uniqueID === supervisorID && this.toMoveEmployee) {
        const currentSubordinates = [...currentSub.subordinates];

        // add following operation to undo movements array
        this.undoMovements.push({
          employeeID: currentSub.uniqueID,
          subordinates: [...currentSubordinates],
        });

        // add new/removed subordinate to the supervisor employee
        currentSub.subordinates = [
          ...currentSub.subordinates,
          this.toMoveEmployee,
        ];

        this.toMoveEmployee = null;
        break;
      }
      this.moveStep2(supervisorID, parentEmployee.subordinates[i]);
    }
  }

  undo(): void {
    const undoMovementsLength = this.undoMovements.length;

    if (undoMovementsLength > 1) {
      const undoStep1Movement = this.undoMovements[undoMovementsLength - 1];
      const undoStep2Movement = this.undoMovements[undoMovementsLength - 2];
      this.undoOperation(undoStep1Movement, this.ceo);
      this.undoOperation(undoStep2Movement, this.ceo);

      // add following operation to redo movements array
      if (undoStep2Movement.subordinateEmployeeID) {
        this.redoMovements.push({
          employeeID: undoStep2Movement.subordinateEmployeeID,
          supervisorID: undoStep1Movement.employeeID,
        });
      }

      // remove entries for the last 2 undo operations
      this.undoMovements.pop();
      this.undoMovements.pop();
    }
  }

  move(employeeID: number, supervisorID: number): void {
    this.moveStep1(employeeID, this.ceo);
    this.moveStep2(supervisorID, this.ceo);
  }

  redo(): void {
    const redoMovementsLength = this.redoMovements.length;

    if (redoMovementsLength > 0) {
      const selectedRedoMovement = this.redoMovements[redoMovementsLength - 1];
      this.move(
        selectedRedoMovement.employeeID,
        selectedRedoMovement.supervisorID
      );

      // remove entry for the last redo operation
      this.redoMovements.pop();
    }
  }
}

const app = new EmployeeOrgApp(inputCEO);

app.move(8, 4);
app.undo();
app.redo();
app.undo();

console.log(
  "Print the valid state of the data after above operations\n",
  JSON.stringify(app.ceo)
);
