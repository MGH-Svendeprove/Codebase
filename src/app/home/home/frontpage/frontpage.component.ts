import {Component, OnInit} from '@angular/core';
import {Ipost} from "../../../interfaces/ipost";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

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
}
