import { Component, OnInit } from "@angular/core";
import { MiddlewareService } from "../middleware.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-file-details",
  templateUrl: "./file-details.component.html",
  styleUrls: ["./file-details.component.css"]
})
export class FileDetailsComponent implements OnInit {
  currentFile = null;
  message = "";

  constructor(
    private service: MiddlewareService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = "";
    this.getFile(this.route.snapshot.paramMap.get("id"));
  }

  getFile(id): void {
    this.service.get(id).subscribe(
      data => {
        this.currentFile = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  updatePublished(status): void {
    const data = {
      title: this.currentFile.title,
      description: this.currentFile.description,
      published: status
    };

    this.service.update(this.currentFile.id, data).subscribe(
      response => {
        this.currentFile.published = status;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateFile(): void {
    this.service.update(this.currentFile.id, this.currentFile).subscribe(
      response => {
        console.log(response);
        this.message = "The File was updated successfully!";
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteFile(): void {
    this.service.delete(this.currentFile.id).subscribe(
      response => {
        console.log(response);
        this.router.navigate(["/files"]);
      },
      error => {
        console.log(error);
      }
    );
  }
}
