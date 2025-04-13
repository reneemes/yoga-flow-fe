import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdService {
  constructor() {}

  // private messageSource = new BehaviorSubject<string>('default message');
  private poseId = new BehaviorSubject<string | null>(null);
  currentId = this.poseId.asObservable();

  changeId(id: string) {
    this.poseId.next(id);
  }

  getUserInfo() {
    return this.poseId.value;
  }
}