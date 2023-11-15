import {Component, OnInit} from '@angular/core';
import {Ipost} from "../../../interfaces/ipost";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Ireport} from "../../../interfaces/ireport";

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {


  posts: Ipost[] = [];
  message: any = {};
  isActive: boolean = false;

  constructor(private api: ApiService, private router: Router, private auth: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getLatestPosts();
  }

  getLatestPosts() {
    this.api.latestPosts().subscribe(data => {
      if(data[0] !== undefined) {
        this.posts = data;
        this.isActive = false;
      } else {
        this.message = data;
        this.isActive = !this.isActive;
      }
    })
  }

  readPost(event: any) {
    let post: Ipost = {
      post_id: event.getAttribute('id')
    }

    this.router.navigate(['./home/forum/post', post.post_id], {state: {data: post}});

  }

  reportPost(event: any) {

    let post: Ireport = {
      post_id: event.getAttribute('id'),
      account_id: this.auth.id,
      subject: event.getAttribute('title')
    }


    let formData = new FormData();
    formData.append('account_id', post.account_id);
    formData.append('post_id', post.post_id);
    formData.append('reported', 'no');
    formData.append('subject', post.subject);

    this.api.reportpost(formData).subscribe(data => {
      console.log(data);
    });

  }
}
