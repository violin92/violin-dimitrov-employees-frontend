import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgIf, NgFor} from '@angular/common';
import {EmployeesCollaboration} from "../models/employees-collaboration.model";
import {MatTableModule} from "@angular/material/table";

@Component({
    selector: 'app-show-results',
    standalone: true,
    imports: [NgIf, NgFor, MatTableModule],
    templateUrl: './show-results.component.html',
    styleUrl: './show-results.component.css'
})
export class ShowResultsComponent {

    collaborations: EmployeesCollaboration[] = [];
    displayedColumns: string[] = ['employeeId1', 'employeeId2', 'projectId', 'durationDays'];

    constructor(private router: Router) {
        const navigation = this.router.getCurrentNavigation();

        if (navigation?.extras?.state?.['data']) {
            this.collaborations = navigation.extras.state['data'] as EmployeesCollaboration[];
            console.log('Results:', this.collaborations);
        } else {
            console.error('No data found in navigation state');
        }
    }
}
