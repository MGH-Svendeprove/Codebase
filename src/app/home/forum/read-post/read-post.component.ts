import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Ipost} from "../../../interfaces/ipost";
import {HighlightService} from "../../../services/highlight.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Iaccount} from "../../../interfaces/iaccount";
import {Ianswer} from "../../../interfaces/ianswer";


@Component({
  selector: 'app-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.css']
})



export class ReadPostComponent implements OnInit, AfterViewChecked{

  post: Ipost = {};
  answers: Ianswer[] = [];
  highlighted: boolean = false;
  message: any = {};
  isActive: boolean = false;

  answerForm = new FormGroup({
    answer_content: new FormControl()
  });

  constructor(private api: ApiService, private router: Router, private auth: AuthService, private route: ActivatedRoute, private highlight: HighlightService) {
  }

  ngAfterViewChecked() {
    if(this.post && !this.highlighted) {
      this.highlight.highlightAll();
      this.highlighted = true;
    }
  }

    ngOnInit() {
    const data = this.route.snapshot.paramMap.get('post_id');
    //console.log(data);
    this.getPostData(data);
  }

  getPostData(data: any) {
    let p: Ipost = {
      post_id: data
    }

    this.api.selectSinglePost(p).subscribe(pos => {
      this.post = pos;
      this.api.getAllAnswers(pos).subscribe(ans => {
        if(ans[0] !== undefined) {
          this.answers = ans;
          this.isActive = false;
        } else {
          this.message = ans;
          this.isActive = !this.isActive;
        }

      });
    });
  }

  answerHandler(formObj: any) {
    let po: Ipost = {
      post_id: this.post.post_id
    }
    let usr: Iaccount = {
      account_id: this.auth.id
    }

    let formData = new FormData();
    formData.append('post_id', this.post.post_id);
    formData.append('account_id', usr.account_id);
    formData.append('content', formObj.answer_content);

    this.api.answerPost(formData).subscribe(data => {
      window.location.reload();
    })
  }

}
