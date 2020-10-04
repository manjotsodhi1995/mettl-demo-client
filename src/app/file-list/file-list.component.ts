import { Component, OnInit } from "@angular/core";
import { MiddlewareService } from "../middleware.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-file-list",
  templateUrl: "./file-list.component.html",
  styleUrls: ["./file-list.component.css"]
})
export class FileListComponent implements OnInit {
  Files = [];
  currentfile = null;
  currentIndex = -1;
  title = "";

  constructor(private service: MiddlewareService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveFiles();
  }

  retrieveFiles(): void {
    this.service.getAll().subscribe(
      data => {
        this.Files = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrieveFiles();
    this.currentfile = null;
    this.currentIndex = -1;
  }

  setActiveFile(File, index): void {
    this.currentfile = File;
    this.currentIndex = index;
  }

  removeAllFiles(): void {
    this.service.deleteAll().subscribe(
      response => {
        console.log(response);
        this.refreshList();
      },
      error => {
        console.log(error);
      }
    );
  }

  searchTitle(): void {
    this.service.findByTitle(this.title).subscribe(
      data => {
        this.Files = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  navigateToAdd() {
    this.router.navigate(["/add"]);
  }
}
