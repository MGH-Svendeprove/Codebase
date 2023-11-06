import {Component, OnInit} from '@angular/core';
import {Icategory} from "../../../interfaces/icategory";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  categories: Icategory[] = [];
  picturePath: string = "https://www.jp-pro.dk/codebase/assets/img/categories/";

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.api.getCategories().subscribe(data => {
      this.categories = data;
    })
  }
}
