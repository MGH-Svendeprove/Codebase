import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ireport} from "../../interfaces/ireport";
import {Ipost} from "../../interfaces/ipost";
import {Icategory} from "../../interfaces/icategory";
import {FormControl, FormGroup} from "@angular/forms";
import {Iaccount} from "../../interfaces/iaccount";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @ViewChild('snippet') snipper!: ElementRef;

  reports: Ireport[] = [];
  categories: Icategory[] = [];
  snippets: any[] = [
    {language: "Angular", code: "<pre class='language-typescript'><code>Enter code here...</code></pre>"},
    {language: "C++", code: "<pre class='language-clike'><code>Enter code here...</code></pre>"},
    {language: "C#", code: "<pre class='language-csharp'><code>Enter code here...</code></pre>"},
    {language: "CSS", code: "<pre class='language-css'><code>Enter code here...</code></pre>"},
    {language: "HTML", code: "<pre class='language-markup'><code>Enter code here...</code></pre>"},
    {language: "JavaScript", code: "<pre class='language-javascript'><code>Enter code here...</code></pre>"},
    {language: ".NET Core", code: "<pre class='language-dotnet'><code>Enter code here...</code></pre>"},
    {language: "PHP", code: "<pre class='language-php'><code>Enter code here...</code></pre>"},
    {language: "Python", code: "<pre class='language-python'><code>Enter code here...</code></pre>"},
    {language: "React", code: "<pre class='language-typescript'><code>Enter code here...</code></pre>"},
    {language: "TypeScript", code: "<pre class='language-typescript'><code>Enter code here...</code></pre>"},
    {language: "Vue.js", code: "<pre class='language-typescript'><code>Enter code here...</code></pre>"}
  ];
  post: Ipost = {};
  report: Ireport = {};
  paperIsActive: boolean = false;
  modalIsActive: boolean = false;
  deleteIsActive: boolean = false;
  reported:string = 'yes';
  account: Iaccount = {};

  editForm = new FormGroup({
    post_id: new FormControl(),
    account_id: new FormControl(),
    subject: new FormControl(),
    category_id: new FormControl(),
    content: new FormControl(),
    snippet: new FormControl(),
    report_id: new FormControl(),
    reported: new FormControl()
  });

  deleteForm = new FormGroup({
    post_id: new FormControl(),
    email: new FormControl(),
    report_id: new FormControl(),
    reported: new FormControl(),
    subject: new FormControl(),
    message: new FormControl()
  })

  constructor(private api: ApiService, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllReports();
    this.getAllcategories();
  }

  getAllReports() {
    this.api.selectReports().subscribe(data => {
      this.reports = data;
    });
  }

  getAllcategories() {
    this.api.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  getSinglePost(event: any) {
    let p: Ipost = {
      post_id: event.getAttribute('id')
    }
    this.paperIsActive = !this.paperIsActive;
    this.api.selectSinglePost(p).subscribe(data => {
      this.post = data;
    });
  }

  editSinglePost(event: any) {
    let p: Ipost = {
      post_id: event.getAttribute('id')
    }

    let r: Ireport = {
      report_id: event.getAttribute('title')
    }

    this.report = r;

    this.modalIsActive = !this.modalIsActive;
    this.api.selectSinglePost(p).subscribe(data => {
      this.post = data;
      this.editForm.patchValue({
        post_id: data.post_id,
        account_id: data.account_id,
        report_id: r.report_id,
        reported: this.reported,
        subject: data.subject,
        category_id: data.category_id,
        content: data.content
      });
    })
  }

  closePaper() {
    this.paperIsActive = !this.paperIsActive;
  }

  closeModal() {
    this.modalIsActive = !this.modalIsActive;
  }

  closeDeleteModal() {
    this.deleteIsActive = !this.deleteIsActive;
  }

  insertSnippet(value: string) {
    const contentControl = this.editForm.controls.content;
    const curPos = contentControl.value.slice(0, contentControl.value.selectionStart);
    const text_to_insert = value;
    const textAfterCursor = contentControl.value.slice(0, contentControl.value.selectionStart);

    contentControl.setValue(curPos + text_to_insert);
    this.snipper.nativeElement.selectedIndex = 0;
  }

  updateHandler(formObj: any) {
    let formData = new FormData();
    formData.append('post_id', formObj.post_id);
    formData.append('account_id', formObj.account_id);
    formData.append('category_id', formObj.category_id);
    formData.append('subject', formObj.subject);
    formData.append('content', formObj.content);

    this.api.updatePost(formData).subscribe(data => {
      this.modalIsActive = !this.modalIsActive;
      let r: Ireport = {
        statusCode: 2,
        report_id: formObj.report_id,
        reported: formObj.reported
      }

      let formData1 = new FormData();
      formData1.append('statusCode', r.statusCode);
      formData1.append('report_id', r.report_id);
      formData1.append('reported', r.reported);

      this.api.updateReport(formData1).subscribe(rp => {
        window.location.reload();
      });
    });
  }

  deletePost(event: any) {
    let p: Ipost = {
      post_id: event.getAttribute('id'),
    }

    let r: Ireport = {
      report_id: event.getAttribute('title'),
      reported: this.reported
    }

    this.api.selectSinglePost(p).subscribe(data => {
      this.post = data;
      let usr: Iaccount = {
        account_id: data.account_id
      }
      this.api.getAccount(usr).subscribe(acc => {
        this.account = acc;
        this.deleteForm.patchValue({
          post_id: data.post_id,
          report_id: r.report_id,
          reported: r.reported,
          email: acc.email
        });
      });
      this.deleteIsActive = !this.deleteIsActive;
    });
  }

  deleteHandler(formObj: any) {
    let p: Ipost = {
      post_id: formObj.post_id
    }

    let r: Ireport = {
      report_id: formObj.report_id,
      reported: formObj.reported,
      statusCode: 3
    }

    let formData = new FormData();
    formData.append('email', formObj.email);
    formData.append('subject', formObj.subject);
    formData.append('message', formObj.message);
    formData.append('report_id', r.report_id);
    formData.append('reported', r.reported);
    formData.append('statusCode', r.statusCode);

    console.log(r);

    this.api.sendmail(formData).subscribe(em => {
      console.log(em);
    });
    this.api.updateReport(formData).subscribe(rep => {
      this.api.deletePost(p).subscribe(pos => {
        this.deleteIsActive = !this.deleteIsActive;
        window.location.reload();
      });
    });
  }
}
