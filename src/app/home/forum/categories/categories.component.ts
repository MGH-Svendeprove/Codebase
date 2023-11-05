import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Icategory} from "../../../interfaces/icategory";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  picturePath: string = "http://www.jp-pro.dk/codebase/assets/img/categories/";

  categories: Icategory[] = [];

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.api.getCategories().subscribe(data => {
      this.categories = data;
      //console.log(this.categories);
    })
  }

  showForum(event: any) {
    let category: Icategory = {
      category_id: event.getAttribute('id')
    }

    this.router.navigate(['./home/forum', category.category_id], {state: {data: category}});
  }
}
