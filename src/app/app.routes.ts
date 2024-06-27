import {NgModule} from '@angular/core';
import {Routes, provideRouter} from '@angular/router';
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {ShowResultsComponent} from "./show-results/show-results.component";

export const routes: Routes = [
    {path: 'file-upload', component: FileUploadComponent},
    {path: 'show-results', component: ShowResultsComponent}
];

export const routingProviders = [provideRouter(routes)];