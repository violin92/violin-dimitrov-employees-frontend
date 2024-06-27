import {Component, ViewChild, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {EmployeesCollaboration} from "../models/employees-collaboration.model";

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatIconModule
    ],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.css'
})

export class FileUploadComponent {

    selectedFile: File | null = null;
    @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;

    constructor(private http: HttpClient, private router: Router) {
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        console.log('File selected:', this.selectedFile);
    }

    onUpload() {
        if (!this.selectedFile) {
            console.error('No file selected!');
            return;
        }

        const uploadData = new FormData();
        uploadData.append('file', this.selectedFile, this.selectedFile.name);

        this.http.post<EmployeesCollaboration[]>('http://localhost:8080/api/analyze-file', uploadData)
            .subscribe({
                next: (response) => {
                    console.log('File uploaded successfully', response);
                    this.router.navigate(['/show-results'], {state: {data: response}});
                },
                error: (error) => {
                    console.error('Error uploading file:', error);
                }
            });
    }

    openFileInput() {
        this.fileInput.nativeElement.click();
    }
}
