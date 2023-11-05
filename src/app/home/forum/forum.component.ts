import {Component, OnInit} from '@angular/core';
import {Icategory} from "../../interfaces/icategory";
import {Ipost} from "../../interfaces/ipost";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Iaccount} from "../../interfaces/iaccount";


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})

export class ForumComponent implements OnInit {

  category: Icategory = {};
  categories: Icategory[] = [];
  posts: Ipost[] = [];
  post: any = "";
  isActive: boolean = false;
  message: any = {};
  messageActive: boolean = false;
  code: string | null = "";

  createForm = new FormGroup({
    subject: new FormControl(),
    category_id: new FormControl(),
    content: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private auth: AuthService) {
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      let data = params['category_id'];
      let postData: Ipost = {
        category_id: data
      }
      this.getCategoryName(data);
      this.getCategories();
      this.getForumPosts(postData);

      this.createForm.patchValue({
        category_id: data
      });
    });

  }

  getCategoryName(id: any) {
    let cat: Icategory = {
      category_id: id
    }

    this.api.getCategoryName(cat).subscribe(data => {
      this.category = data;
    });
  }

  getCategories() {
    this.api.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  showModal() {
    this.isActive = !this.isActive;
  }

  createHandler(formObj: any) {
    let usr: Iaccount = {
      account_id: this.auth.id
    }

    let cat: Icategory = {
      category_id: formObj.category_id
    }

    let formData = new FormData();
    formData.append('account_id', usr.account_id);
    formData.append('category_id', formObj.category_id);
    formData.append('subject', formObj.subject);
    formData.append('content', formObj.content);

    this.post = formData;

    console.log(this.post);

    this.api.createPost(this.post).subscribe(data => {
      this.isActive = !this.isActive;
      window.location.reload();
    });
  }

  getForumPosts(data: Ipost) {
    this.api.selectAllPosts(data).subscribe(p => {
      if(p[0] !== undefined) {
        this.posts = p;
        this.messageActive = false;
      } else {
        this.message = p;
        this.messageActive = !this.messageActive;
      }

    })
  }

  readPost(event: any) {
    let post: Ipost = {
      post_id: event.getAttribute('id')
    }

    this.router.navigate(['./home/forum/post', post.post_id], {state: {data: post}});

  }
}
