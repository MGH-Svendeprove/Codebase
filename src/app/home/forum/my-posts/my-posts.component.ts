import {Component, OnInit} from '@angular/core';
import {Ipost} from "../../../interfaces/ipost";
import {Iaccount} from "../../../interfaces/iaccount";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Icategory} from "../../../interfaces/icategory";

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  posts: Ipost[] = [];
  categories: Icategory[] = [];
  post: Ipost = {};
  message: any = {};
  isActive: boolean = false;
  isEditActive: boolean = false;
  messageIsActive: boolean = false;

  editForm = new FormGroup({
    subject: new FormControl(),
    category_id: new FormControl(),
    content: new FormControl(),
    post_id: new FormControl()
  })

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private auth: AuthService) {
  }
  ngOnInit() {
    this.getMyPosts();
    this.getCategories();
  }

  getCategories() {
    this.api.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  getMyPosts() {
    let account: Iaccount = {
      account_id: this.auth.id
    }

    this.api.myPosts(account).subscribe(data => {
      if(data[0] !== undefined) {
        this.posts = data;
        this.isActive = false;
      } else {
        this.message = data;
        this.isActive = !this.isActive;
      }
    });
  }

  showModal() {
    this.isEditActive = !this.isEditActive;
  }

  editHandler(event: any) {
    let post: Ipost = {
      post_id: event.getAttribute('id')
    }

    this.api.selectSinglePost(post).subscribe(data => {
      this.post = data;
      this.editForm.patchValue({
        subject: data.subject,
        category_id: data.category_id,
        content: data.content,
        post_id: data.post_id
      });
      this.isEditActive = !this.isEditActive;
    });

  }

  deleteHandler(event: any) {
    let post: Ipost = {
      post_id: event.getAttribute('id')
    }

    let postIndex = -1;

    for(let i = 0; i < this.posts.length; i++) {
      if(this.posts[i].post_id === post.post_id) {
        postIndex = i;
      }
    }

    this.api.deletePost(post).subscribe(data => {
      this.message = data;
      this.posts.splice(postIndex, 1);
      this.messageIsActive = !this.messageIsActive;
    })

  }

  hideMessage() {
    this.messageIsActive = !this.messageIsActive;
  }

  updateHandler(formObj: any) {
    let usr: Iaccount = {
      account_id: this.auth.id
    }

    let formData = new FormData();
    formData.append('post_id', formObj.post_id);
    formData.append('account_id', usr.account_id);
    formData.append('category_id', formObj.category_id);
    formData.append('subject', formObj.subject);
    formData.append('content', formObj.content);

    this.api.updatePost(formData).subscribe(data => {
      this.isEditActive = ! this.isEditActive;
      window.location.reload();
    });
  }

}
