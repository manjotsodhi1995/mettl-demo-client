import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FileListComponent } from "./file-list/file-list.component";
import { FileDetailsComponent } from "./file-details/file-details.component";
import { AddFileComponent } from "./add-file/add-file.component";

const routes: Routes = [
  { path: "", redirectTo: "files", pathMatch: "full" },
  { path: "files", component: FileListComponent },
  { path: "files/:id", component: FileDetailsComponent },
  { path: "add", component: AddFileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
