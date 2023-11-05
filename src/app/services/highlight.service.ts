import {Injectable, Inject} from '@angular/core';
import { PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";

import 'prismjs/prism';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-csharp';
// import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-aspnet';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';

declare var Prism: any;

@Injectable()
export class HighlightService {

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  highlightAll() {
    if(isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
}
