import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Icategory} from "../../interfaces/icategory";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories: Icategory[] = [];
  category: Icategory = {};
  message: any = {};
  isEdit: boolean = false;
  isActive: boolean = false;
  picturePath: string = "https://www.jp-pro.dk/codebase/assets/img/";
  selectedFile: any = '';
  file_data: any = '';
  file: File | null = null;

  categoryForm = new FormGroup({
    category_id: new FormControl(),
    cat_title: new FormControl(),
    cat_picture: new FormControl()
  });

  constructor(private api: ApiService, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllCategories();
  }

  onSelectedFile(event: any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.file = fileList[0];
      if((this.file.size / 1048576) <= 4) {
        this.file_data = this.file;
      }
    }
  }

  showCardForm() {
    this.isActive = !this.isActive;
  }

  closeCardForm() {
    this.isActive = !this.isActive;
    this.isEdit = false;
    this.categoryForm.patchValue({
      category_id: '',
      cat_title: ''
    })
  }

  editCategory(event: any) {
    let c: Icategory = {
      category_id: event.getAttribute('id')
    }

    this.api.getCategoryName(c).subscribe(data => {
      this.isActive = !this.isActive;
      this.isEdit = true;
      this.categoryForm.patchValue({
        category_id: data.category_id,
        cat_title: data.cat_title
      });

    })
  }

  getAllCategories() {
    this.api.getCategories().subscribe(data => {
      if(data[0] !== undefined) {
        this.categories = data;
      } else {
        this.message = data;
      }
    })
  }

  formHandler(formObj: any) {
    let formData = new FormData();
    if(!this.isEdit) {
      formData.append('file', this.file_data, this.file_data.name);
      formData.append('cat_title', formObj.cat_title);

      this.selectedFile = formData;

      this.api.insertCategory(this.selectedFile).subscribe(data => {
        this.category = data;
        console.log(this.category);
        this.categories.push(this.category);
        this.isEdit = false;
        this.isActive = false;
      });

    } else {
      formData.append('file', this.file_data, this.file_data.name);
      formData.append('cat_title', formObj.cat_title);
      formData.append('category_id', formObj.category_id);

      this.selectedFile = formData;

      this.api.updateCategory(this.selectedFile).subscribe(data => {
        this.isEdit = false;
        this.isActive = false;
        window.location.reload();
      });
    }
  }
}
