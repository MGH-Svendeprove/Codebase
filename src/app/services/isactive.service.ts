import { Injectable } from '@angular/core';
import {fromEvent, Subject} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsactiveService {
  public idle$: Subject<boolean> = new Subject();
  public wake$: Subject<boolean> = new Subject();

  isIdle = false;
  private beginAfterIdleInSeconds = 10;
  private maxIdleTimeInSeconds = 600;
  private idleTimeout : ReturnType<typeof setTimeout> | undefined = undefined;
  private logoutTimeout : ReturnType<typeof setTimeout> | undefined = undefined;

  constructor(private auth: AuthService) {
    fromEvent(document, 'mousemove').subscribe(() => this.onInteraction());
    fromEvent(document, 'touchstart').subscribe(() => this.onInteraction());
    fromEvent(document, 'keydown').subscribe(() => this.onInteraction());

  }

  private idleHandler = () => {
    this.isIdle = true;
    this.idle$.next(true);
    this.logoutTimeout = setTimeout(this.logoutHandler, this.maxIdleTimeInSeconds * 1000);
  }

  private logoutHandler = () => {
    this.auth.logout();
  }

  onInteraction() {
    if(this.isIdle) {
      this.isIdle = false
      this.wake$.next(true);
    }

    clearTimeout(this.idleTimeout);
    clearTimeout(this.logoutTimeout);

    this.idleTimeout = setTimeout(this.idleHandler, this.beginAfterIdleInSeconds * 1000);
  }
}
