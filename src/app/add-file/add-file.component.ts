import { Component, OnInit } from "@angular/core";
import { MiddlewareService } from "../middleware.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-file",
  templateUrl: "./add-file.component.html",
  styleUrls: ["./add-file.component.css"]
})
export class AddFileComponent implements OnInit {
  file = {
    title: "",
    description: "",
    published: false
  };
  submitted = false;

  constructor(private service: MiddlewareService, private router: Router) {}

  ngOnInit(): void {}

  savefile(): void {
    const data = {
      title: this.file.title,
      description: this.file.description
    };

    this.service.create(data).subscribe(
      response => {
        this.router.navigate(["/files"]);
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  newfile(): void {
    this.submitted = false;
    this.file = {
      title: "",
      description: "",
      published: false
    };
  }
  goToHome() {
    this.router.navigate(["/files"]);
  }
}
